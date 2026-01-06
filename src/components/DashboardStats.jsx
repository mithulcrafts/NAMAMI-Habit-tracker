import { todayKey } from '../utils/date'

const Stat = ({ label, value, hint }) => (
  <div className="glass rounded-xl p-4">
    <p className="text-xs uppercase tracking-widest text-brand-100">{label}</p>
    <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
    {hint && <p className="text-sm text-slate-300">{hint}</p>}
  </div>
)

export const DashboardStats = ({ habits, points, lifetimePoints, pointsSpent, bonusDays, globalStreak }) => {
  const today = todayKey()
  const completedToday = habits.filter((h) => h.history?.[today])
  const bestStreak = Math.max(0, ...habits.map((h) => h.streak || 0))

  const totalEarned = lifetimePoints ?? points
  const totalSpent = pointsSpent ?? 0

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <Stat label="Habits today" value={`${completedToday.length}/${habits.length}`} hint="Completed / total" />
      <Stat 
        label="Streaks" 
        value={`${globalStreak || 0} days`} 
        hint={`All habits · Best single: ${bestStreak} days`} 
      />
      <Stat
        label="MITHURA balance"
        value={points}
        hint={bonusDays.length
          ? `Earned ${totalEarned} · Spent ${totalSpent} · Bonuses on ${bonusDays.length} days`
          : `Earned ${totalEarned} · Spent ${totalSpent}`}
      />
    </div>
  )
}
