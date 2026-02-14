export const HabitGamificationPanel = ({ habit, globalSettings, onUpdate }) => {
  const customPoints = habit.customPoints ?? 10
  const customBonuses = habit.customStreakBonuses ?? { 3: 2, 7: 5, 30: 10 }

  return (
    <div className="glass rounded-xl p-4">
      <h4 className="text-sm font-bold uppercase tracking-wider text-white\">MITHURA FOR THIS HABIT</h4>
      <p className="mt-1 text-xs text-slate-400\">Each habit has its own points and streak bonuses</p>
      
      <div className="mt-4 space-y-3">
        <div>
          <label className="text-sm font-bold uppercase tracking-wider text-slate-200\">MITHURA PER COMPLETION</label>
          <input
            type="number"
            min="1"
            value={customPoints}
            onChange={(e) =>
              onUpdate(
                habit.id,
                false,
                Number(e.target.value),
                customBonuses
              )
            }
            className="mt-1 w-full rounded-md border border-cyan-400/20 bg-slate-900/40 backdrop-blur px-3 py-2 text-sm"
          />
        </div>
        
        <div>
          <label className="text-sm font-bold uppercase tracking-wider text-slate-200\">STREAK BONUSES</label>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {[3, 7, 30].map((days) => (
              <div key={days}>
                <label className="text-xs text-slate-400\">{days}-day</label>
                <input
                  type="number"
                  min="0"
                  value={customBonuses?.[days] ?? 0}
                  onChange={(e) =>
                    onUpdate(
                      habit.id,
                      false,
                      customPoints,
                      { ...customBonuses, [days]: Number(e.target.value) }
                    )
                  }
                  className="mt-1 w-full rounded-md border border-cyan-400/20 bg-slate-900/40 backdrop-blur px-2 py-1 text-sm"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
