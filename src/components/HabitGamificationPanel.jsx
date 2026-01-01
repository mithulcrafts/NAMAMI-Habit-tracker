export const HabitGamificationPanel = ({ habit, globalSettings, onUpdate }) => {
  const useGlobal = habit.useGlobalGamification ?? true
  const customPoints = habit.customPoints ?? globalSettings.pointsPerHabit
  const customBonuses = habit.customStreakBonuses ?? globalSettings.streakBonuses

  return (
    <div className="rounded-xl border border-white/5 bg-slate-900/70 p-4">
      <h4 className="text-sm font-semibold text-white">Gamification for this habit</h4>
      
      <div className="mt-3 flex items-center gap-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="gamification"
            checked={useGlobal}
            onChange={() => onUpdate(habit.id, true, null, null)}
          />
          <span className="text-sm text-slate-200">Use global MITHURA rules</span>
        </label>
      </div>
      
      <div className="mt-2 flex items-center gap-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="gamification"
            checked={!useGlobal}
            onChange={() => onUpdate(habit.id, false, customPoints, customBonuses)}
          />
          <span className="text-sm text-slate-200">Custom MITHURA for this habit</span>
        </label>
      </div>

      {!useGlobal && (
        <div className="mt-4 space-y-2 rounded-lg bg-slate-900 p-3">
          <div>
            <label className="text-xs font-semibold text-slate-200">MITHURA per completion</label>
            <input
              type="number"
              min="1"
              value={customPoints || globalSettings.pointsPerHabit}
              onChange={(e) =>
                onUpdate(
                  habit.id,
                  false,
                  Number(e.target.value),
                  customBonuses
                )
              }
              className="mt-1 w-full rounded-md border border-white/10 bg-slate-800 px-2 py-1 text-xs"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[3, 7, 30].map((days) => (
              <div key={days}>
                <label className="text-xs font-semibold text-slate-200">{days}d bonus</label>
                <input
                  type="number"
                  min="0"
                  value={customBonuses?.[days] ?? globalSettings.streakBonuses[days] ?? 0}
                  onChange={(e) =>
                    onUpdate(
                      habit.id,
                      false,
                      customPoints,
                      { ...customBonuses, [days]: Number(e.target.value) }
                    )
                  }
                  className="mt-1 w-full rounded-md border border-white/10 bg-slate-800 px-2 py-1 text-xs"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {useGlobal && (
        <div className="mt-3 rounded-lg bg-slate-900/50 p-2 text-xs text-slate-300">
          <p>Per completion: {globalSettings.pointsPerHabit} MITHURA</p>
          <p>3-day streak: +{globalSettings.streakBonuses[3]} MITHURA</p>
          <p>7-day streak: +{globalSettings.streakBonuses[7]} MITHURA</p>
          <p>30-day streak: +{globalSettings.streakBonuses[30]} MITHURA</p>
        </div>
      )}
    </div>
  )
}
