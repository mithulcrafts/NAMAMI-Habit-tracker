const badgeList = [
  { id: 'badge-3', label: '3-day Streak', requirement: 3, color: 'from-emerald-400 to-emerald-600' },
  { id: 'badge-7', label: '7-day Streak', requirement: 7, color: 'from-blue-400 to-blue-600' },
  { id: 'badge-30', label: '30-day Streak', requirement: 30, color: 'from-purple-400 to-purple-700' },
  { id: 'badge-100', label: '100+ MITHURA', requirement: 100, color: 'from-amber-400 to-amber-600', type: 'points' },
]

export const Badges = ({ maxStreak, points }) => {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {badgeList.map((badge) => {
        const unlocked = badge.type === 'points' ? points >= badge.requirement : maxStreak >= badge.requirement
        return (
          <div
            key={badge.id}
            className={`rounded-xl border border-white/5 bg-slate-900/70 p-4 transition ${unlocked ? 'badge-glow' : 'opacity-70'}`}
          >
            <div
              className={`inline-flex rounded-full bg-gradient-to-r ${badge.color} px-3 py-1 text-xs font-semibold text-slate-900`}
            >
              {unlocked ? 'Unlocked' : 'Locked'}
            </div>
            <h4 className="mt-2 text-lg font-semibold text-white">{badge.label}</h4>
            <p className="text-sm text-slate-300">
              {badge.type === 'points'
                ? `Earn ${badge.requirement}+ MITHURA`
                : `Maintain a ${badge.requirement}-day streak`}
            </p>
          </div>
        )
      })}
    </div>
  )
}
