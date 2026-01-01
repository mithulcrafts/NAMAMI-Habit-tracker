import { Heatmap } from '../components/Heatmap'
import { ProgressCharts } from '../components/ProgressCharts'
import { Badges } from '../components/Badges'
import { HabitGamificationPanel } from '../components/HabitGamificationPanel'
import { formatDate, todayKey } from '../utils/date'

export const HabitDetail = ({
  habit,
  points,
  onClose,
  globalSettings,
  onUpdateHabitGamification,
}) => {
  if (!habit) return null
  
  const completionRate = habit.isDailyHabit ? habit.streak * 10 : Math.min(100, Math.round((habit.totalCompleted / habit.targetDays) * 100)) || 0
  const lastCheck = Object.keys(habit.history || {})
    .filter((d) => {
      if (habit.goalType === 'binary') {
        return habit.history[d] === true
      } else {
        const value = habit.dailyValueHistory?.[d] ?? 0
        return value >= (habit.goalTarget || 1)
      }
    })
    .sort()
    .pop()

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/90 p-5 shadow-soft">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-brand-100">Habit detail</p>
          <h2 className="text-2xl font-semibold text-white">{habit.name}</h2>
          <p className="text-sm text-slate-300">{habit.description}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: habit.habitColor }} />
            <span className="text-xs text-slate-400">
              {habit.isDailyHabit ? 'Daily habit' : `Target-based (${habit.targetDays} days)`}
            </span>
            <span className="text-xs text-slate-500">·</span>
            <span className="text-xs text-slate-400">
              {habit.goalType === 'binary' && 'Binary (done/missed)'}
              {habit.goalType === 'count' && `Count-based (target: ${habit.goalTarget})`}
              {habit.goalType === 'duration' && `Duration-based (target: ${habit.goalTarget} min)`}
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-md border border-white/10 px-3 py-1 text-sm text-slate-200 hover:border-white/30"
        >
          Close
        </button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="glass rounded-xl p-3">
          <p className="text-xs uppercase tracking-widest text-brand-100">Streak</p>
          <p className="text-2xl font-semibold text-white">{habit.streak} days</p>
        </div>
        <div className="glass rounded-xl p-3">
          <p className="text-xs uppercase tracking-widest text-brand-100">Total completed</p>
          <p className="text-2xl font-semibold text-white">{habit.totalCompleted}</p>
        </div>
        <div className="glass rounded-xl p-3">
          <p className="text-xs uppercase tracking-widest text-brand-100">Progress</p>
          <p className="text-2xl font-semibold text-white">{completionRate}%</p>
        </div>
      </div>

      <div className="mt-3 rounded-xl border border-white/5 bg-slate-900/70 p-4">
        <div className="flex items-center justify-between text-sm text-slate-300">
          <span>
            {habit.isDailyHabit ? 'Ongoing daily habit' : `Target: ${habit.targetDays} days`} · Frequency:{' '}
            {habit.frequency}
          </span>
          <span>Last done: {lastCheck ? formatDate(new Date(lastCheck)) : '—'}</span>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-400 to-accent"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Heatmap 
          history={habit.history} 
          habitColor={habit.habitColor} 
          habitName={habit.name}
          goalType={habit.goalType}
          goalTarget={habit.goalTarget}
          dailyValueHistory={habit.dailyValueHistory}
        />
        <ProgressCharts history={habit.history} />
      </div>

      <div className="mt-4">
        <HabitGamificationPanel
          habit={habit}
          globalSettings={globalSettings}
          onUpdate={onUpdateHabitGamification}
        />
      </div>

      <div className="mt-4">
        <Badges maxStreak={habit.streak} points={points} />
      </div>

      <div id="widget" className="mt-4 rounded-xl border border-white/5 bg-slate-900/70 p-3">
        <p className="text-sm font-semibold text-white">Today</p>
        <p className="text-sm text-slate-300">{todayKey()}</p>
      </div>
    </div>
  )
}
