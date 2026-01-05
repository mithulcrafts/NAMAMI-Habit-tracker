import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import localforage from 'localforage'
import { generalQuotes, gitaQuotes } from '../data/quotes'
import {
  computeStreak,
  countCompletions,
  formatDate,
  getMonthBuckets,
  getWeekBuckets,
  todayKey,
} from '../utils/date'

const STORAGE_KEY = 'namami-state-v1'
const STORAGE_FALLBACK_KEYS = ['namami-state-v1', 'namami-state']
const SCHEMA_VERSION = 3

// Helper to generate deterministic color from habit ID
const getHabitColor = (id) => {
  const colors = ['#38bdf8', '#c084fc', '#34d399', '#fbbf24', '#f87171', '#818cf8', '#ec4899', '#14b8a6']
  const hash = id.charCodeAt(0) + id.charCodeAt(id.length - 1)
  return colors[hash % colors.length]
}

const defaultHabits = [
  {
    id: 'habit-1',
    name: 'Morning Walk',
    description: '20-minute mindful walk to start the day',
    frequency: 'daily',
    customDays: [],
    isDailyHabit: true,
    targetDays: null,
    habitColor: '#38bdf8',
    useGlobalGamification: true,
    customPoints: null,
    customStreakBonuses: null,
    goalType: 'binary',
    goalTarget: null,
    dailyValueHistory: {},
    history: {
      [todayKey()]: true,
      [formatDate(new Date(Date.now() - 86400000))]: true,
      [formatDate(new Date(Date.now() - 2 * 86400000))]: true,
    },
    createdAt: todayKey(),
  },
  {
    id: 'habit-2',
    name: 'Reading',
    description: 'Read 10 pages of a book',
    frequency: 'custom',
    customDays: [1, 3, 5],
    isDailyHabit: false,
    targetDays: 20,
    habitColor: '#c084fc',
    useGlobalGamification: true,
    customPoints: null,
    customStreakBonuses: null,
    goalType: 'binary',
    goalTarget: null,
    dailyValueHistory: {},
    history: {},
    createdAt: todayKey(),
  },
]

const defaultRewards = [
  { id: 'reward-1', name: 'Coffee treat', requiredPoints: 50, claimed: false, deleted: false },
  { id: 'reward-2', name: 'Movie night', requiredPoints: 120, claimed: false, deleted: false },
]

const defaultSettings = {
  pointsPerHabit: 10,
  dailyBonus: 20,
  gamificationEnabled: true,
  notificationsEnabled: false,
  quoteCategory: 'general',
  streakBonuses: {
    3: 2,
    7: 5,
    30: 10,
  },
}

const AppContext = createContext()

