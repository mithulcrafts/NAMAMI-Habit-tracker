import { useEffect, useState } from 'react'

const defaultData = {
  name: '',
  description: '',
  frequency: 'daily',
  customDays: [],
  isDailyHabit: true,
  targetDays: null,
  goalType: 'binary',
  goalTarget: null,
  habitColor: '#00F5FF',
  customPoints: 10,
  customStreakBonuses: { 3: 2, 7: 5, 30: 10 },
}

const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const colorOptions = [
  '#00F5FF', // Neon Cyan
  '#B026FF', // Electric Purple
  '#00FFA3', // Mint Neon
  '#FFC857', // Amber
  '#FF006E', // Hot Pink
  '#00D9FF', // Sky Cyan
  '#39FF14', // Neon Green
  '#FF10F0', // Magenta
]

export const HabitForm = ({ onSave, onCancel, initial }) => {
  const [form, setForm] = useState(initial || defaultData)

  useEffect(() => {
    if (initial) setForm(initial)
  }, [initial])

  const toggleDay = (index) => {
    setForm((prev) => {
      const exists = prev.customDays?.includes(index)
      const nextDays = exists
        ? prev.customDays.filter((d) => d !== index)
        : [...(prev.customDays || []), index]
      return { ...prev, customDays: nextDays }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validation: goalTarget must be > 0 if goal type is not binary
    if (form.goalType !== 'binary' && (!form.goalTarget || form.goalTarget <= 0)) {
      alert('Please enter a valid target value (must be greater than 0)')
      return
    }
    
    // Validation: targetDays must be > 0 if target-based
    if (!form.isDailyHabit && (!form.targetDays || form.targetDays <= 0)) {
      alert('Please enter valid target days (must be greater than 0)')
      return
    }
    
    const dataToSave = { ...form }
    if (dataToSave.isDailyHabit) {
      delete dataToSave.targetDays
    }
    onSave(dataToSave)
    if (!initial) setForm(defaultData)
  }

  // Check if form is valid for submission
  const isFormValid = () => {
    if (!form.name.trim()) return false
    if (form.goalType !== 'binary' && (!form.goalTarget || form.goalTarget <= 0)) return false
    if (!form.isDailyHabit && (!form.targetDays || form.targetDays <= 0)) return false
    return true
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="text-sm font-bold uppercase tracking-wider text-slate-200 dark:text-slate-200">HABIT NAME</label>
        <input
          className="mt-1 w-full rounded-md border border-cyan-400/20 dark:border-cyan-400/20 bg-slate-100 dark:bg-black backdrop-blur px-3 py-2 text-sm text-slate-900 dark:text-cyan-200 placeholder-slate-400 dark:placeholder-slate-500 focus:border-brand-400 focus:ring-brand-400"
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          required
        />
      </div>
      <div>
        <label className="text-sm font-bold uppercase tracking-wider text-slate-200">DESCRIPTION</label>
        <textarea
          className="mt-1 w-full rounded-md border border-cyan-400/20 bg-slate-900/40 backdrop-blur px-3 py-2 text-sm text-cyan-200 placeholder-slate-500 focus:border-brand-400 focus:ring-brand-400"
          value={form.description}
          onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
          rows={2}
        />
      </div>

      <div>
        <p className="text-sm font-bold uppercase tracking-wider text-slate-200\">HABIT TYPE</p>
        <div className="mt-2 flex gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="habitType"
              value="daily"
              checked={form.isDailyHabit}
              onChange={() => setForm((p) => ({ ...p, isDailyHabit: true }))}
            />
            <span className="text-sm text-slate-200\">Daily habit (no target)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="habitType"
              value="target"
              checked={!form.isDailyHabit}
              onChange={() => setForm((p) => ({ ...p, isDailyHabit: false }))}
            />
            <span className="text-sm text-slate-200">Target-based challenge</span>
          </label>
        </div>
      </div>

      <div>
        <p className="text-sm font-bold uppercase tracking-wider text-slate-200\">GOAL TYPE</p>
        <div className="mt-2 flex flex-col gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="goalType"
              value="binary"
              checked={form.goalType === 'binary'}
              onChange={() => setForm((p) => ({ ...p, goalType: 'binary', goalTarget: null }))}
            />
            <span className="text-sm text-slate-200\">Binary (done / not done)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="goalType"
              value="count"
              checked={form.goalType === 'count'}
              onChange={() => setForm((p) => ({ ...p, goalType: 'count', goalTarget: null }))}
            />
            <span className="text-sm text-slate-200">Count-based (e.g., read 10 pages)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="goalType"
              value="duration"
              checked={form.goalType === 'duration'}
              onChange={() => setForm((p) => ({ ...p, goalType: 'duration', goalTarget: null }))}
            />
            <span className="text-sm text-slate-200">Duration-based (e.g., meditate 20 min)</span>
          </label>
        </div>
      </div>

      {form.goalType !== 'binary' && (
        <div>
          <label className="text-sm font-bold uppercase tracking-wider text-slate-200">
            {form.goalType === 'count' ? 'TARGET COUNT' : 'TARGET MINUTES'}
          </label>
          <input
            type="text"
            inputMode="numeric"
            className="mt-1 w-full rounded-md border border-cyan-400/20 bg-slate-900/40 backdrop-blur px-3 py-2 text-sm text-cyan-200 placeholder-slate-500 focus:border-brand-400 focus:ring-brand-400"
            placeholder="Enter target value"
            value={form.goalTarget ?? ''}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9]/g, '')
              setForm((p) => ({ ...p, goalTarget: val ? Number(val) : null }))
            }}
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-bold uppercase tracking-wider text-slate-200">FREQUENCY</label>
          <select
            className="mt-1 w-full rounded-md border border-cyan-400/20 bg-slate-900/40 backdrop-blur px-3 py-2 text-sm text-cyan-200 focus:border-brand-400 focus:ring-brand-400"
            value={form.frequency}
            onChange={(e) => setForm((p) => ({ ...p, frequency: e.target.value }))}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="custom">Custom days</option>
          </select>
        </div>
        {!form.isDailyHabit && (
          <div>
            <label className="text-sm font-bold uppercase tracking-wider text-slate-200">TARGET DAYS</label>
            <input
              type="text"
              inputMode="numeric"
              className="mt-1 w-full rounded-md border border-cyan-400/20 bg-slate-900/40 backdrop-blur px-3 py-2 text-sm text-cyan-200 placeholder-slate-500 focus:border-brand-400 focus:ring-brand-400"
              placeholder="Enter target days"
              value={form.targetDays ?? ''}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, '')
                setForm((p) => ({ ...p, targetDays: val ? Number(val) : null }))
              }}
            />
          </div>
        )}
      </div>
      {form.frequency === 'custom' && (
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-slate-200\">SELECT DAYS</p>
          <div className="mt-2 flex gap-2">
            {days.map((label, idx) => {
              const active = form.customDays?.includes(idx)
              return (
                <button
                  type="button"
                  key={label + idx}
                  onClick={() => toggleDay(idx)}
                  className={`h-9 w-9 rounded-full border text-sm font-bold uppercase ${
                    active
                      ? 'border-brand-400 bg-brand-500/20 text-brand-100'
                      : 'border-white/10 bg-slate-900/40 text-slate-200'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>
      )}
      <div>
        <label className="text-sm font-bold uppercase tracking-wider text-slate-200">HEATMAP COLOR</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {colorOptions.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setForm((p) => ({ ...p, habitColor: color }))}
              className={`h-10 w-10 rounded-lg border-2 transition shadow-lg ${
                form.habitColor === color
                  ? 'border-white ring-2 ring-offset-2 ring-offset-slate-950'
                  : 'border-slate-700 hover:border-slate-500'
              }`}
              style={{ 
                backgroundColor: color,
                boxShadow: `0 0 12px ${color}80, 0 0 24px ${color}40 ${form.habitColor === color ? `, 0 0 8px ${color}` : ''}`
              }}
              title={color}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-bold uppercase tracking-wider text-slate-200">MITHURA PER COMPLETION</label>
        <input
          type="text"
          inputMode="numeric"
          className="mt-1 w-full rounded-md border border-cyan-400/20 bg-slate-900/40 backdrop-blur px-3 py-2 text-sm text-cyan-200 placeholder-slate-500 focus:border-brand-400 focus:ring-brand-400"
          value={form.customPoints ?? ''}
          onChange={(e) => {
            const val = e.target.value.replace(/[^0-9]/g, '')
            setForm((p) => ({ ...p, customPoints: val ? Number(val) : null }))
          }}
          placeholder="Enter points"
        />
        <p className="mt-1 text-xs text-slate-400\">Points earned for completing this habit</p>
      </div>

      <div>
        <label className="text-sm font-bold uppercase tracking-wider text-slate-200">STREAK BONUSES (FOR THIS HABIT)</label>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {[3, 7, 30].map((days) => (
            <div key={days}>
              <label className="text-xs text-slate-400">{days}-day streak</label>
              <input
                type="number"
                min="0"
                value={form.customStreakBonuses?.[days] ?? 0}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    customStreakBonuses: { ...p.customStreakBonuses, [days]: Number(e.target.value) },
                  }))
                }
                className="mt-1 w-full rounded-md border border-cyan-400/20 bg-slate-900/40 backdrop-blur px-2 py-1 text-sm text-cyan-200 placeholder-slate-500 focus:border-brand-400 focus:ring-brand-400"
              />
            </div>
          ))}
        </div>
        <p className="mt-1 text-xs text-slate-400\">Bonus MITHURA for maintaining streaks on this habit</p>
      </div>

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-cyan-400/20 px-4 py-2 text-sm font-bold uppercase tracking-wider text-slate-200 hover:border-cyan-400/40"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={!isFormValid()}
          className="rounded-md bg-brand-500 px-4 py-2 text-sm font-bold uppercase tracking-wider text-white shadow-soft hover:bg-brand-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {initial ? 'Save changes' : 'Add habit'}
        </button>
      </div>
    </form>
  )
}
