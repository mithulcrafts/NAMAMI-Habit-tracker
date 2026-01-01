import { useMemo, useState } from 'react'
import { HabitCard } from '../components/HabitCard'
import { HabitForm } from '../components/HabitForm'
import { DashboardStats } from '../components/DashboardStats'
import { QuoteCard } from '../components/QuoteCard'
import { WidgetCard } from '../components/WidgetCard'
import { GlobalHeatmap } from '../components/GlobalHeatmap'
import { Heatmap } from '../components/Heatmap'
import { todayKey } from '../utils/date'

export const Dashboard = ({
  habits,
  points,
  bonusDays,
  quoteOfDay,
  settings,
  onCategoryChange,
  onAddCustomQuote,
  onAddHabit,
  onToggle,
  onOpenHabit,
  onEditHabit,
  onDeleteHabit,
}) => {
  const [editing, setEditing] = useState(null)
  const today = todayKey()

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
        <div className="flex gap-2">
          <a
            className="rounded-md border border-white/10 px-3 py-2 text-sm text-slate-200 hover:border-white/30"
            href="#widget"
          >
            Widget
          </a>
        </div>
      </div>

      <DashboardStats habits={habits} points={points} bonusDays={bonusDays} />

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

      <div className="grid gap-4 lg:grid-cols-2">
        <QuoteCard
          quote={quoteOfDay}
          category={settings.quoteCategory}
          onCategoryChange={onCategoryChange}
          onAddCustom={onAddCustomQuote}
        />
        <WidgetCard quote={quoteOfDay} streak={Math.max(0, ...habits.map((h) => h.streak || 0))} points={points} />
      </div>
    </div>
  )
}
