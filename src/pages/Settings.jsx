import { useEffect, useState } from 'react'
import { requestNotificationPermission } from '../utils/notifications'

export const Settings = ({ settings, onUpdate }) => {
  const [local, setLocal] = useState(settings)

  useEffect(() => {
    setLocal(settings)
  }, [settings])

  const handleSave = () => {
    onUpdate(local)
  }

  const handleNotifyToggle = async () => {
    const ok = await requestNotificationPermission()
    if (ok) {
      setLocal((p) => ({ ...p, notificationsEnabled: !p.notificationsEnabled }))
      onUpdate({ ...local, notificationsEnabled: !local.notificationsEnabled })
    }
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-white">⚙️ Settings</h3>
      <p className="text-xs text-slate-400">Configure global gamification defaults. Per-habit overrides are set on individual habit detail pages.</p>
      
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-white/5 bg-slate-900/70 p-4">
          <p className="text-sm font-semibold text-white">Global MITHURA Points</p>
          <label className="mt-3 block text-sm text-slate-300">Points per habit completion</label>
          <input
            type="number"
            min="1"
            value={local.pointsPerHabit}
            onChange={(e) => setLocal((p) => ({ ...p, pointsPerHabit: Number(e.target.value) }))}
            className="mt-1 w-full rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm"
          />
          <label className="mt-3 block text-sm text-slate-300">Bonus for completing all habits</label>
          <input
            type="number"
            min="0"
            value={local.dailyBonus}
            onChange={(e) => setLocal((p) => ({ ...p, dailyBonus: Number(e.target.value) }))}
            className="mt-1 w-full rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm"
          />
        </div>

        <div className="rounded-xl border border-white/5 bg-slate-900/70 p-4">
          <p className="text-sm font-semibold text-white">Streak Bonuses</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[3, 7, 30].map((days) => (
              <div key={days}>
                <label className="text-sm text-slate-300">{days}-day streak</label>
                <input
                  type="number"
                  min="0"
                  value={local.streakBonuses?.[days] ?? 0}
                  onChange={(e) =>
                    setLocal((p) => ({
                      ...p,
                      streakBonuses: { ...p.streakBonuses, [days]: Number(e.target.value) },
                    }))
                  }
                  className="mt-1 w-full rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-white/5 bg-slate-900/70 p-4">
          <p className="text-sm font-semibold text-white">Features</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-slate-200">Enable gamification</span>
            <input
              type="checkbox"
              checked={local.gamificationEnabled}
              onChange={(e) => setLocal((p) => ({ ...p, gamificationEnabled: e.target.checked }))}
            />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm text-slate-200">Enable notifications</span>
            <input type="checkbox" checked={local.notificationsEnabled} onChange={handleNotifyToggle} />
          </div>
        </div>

        <div className="rounded-xl border border-white/5 bg-slate-900/70 p-4">
          <p className="text-sm font-semibold text-white">Quote Settings</p>
          <label className="mt-3 block text-sm text-slate-200">Preferred quote category</label>
          <select
            value={local.quoteCategory ?? 'general'}
            onChange={(e) => setLocal((p) => ({ ...p, quoteCategory: e.target.value }))}
            className="mt-1 w-full rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm"
          >
            <option value="general">General inspirational</option>
            <option value="gita">Bhagavad Gita wisdom</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="rounded-md bg-brand-500 px-4 py-2 text-sm font-semibold text-white"
      >
        Save settings
      </button>
    </div>
  )
}
