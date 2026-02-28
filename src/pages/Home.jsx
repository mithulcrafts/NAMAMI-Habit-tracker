import { useMemo, useRef, useState } from 'react'
import { HabitCard } from '../components/HabitCard'
import { HabitForm } from '../components/HabitForm'
import { DashboardStats } from '../components/DashboardStats'
import { QuoteCard } from '../components/QuoteCard'
import { GlobalHeatmap } from '../components/GlobalHeatmap'
import { Heatmap } from '../components/Heatmap'
import { HabitDetail } from './HabitDetail'
import { todayKey, formatDate } from '../utils/date'

export const Home = ({
  habits,
  points,
  lifetimePoints,
  pointsSpent,
  bonusDays,
  globalStreak,
  earnedBadges,
  quoteOfDay,
  category,
  onCategoryChange,
  onAddCustomQuote,
  onAddHabit,
  onToggle,
  onOpenHabit,
  onEditHabit,
  onDeleteHabit,
  globalSettings,
  onUpdateHabitGamification,
  streakFreezes,
  onUseStreakFreeze,
  onRemoveStreakFreeze,
}) => {
  const [editing, setEditing] = useState(null)
  const [openDetailHabitId, setOpenDetailHabitId] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const dateInputRef = useRef(null)
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

  const openDetailHabit = openDetailHabitId ? habits.find((h) => h.id === openDetailHabitId) : null

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

  const handleDateChange = (value) => {
    if (!value) return
    const [year, month, day] = value.split('-').map(Number)
    const parsed = new Date(year, month - 1, day)
    if (Number.isNaN(parsed.getTime())) return
    setSelectedDate(parsed)
  }

  const openDatePicker = () => {
    const input = dateInputRef.current
    if (!input) return
    if (typeof input.showPicker === 'function') {
      input.showPicker()
      return
    }
    input.click()
  }

  const sortedHabits = useMemo(
    () =>
      [...habits].sort((a, b) => {
        const doneA = a.history?.[today] ? 1 : 0
        const doneB = b.history?.[today] ? 1 : 0
        return doneA === doneB ? b.streak - a.streak : doneA - doneB
      }),
    [habits, today],
  )

  return (
    <div className="space-y-6">
      <QuoteCard
        quote={quoteOfDay}
        category={category}
        onCategoryChange={onCategoryChange}
        onAddCustom={onAddCustomQuote}
      />

      <div className="glass rounded-xl p-4">
        <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-2 sm:gap-3">
          <button
            onClick={handlePreviousDay}
            aria-label="Previous day"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 text-sm font-semibold text-slate-100 hover:border-white/30 hover:bg-white/5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="flex min-w-0 items-center justify-center gap-2 text-center sm:gap-3">
            <div className="flex min-w-0 flex-col">
              <span className="text-[11px] uppercase tracking-[0.18em] text-brand-100">Date</span>
              <span className="date-display-safe truncate text-sm font-semibold leading-tight text-white sm:text-base">{selectedDateDisplay}</span>
            </div>
            <button
              type="button"
              onClick={openDatePicker}
              className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-slate-900/70 text-white shadow-soft cursor-pointer hover:border-white/30"
              aria-label="Select date"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4 pointer-events-none">
                <rect x="3" y="5" width="18" height="16" rx="2" ry="2" />
                <line x1="16" y1="3" x2="16" y2="7" />
                <line x1="8" y1="3" x2="8" y2="7" />
                <line x1="3" y1="11" x2="21" y2="11" />
              </svg>
            </button>
            <input
              ref={dateInputRef}
              aria-label="Select date"
              type="date"
              max={today}
              value={selectedDateKey}
              onChange={(e) => handleDateChange(e.target.value)}
              className="pointer-events-none absolute h-px w-px opacity-0"
              tabIndex={-1}
            />
          </div>

          <button
            onClick={handleNextDay}
            disabled={isToday}
            aria-label="Next day"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 text-sm font-semibold text-slate-100 hover:border-white/30 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

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
            <div key={habit.id}>
              <HabitCard
                habit={habit}
                selectedDateKey={selectedDateKey}
                isToday={isToday}
                selectedDateLabel={selectedDateDisplay}
                relativeLabel={relativeLabel}
                onToggle={onToggle}
                onOpen={() => setOpenDetailHabitId(habit.id)}
                onEdit={(h) => setEditing(h)}
                onDelete={onDeleteHabit}
                streakFreezes={streakFreezes}
                onUseStreakFreeze={onUseStreakFreeze}
                onRemoveStreakFreeze={onRemoveStreakFreeze}
              />
              {openDetailHabitId === habit.id && openDetailHabit && (
                <div className="mt-3">
                  <HabitDetail
                    habit={openDetailHabit}
                    points={lifetimePoints}
                    earnedBadges={earnedBadges}
                    globalSettings={globalSettings}
                    onUpdateHabitGamification={onUpdateHabitGamification}
                    onClose={() => setOpenDetailHabitId(null)}
                  />
                </div>
              )}
            </div>
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
    </div>
  )
}
