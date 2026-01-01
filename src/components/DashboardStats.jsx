import { todayKey } from '../utils/date'

const Stat = ({ label, value, hint }) => (
  <div className="glass rounded-xl p-4">
    <p className="text-xs uppercase tracking-widest text-brand-100">{label}</p>
    <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
    {hint && <p className="text-sm text-slate-300">{hint}</p>}
  </div>
)

export const DashboardStats = ({ habits, points, bonusDays }) => {
  const today = todayKey()
  const completedToday = habits.filter((h) => h.history?.[today])
  const bestStreak = Math.max(0, ...habits.map((h) => h.streak || 0))

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <Stat label="Habits today" value={`${completedToday.length}/${habits.length}`} hint="Completed / total" />
      <Stat label="Best streak" value={`${bestStreak} days`} hint="Keep it going" />
      <Stat label="MITHURA" value={points} hint={bonusDays.length ? `Bonuses on ${bonusDays.length} days` : 'Keep stacking points'} />
    </div>
  )
}
