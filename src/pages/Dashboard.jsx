import { useCallback, useMemo, useState } from 'react'
import { HabitCard } from '../components/HabitCard'
import { HabitForm } from '../components/HabitForm'
import { DashboardStats } from '../components/DashboardStats'
import { QuoteCard } from '../components/QuoteCard'
import { GlobalHeatmap } from '../components/GlobalHeatmap'
import { Heatmap } from '../components/Heatmap'
import { Rewards } from '../components/Rewards'
import { DateNavigator } from '../components/DateNavigator'
import { todayKey, formatDate } from '../utils/date'

export const Dashboard = ({
  habits,
  points,
  lifetimePoints,
  pointsSpent,
  bonusDays,
  globalStreak,
  quoteOfDay,
  settings,
  rewards,
  claimedRewards,
  streakFreezes,
  streakFreezeCost,
  onBuyStreakFreeze,
  onUseStreakFreeze,
  onRemoveStreakFreeze,
  onCategoryChange,
  onAddCustomQuote,
  onAddHabit,
  onToggle,
  onOpenHabit,
  onEditHabit,
  onDeleteHabit,
  onAddReward,
  onClaimReward,
  onUpdateReward,
  onDeleteReward,
}) => {
  const [editing, setEditing] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const today = todayKey()
  const selectedDateKey = formatDate(selectedDate)
  const isToday = selectedDateKey === today
  const selectedDateDisplay = selectedDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
  const relativeLabel = (() => {
    const todayDate = new Date()
    todayDate.setHours(0, 0, 0, 0)
    const selectedDay = new Date(selectedDate)
    selectedDay.setHours(0, 0, 0, 0)
    const diffDays = Math.round((todayDate - selectedDay) / 86400000)
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays > 1) return `${diffDays} days ago`
    return 'Upcoming'
  })()

  const handlePreviousDay = useCallback(() => {
    setSelectedDate(prev => {
      const newDate = new Date(prev)
      newDate.setDate(newDate.getDate() - 1)
      return newDate
    })
  }, [])

  const handleNextDay = useCallback(() => {
    setSelectedDate(prev => {
      const newDate = new Date(prev)
      newDate.setDate(newDate.getDate() + 1)
      return newDate
    })
  }, [])

  const handleToday = () => {
    setSelectedDate(new Date())
  }

  const handleDateChange = useCallback((value) => {
    if (!value) return
    const [year, month, day] = value.split('-').map(Number)
    const parsed = new Date(year, month - 1, day)
    if (Number.isNaN(parsed.getTime())) return
    setSelectedDate(parsed)
  }, [])

  const sortedHabits = useMemo(
    () =>
      [...habits].sort((a, b) => {
        const doneA = a.history?.[today] ? 1 : 0
        const doneB = b.history?.[today] ? 1 : 0
        return doneA === doneB ? b.streak - a.streak : doneB - doneA
      }),
    [habits, today],
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-widest text-brand-100">NAMAMI</p>
          <h1 className="text-2xl font-semibold text-white">Habit Tracker</h1>
          <p className="text-sm text-slate-300">Offline-first. MITHURA powered. Built for streaks.</p>
        </div>
      </div>

      <QuoteCard
        quote={quoteOfDay}
        category={settings.quoteCategory}
        onCategoryChange={onCategoryChange}
        onAddCustom={onAddCustomQuote}
      />

      <DateNavigator
        selectedDateDisplay={selectedDateDisplay}
        selectedDateKey={selectedDateKey}
        today={today}
        isToday={isToday}
        onPreviousDay={handlePreviousDay}
        onNextDay={handleNextDay}
        onDateChange={handleDateChange}
      />

      <DashboardStats
        habits={habits}
        points={points}
        lifetimePoints={lifetimePoints}
        pointsSpent={pointsSpent}
        bonusDays={bonusDays}
        globalStreak={globalStreak}
      />

      <GlobalHeatmap habits={habits} />

      {habits.length > 0 && (
        <div className="grid gap-4 lg:grid-cols-2">
          {habits.map((habit) => (
            <Heatmap
              key={`heatmap-${habit.id}`}
              history={habit.history}
              habitColor={habit.habitColor}
              habitName={habit.name}
              goalType={habit.goalType}
              goalTarget={habit.goalTarget}
              dailyValueHistory={habit.dailyValueHistory}
              freezeDates={habit.freezeDates}
            />
          ))}
        </div>
      )}

      <div id="checkins" className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-3">
          {sortedHabits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              selectedDateKey={selectedDateKey}
              isToday={isToday}
              selectedDateLabel={selectedDateDisplay}
              relativeLabel={relativeLabel}
              onToggle={onToggle}
              onOpen={onOpenHabit}
              onEdit={(h) => setEditing(h)}
              onDelete={onDeleteHabit}
              streakFreezes={streakFreezes}
              onUseStreakFreeze={onUseStreakFreeze}
              onRemoveStreakFreeze={onRemoveStreakFreeze}
            />
          ))}
          {!sortedHabits.length && (
            <div className="rounded-xl border border-white/5 bg-slate-900/70 p-4 text-sm text-slate-300">
              No habits yet. Add your first one to begin earning MITHURA.
            </div>
          )}
        </div>
        <div className="glass rounded-xl p-4">
          <h3 className="text-lg font-semibold text-white">Add habit</h3>
          <HabitForm
            initial={editing}
            onSave={(data) => {
              if (editing) {
                onEditHabit(editing.id, data)
              } else {
                onAddHabit(data)
              }
              setEditing(null)
            }}
            onCancel={() => setEditing(null)}
          />
        </div>
      </div>

      <div className="glass rounded-xl p-4">
        <Rewards
          rewards={rewards}
          claimedRewards={claimedRewards}
          points={points}
          streakFreezes={streakFreezes}
          streakFreezeCost={streakFreezeCost}
          onBuyStreakFreeze={onBuyStreakFreeze}
          onAdd={onAddReward}
          onClaim={onClaimReward}
          onUpdate={onUpdateReward}
          onDelete={onDeleteReward}
        />
      </div>
    </div>
  )
}
