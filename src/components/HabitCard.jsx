import { useState } from 'react'
import { todayKey } from '../utils/date'

export const HabitCard = ({ habit, onToggle, onOpen, onEdit, onDelete }) => {
  const today = todayKey()
  const [valueInput, setValueInput] = useState('')
  
  const doneToday = habit.history?.[today]
  const completion = Math.min(100, Math.round((habit.totalCompleted / habit.targetDays) * 100)) || 0
  
  // For count/duration, get today's value
  const todayValue = habit.dailyValueHistory?.[today] ?? null
  const goalMet = habit.goalType === 'binary' ? doneToday : (todayValue ?? 0) >= (habit.goalTarget || 1)

  const handleSubmitValue = () => {
    if (valueInput === '' || isNaN(valueInput)) return
    const value = Number(valueInput)
    onToggle(habit.id, today, value >= (habit.goalTarget || 1), value)
    setValueInput('')
  }

  return (
    <div className="glass card-hover rounded-xl p-4 fade-in">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-brand-200">{habit.frequency}</p>
          <h3 className="text-lg font-semibold text-white">{habit.name}</h3>
          <p className="text-sm text-slate-300">{habit.description}</p>
        </div>
        <div className="flex gap-2">
          <button
            className="rounded-md border border-white/10 px-3 py-1 text-xs text-slate-200 hover:border-white/30"
            onClick={() => onEdit(habit)}
          >
            Edit
          </button>
          <button
            className="rounded-md border border-red-500/40 px-3 py-1 text-xs text-red-200 hover:border-red-400/60"
            onClick={() => onDelete(habit.id)}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-300">
        <span className="rounded-full bg-brand-500/15 px-3 py-1 text-brand-100">Streak: {habit.streak}d</span>
        <span className="rounded-full bg-slate-800 px-3 py-1">Done: {habit.totalCompleted}</span>
        <span className="rounded-full bg-slate-800 px-3 py-1">Target: {habit.targetDays} days</span>
        {habit.goalType !== 'binary' && (
          <span className="rounded-full bg-slate-800 px-3 py-1">
            {habit.goalType === 'count' ? 'Count' : 'Duration'}: {habit.goalTarget}
          </span>
        )}
      </div>

      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-400 to-accent"
          style={{ width: `${completion}%` }}
        />
      </div>

      <div className="mt-3 flex flex-col gap-2">
        {habit.goalType === 'binary' ? (
          <button
            onClick={() => onToggle(habit.id, today, !doneToday)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-soft transition ${
              doneToday ? 'bg-emerald-500 hover:bg-emerald-400' : 'bg-slate-800 hover:bg-slate-700'
            }`}
          >
            {doneToday ? 'Completed today' : 'Mark done today'}
          </button>
        ) : (
          <div className="flex gap-2">
            <input
              type="number"
              min="0"
              placeholder={`Enter ${habit.goalType === 'count' ? 'count' : 'minutes'}`}
              value={valueInput}
              onChange={(e) => setValueInput(e.target.value)}
              className="flex-1 rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-brand-400 focus:ring-brand-400"
            />
            <button
              onClick={handleSubmitValue}
              disabled={valueInput === ''}
              className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-soft hover:bg-brand-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Log
            </button>
          </div>
        )}
        {habit.goalType !== 'binary' && todayValue !== null && (
          <div className={`rounded-md px-3 py-2 text-sm font-semibold ${
            goalMet ? 'bg-emerald-500/15 text-emerald-200' : 'bg-amber-500/15 text-amber-200'
          }`}>
            {todayValue} / {habit.goalTarget} {habit.goalType === 'count' ? 'completed' : 'minutes'}
            {goalMet && ' ✓ Goal met!'}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-end">
        <button
          onClick={() => onOpen(habit)}
          className="text-sm font-semibold text-brand-200 hover:text-brand-100"
        >
          View detail →
        </button>
      </div>
    </div>
  )
}