const deriveStats = (habits, settings) => {
  const enriched = habits.map((habit) => {
    // Helper: determine if a day is "completed" based on goal type
    const getDayCompletion = (dateKey, goalType, goalTarget, dailyValue) => {
      if (goalType === 'binary') {
        return habit.history?.[dateKey] === true
      }
      // For count/duration: day is completed if dailyValue >= goalTarget
      const value = dailyValue ?? habit.dailyValueHistory?.[dateKey] ?? 0
      return value >= (goalTarget || 1)
    }

    // Compute streak: only increment when target is met
    let streak = 0
    let cursor = new Date()
    while (true) {
      const key = formatDate(cursor)
      const isCompleted = getDayCompletion(key, habit.goalType, habit.goalTarget, null)
      if (isCompleted) {
        streak += 1
        cursor.setDate(cursor.getDate() - 1)
      } else {
        break
      }
    }

    // Count total completions (days where target was met)
    const totalCompleted = Object.keys(habit.history || {}).filter((dateKey) =>
      getDayCompletion(dateKey, habit.goalType, habit.goalTarget, null),
    ).length

    const completionRate =
      habit.isDailyHabit ? null : Math.min(100, Math.round((totalCompleted / (habit.targetDays || 1)) * 100))

    return { ...habit, streak, totalCompleted, completionRate }
  })

  // Collect all completed dates for bonuses (only when target is met)
  const completedDates = {}
  enriched.forEach((habit) => {
    Object.keys(habit.history || {}).forEach((dateKey) => {
      const isCompleted = habit.goalType === 'binary' 
        ? habit.history[dateKey] === true
        : (habit.dailyValueHistory?.[dateKey] ?? 0) >= (habit.goalTarget || 1)
      if (isCompleted) {
        completedDates[dateKey] = (completedDates[dateKey] || 0) + 1
      }
    })
  })

  const allHabits = enriched.length || 1
  const bonusDays = Object.entries(completedDates).filter(([, count]) => count >= enriched.length)

  const basePoints = settings.gamificationEnabled
    ? enriched.reduce((sum, habit) => {
        const pointsPerCompletion = habit.useGlobalGamification
          ? settings.pointsPerHabit
          : habit.customPoints ?? settings.pointsPerHabit
        return sum + habit.totalCompleted * pointsPerCompletion
      }, 0)
    : 0

  const dailyBonusPoints = settings.gamificationEnabled ? bonusDays.length * settings.dailyBonus : 0

  const streakBonus = settings.gamificationEnabled
    ? enriched.reduce((sum, habit) => {
        const bonuses = habit.useGlobalGamification
          ? settings.streakBonuses
          : habit.customStreakBonuses ?? settings.streakBonuses
        if (habit.streak >= 30) return sum + (bonuses[30] || 0)
        if (habit.streak >= 7) return sum + (bonuses[7] || 0)
        if (habit.streak >= 3) return sum + (bonuses[3] || 0)
        return sum
      }, 0)
    : 0

  const totalPoints = basePoints + dailyBonusPoints + streakBonus

  return {
    habits: enriched,
    points: totalPoints,
    bonusDays: bonusDays.map(([dateKey]) => dateKey),
  }
}

const pickQuote = (category, customQuotes, daySeed) => {
  const source = category === 'gita' ? gitaQuotes : generalQuotes
  const combined = [...source, ...(customQuotes || [])]
  if (!combined.length) return 'Keep moving forward.'
  const idx = daySeed % combined.length
  return combined[idx]
}

