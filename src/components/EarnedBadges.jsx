export const EarnedBadges = ({ earnedBadges, badgeDefinitions, habits }) => {
  // Group badges by badge id to count occurrences
  const badgeCounts = {}
  const badgesByHabit = {}

  earnedBadges?.forEach((badge) => {
    const badgeId = badge.badgeId
    badgeCounts[badgeId] = (badgeCounts[badgeId] || 0) + 1

    if (badge.habitId) {
      if (!badgesByHabit[badgeId]) {
        badgesByHabit[badgeId] = {}
      }
      badgesByHabit[badgeId][badge.habitId] = (badgesByHabit[badgeId][badge.habitId] || 0) + 1
    }
  })

  if (!earnedBadges || earnedBadges.length === 0) {
    return (
      <div className="rounded-lg border border-white/5 bg-slate-900/70 p-4 text-center">
        <p className="text-sm text-slate-300">No badges earned yet. Start building habits to earn badges!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {badgeDefinitions
          .filter((badge) => badgeCounts[badge.id])
          .map((badge) => {
            const count = badgeCounts[badge.id] || 0
            const habitsForBadge = badgesByHabit[badge.id] || {}

            return (
              <div
                key={badge.id}
                className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 backdrop-blur-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="text-4xl">{badge.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{badge.label}</h3>
                    <p className="text-xs text-emerald-200 mt-1">Earned {count}x</p>

                    {badge.habitSpecific && Object.keys(habitsForBadge).length > 0 && (
                      <div className="mt-2 space-y-1">
                        {Object.entries(habitsForBadge).map(([habitId, habitCount]) => {
                          const habit = habits?.find((h) => h.id === habitId)
                          return (
                            <div key={habitId} className="text-xs text-slate-300 bg-slate-900/50 rounded px-2 py-1">
                              <span className="font-medium">{habit?.name || 'Unknown habit'}:</span> {habitCount}x
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
