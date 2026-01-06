import { useMemo, useState } from 'react'
import { HabitCard } from '../components/HabitCard'
import { HabitForm } from '../components/HabitForm'
import { DashboardStats } from '../components/DashboardStats'
import { QuoteCard } from '../components/QuoteCard'
import { GlobalHeatmap } from '../components/GlobalHeatmap'
import { Heatmap } from '../components/Heatmap'
import { Rewards } from '../components/Rewards'
import { todayKey, formatDate } from '../utils/date'

export const Dashboard = ({
  habits,
  points,
  lifetimePoints,
  pointsSpent,
  bonusDays,
  quoteOfDay,
  settings,
  rewards,
  claimedRewards,
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
    const todayDate = new Date(today)
    const diffDays = Math.round((todayDate - new Date(selectedDateKey)) / 86400000)
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays > 1) return `${diffDays} days ago`
    return 'Upcoming'
  })()

  const handlePreviousDay = () => {
    setSelectedDate(prev => {
      const newDate = new Date(prev)
      newDate.setDate(newDate.getDate() - 1)
      return newDate
    })
  }

  const handleNextDay = () => {
    setSelectedDate(prev => {
      const newDate = new Date(prev)
      newDate.setDate(newDate.getDate() + 1)
      return newDate
    })
  }

  const handleToday = () => {
    setSelectedDate(new Date())
  }

  const handleDateChange = (value) => {
    if (!value) return
    const parsed = new Date(value)
    if (Number.isNaN(parsed.getTime())) return
    setSelectedDate(parsed)
  }

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

      <div className="glass rounded-xl p-4">
        <div className="flex w-full items-center gap-3">
          <button
            onClick={handlePreviousDay}
            className="h-10 shrink-0 rounded-lg border border-white/10 px-4 text-sm font-semibold text-slate-100 hover:border-white/30 hover:bg-white/5"
          >
            ←
          </button>

          <div className="flex flex-1 items-center justify-center gap-3 text-center">
            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-[0.18em] text-brand-100">Date</span>
              <span className="text-base font-semibold text-white leading-tight">{selectedDateDisplay}</span>
            </div>
            <label className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-slate-900/70 text-white shadow-soft cursor-pointer hover:border-white/30">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4 pointer-events-none">
                <rect x="3" y="5" width="18" height="16" rx="2" ry="2" />
                <line x1="16" y1="3" x2="16" y2="7" />
                <line x1="8" y1="3" x2="8" y2="7" />
                <line x1="3" y1="11" x2="21" y2="11" />
              </svg>
              <input
                aria-label="Select date"
                type="date"
                max={today}
                value={selectedDateKey}
                onChange={(e) => handleDateChange(e.target.value)}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </label>
          </div>

          <button
            onClick={handleNextDay}
            disabled={isToday}
            className="h-10 shrink-0 rounded-lg border border-white/10 px-4 text-sm font-semibold text-slate-100 hover:border-white/30 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            →
          </button>
        </div>
      </div>

      <DashboardStats
        habits={habits}
        points={points}
        lifetimePoints={lifetimePoints}
        pointsSpent={pointsSpent}
        bonusDays={bonusDays}
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
          onAdd={onAddReward}
          onClaim={onClaimReward}
          onUpdate={onUpdateReward}
          onDelete={onDeleteReward}
        />
      </div>
    </div>
  )
}
