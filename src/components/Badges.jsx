const badgeList = [
  { id: 'badge-3', label: '3-day Streak', requirement: 3, color: 'from-emerald-400 to-emerald-600', icon: '🔥' },
  { id: 'badge-7', label: '7-day Streak', requirement: 7, color: 'from-cyan-400 to-cyan-600', icon: '🌟' },
  { id: 'badge-30', label: '30-day Streak', requirement: 30, color: 'from-purple-400 to-purple-700', icon: '👑' },
  { id: 'badge-100', label: '100+ MITHURA', requirement: 100, color: 'from-amber-400 to-amber-600', type: 'points', icon: '💎' },
]

export const Badges = ({ maxStreak, points }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-100">Badges Earned</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {badgeList.map((badge) => {
          const unlocked = badge.type === 'points' ? points >= badge.requirement : maxStreak >= badge.requirement
          return (
            <div
              key={badge.id}
              className={`glass rounded-xl p-4 transition ${unlocked ? 'badge-glow' : 'opacity-50'}`}
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl">{badge.icon}</div>
                <div className="flex-1">
                  <div
                    className={`inline-flex rounded-full bg-gradient-to-r ${badge.color} px-2 py-0.5 text-xs font-bold text-slate-900 uppercase tracking-wide`}
                  >
                    {unlocked ? 'UNLOCKED' : 'LOCKED'}
                  </div>
                  <h4 className="mt-1 text-sm font-bold uppercase tracking-wide text-white">{badge.label}</h4>
                  <p className="text-xs text-slate-400 font-medium">
                    {badge.type === 'points'
                      ? `${Math.max(0, badge.requirement - (points || 0))} MITHURA needed`
                      : `${Math.max(0, badge.requirement - (maxStreak || 0))} days to go`}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