export const AppProvider = ({ children }) => {
  localforage.config({ name: 'namami', storeName: 'state' }) // Keep storage location stable across releases

  const [state, setState] = useState({
    habits: defaultHabits,
    rewards: defaultRewards,
    settings: defaultSettings,
    customQuotes: [],
    claimedRewards: [],
    schemaVersion: SCHEMA_VERSION,
  })
  const [loading, setLoading] = useState(true)

  // Data migration: upgrade old habits to new schema
  const migrateData = (saved) => {
    if (!saved) return null
    const version = saved.schemaVersion || 1
    if (version < SCHEMA_VERSION) {
      const migrated = { ...saved, schemaVersion: SCHEMA_VERSION }
      if (version < 2) {
        migrated.habits = (migrated.habits || []).map((h) => ({
          ...h,
          isDailyHabit: h.targetDays ? false : true,
          habitColor: h.habitColor || getHabitColor(h.id),
          useGlobalGamification: true,
          customPoints: null,
          customStreakBonuses: null,
        }))
        migrated.rewards = (migrated.rewards || []).map((r) => ({
          ...r,
          deleted: r.deleted ?? false,
        }))
      }
      if (version < 3) {
        migrated.habits = (migrated.habits || []).map((h) => ({
          ...h,
          goalType: h.goalType || 'binary',
          goalTarget: h.goalTarget || null,
          dailyValueHistory: h.dailyValueHistory || {},
        }))
      }
      return migrated
    }
    return saved
  }

  useEffect(() => {
    const load = async () => {
      try {
        for (const key of STORAGE_FALLBACK_KEYS) {
          const saved = await localforage.getItem(key)
          if (saved) {
            const migrated = migrateData(saved)
            setState(migrated || saved)
            if (key !== STORAGE_KEY) {
              await localforage.setItem(STORAGE_KEY, migrated || saved)
            }
            break
          }
        }
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  useEffect(() => {
    if (!loading) {
      localforage.setItem(STORAGE_KEY, state)
    }
  }, [state, loading])

  const { habits, points, bonusDays } = useMemo(
    () => deriveStats(state.habits, state.settings),
    [state.habits, state.settings],
  )

  const quoteOfDay = useMemo(() => {
    const seed = Number(todayKey().replaceAll('-', ''))
    return pickQuote(state.settings.quoteCategory, state.customQuotes, seed)
  }, [state.settings.quoteCategory, state.customQuotes])

  const addHabit = (data) => {
    const newHabit = {
      id: crypto.randomUUID(),
      history: {},
      createdAt: todayKey(),
      isDailyHabit: data.isDailyHabit ?? true,
      targetDays: data.isDailyHabit ? null : data.targetDays,
      habitColor: getHabitColor(crypto.randomUUID()),
      useGlobalGamification: true,
      customPoints: null,
      customStreakBonuses: null,
      goalType: data.goalType || 'binary',
      goalTarget: data.goalTarget || null,
      dailyValueHistory: {},
      ...data,
    }
    setState((prev) => ({ ...prev, habits: [...prev.habits, newHabit] }))
  }

  const updateHabit = (id, data) => {
    setState((prev) => ({
      ...prev,
      habits: prev.habits.map((h) => (h.id === id ? { ...h, ...data } : h)),
    }))
  }

  const deleteHabit = (id) => {
    setState((prev) => ({
      ...prev,
      habits: prev.habits.filter((h) => h.id !== id),
    }))
  }

  const toggleCompletion = (id, dateKey = todayKey(), completed = true, value = null) => {
    setState((prev) => ({
      ...prev,
      habits: prev.habits.map((habit) => {
        if (habit.id !== id) return habit
        
        if (habit.goalType === 'binary') {
          // Binary: simple true/false toggle
          const history = { ...(habit.history || {}) }
          history[dateKey] = completed
          return { ...habit, history }
        } else {
          // Count/Duration: store numeric value
          const dailyValueHistory = { ...(habit.dailyValueHistory || {}) }
          if (value !== null) {
            dailyValueHistory[dateKey] = value
            // Also update binary history based on whether target is met
            const history = { ...(habit.history || {}) }
            history[dateKey] = value >= (habit.goalTarget || 1)
            return { ...habit, dailyValueHistory, history }
          }
          return habit
        }
      }),
    }))
  }

  const addReward = (reward) => {
    setState((prev) => ({
      ...prev,
      rewards: [...prev.rewards, { id: crypto.randomUUID(), claimed: false, ...reward }],
    }))
  }

  const claimReward = (rewardId) => {
    setState((prev) => ({
      ...prev,
      rewards: prev.rewards.map((r) => (r.id === rewardId ? { ...r, claimed: true } : r)),
      claimedRewards: [
        ...prev.claimedRewards,
        { rewardId, claimedAt: todayKey() },
      ],
    }))
  }

  const updateReward = (rewardId, data) => {
    setState((prev) => ({
      ...prev,
      rewards: prev.rewards.map((r) => (r.id === rewardId ? { ...r, ...data } : r)),
    }))
  }

  const deleteReward = (rewardId) => {
    setState((prev) => ({
      ...prev,
      rewards: prev.rewards.map((r) => (r.id === rewardId ? { ...r, deleted: true } : r)),
    }))
  }

  const addCustomQuote = (quote) => {
    if (!quote?.trim()) return
    setState((prev) => ({ ...prev, customQuotes: [...prev.customQuotes, quote.trim()] }))
  }

  const updateSettings = (partial) => {
    setState((prev) => ({ ...prev, settings: { ...prev.settings, ...partial } }))
  }

  const updateHabitGamification = (habitId, useGlobal, customPoints, customStreakBonuses) => {
    setState((prev) => ({
      ...prev,
      habits: prev.habits.map((h) =>
        h.id === habitId
          ? {
              ...h,
              useGlobalGamification: useGlobal,
              customPoints: useGlobal ? null : customPoints,
              customStreakBonuses: useGlobal ? null : customStreakBonuses,
            }
          : h,
      ),
    }))
  }

  const value = {
    loading,
    habits,
    points,
    bonusDays,
    rewards: state.rewards.filter((r) => !r.deleted),
    settings: state.settings,
    customQuotes: state.customQuotes,
    quoteOfDay,
    claimedRewards: state.claimedRewards,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleCompletion,
    addReward,
    claimReward,
    updateReward,
    deleteReward,
    addCustomQuote,
    updateSettings,
    updateHabitGamification,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => useContext(AppContext)
