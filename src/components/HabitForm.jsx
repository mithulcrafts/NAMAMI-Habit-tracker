import { useEffect, useState } from 'react'

const defaultData = {
  name: '',
  description: '',
  frequency: 'daily',
  customDays: [],
  isDailyHabit: true,
  targetDays: 30,
  goalType: 'binary',
  goalTarget: null,
  habitColor: '#38bdf8',
  customPoints: 10,
  customStreakBonuses: { 3: 2, 7: 5, 30: 10 },
}

const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const colorOptions = ['#38bdf8', '#c084fc', '#34d399', '#fbbf24', '#f87171', '#818cf8', '#ec4899', '#14b8a6']

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
    const dataToSave = { ...form }
    if (dataToSave.isDailyHabit) {
      delete dataToSave.targetDays
    }
    onSave(dataToSave)
    if (!initial) setForm(defaultData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="text-sm font-semibold text-slate-200">Habit name</label>
        <input
          className="mt-1 w-full rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm focus:border-brand-400 focus:ring-brand-400"
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          required
        />
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-200">Description</label>
        <textarea
          className="mt-1 w-full rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm focus:border-brand-400 focus:ring-brand-400"
          value={form.description}
          onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
          rows={2}
        />
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-200">Habit type</p>
        <div className="mt-2 flex gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="habitType"
              value="daily"
              checked={form.isDailyHabit}
              onChange={() => setForm((p) => ({ ...p, isDailyHabit: true }))}
            />
            <span className="text-sm text-slate-200">Daily habit (no target)</span>
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
        <p className="text-sm font-semibold text-slate-200">Goal type</p>
        <div className="mt-2 flex flex-col gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="goalType"
              value="binary"
              checked={form.goalType === 'binary'}
              onChange={() => setForm((p) => ({ ...p, goalType: 'binary', goalTarget: null }))}
            />
            <span className="text-sm text-slate-200">Binary (done / not done)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="goalType"
              value="count"
              checked={form.goalType === 'count'}
              onChange={() => setForm((p) => ({ ...p, goalType: 'count', goalTarget: 10 }))}
            />
            <span className="text-sm text-slate-200">Count-based (e.g., read 10 pages)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="goalType"
              value="duration"
              checked={form.goalType === 'duration'}
              onChange={() => setForm((p) => ({ ...p, goalType: 'duration', goalTarget: 20 }))}
            />
            <span className="text-sm text-slate-200">Duration-based (e.g., meditate 20 min)</span>
          </label>
        </div>
      </div>

      {form.goalType !== 'binary' && form.isDailyHabit === false && (
        <div>
          <label className="text-sm font-semibold text-slate-200">
            {form.goalType === 'count' ? 'Target count' : 'Target minutes'}
          </label>
          <input
            type="number"
            min="1"
            className="mt-1 w-full rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm focus:border-brand-400 focus:ring-brand-400"
            value={form.goalTarget || (form.goalType === 'count' ? 10 : 20)}
            onChange={(e) => setForm((p) => ({ ...p, goalTarget: Number(e.target.value) }))}
            required
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-semibold text-slate-200">Frequency</label>
          <select
            className="mt-1 w-full rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm focus:border-brand-400 focus:ring-brand-400"
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
            <label className="text-sm font-semibold text-slate-200">Target days</label>
            <input
              type="number"
              min="1"
              className="mt-1 w-full rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm focus:border-brand-400 focus:ring-brand-400"
              value={form.targetDays || 30}
              onChange={(e) => setForm((p) => ({ ...p, targetDays: Number(e.target.value) }))}
              required
            />
          </div>
        )}
      </div>
      {form.frequency === 'custom' && (
        <div>
          <p className="text-sm font-semibold text-slate-200">Select days</p>
          <div className="mt-2 flex gap-2">
            {days.map((label, idx) => {
              const active = form.customDays?.includes(idx)
              return (
                <button
                  type="button"
                  key={label + idx}
                  onClick={() => toggleDay(idx)}
                  className={`h-9 w-9 rounded-full border text-sm font-semibold ${
                    active
                      ? 'border-brand-400 bg-brand-500/20 text-brand-100'
                      : 'border-white/10 bg-slate-900 text-slate-200'
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
        <label className="text-sm font-semibold text-slate-200">Heatmap color</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {colorOptions.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setForm((p) => ({ ...p, habitColor: color }))}
              className={`h-10 w-10 rounded-lg border-2 transition ${
                form.habitColor === color
                  ? 'border-white ring-2 ring-offset-2 ring-offset-slate-950'
                  : 'border-white/20 hover:border-white/40'
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-slate-200">MITHURA per completion</label>
        <input
          type="number"
          min="1"
          className="mt-1 w-full rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm focus:border-brand-400 focus:ring-brand-400"
          value={form.customPoints || 10}
          onChange={(e) => setForm((p) => ({ ...p, customPoints: Number(e.target.value) }))}
          required
        />
        <p className="mt-1 text-xs text-slate-400">Points earned for completing this habit</p>
      </div>

      <div>
        <label className="text-sm font-semibold text-slate-200">Streak bonuses (for this habit)</label>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {[3, 7, 30].map((days) => (
            <div key={days}>
              <label className="text-xs text-slate-300">{days}-day streak</label>
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
                className="mt-1 w-full rounded-md border border-white/10 bg-slate-900 px-2 py-1 text-sm focus:border-brand-400 focus:ring-brand-400"
              />
            </div>
          ))}
        </div>
        <p className="mt-1 text-xs text-slate-400">Bonus MITHURA for maintaining streaks on this habit</p>
      </div>

      <div className="flex items-center justify-end gap-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-white/10 px-4 py-2 text-sm text-slate-200 hover:border-white/30"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="rounded-md bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-soft hover:bg-brand-400"
        >
          {initial ? 'Save changes' : 'Add habit'}
        </button>
      </div>
    </form>
  )
}
