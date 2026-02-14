import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'

export const GlobalHeatmap = ({ habits }) => {
  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - 120)

  // Convert dates to YYYY-MM-DD string format
  const formatDateString = (d) => {
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const endDateStr = formatDateString(endDate)
  const startDateStr = formatDateString(startDate)

  // Aggregate all habits per date
  const aggregated = {}
  habits.forEach((habit) => {
    Object.entries(habit.history || {}).forEach(([date, done]) => {
      let isMet = false
      if (habit.goalType === 'binary') {
        isMet = done === true
      } else {
        const value = habit.dailyValueHistory?.[date] ?? 0
        isMet = value >= (habit.goalTarget || 1)
      }
      if (isMet) aggregated[date] = (aggregated[date] || 0) + 1
    })
  })

  const values = Object.entries(aggregated).map(([date, count]) => ({
    date,
    count: Math.min(count, habits.length),
  }))

  return (
    <div className="glass rounded-xl p-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold uppercase tracking-wider text-white">OVERALL COMPLETION HEATMAP</h4>
        <span className="text-xs text-slate-400 font-medium">ALL HABITS AGGREGATED</span>
      </div>
      <div className="mt-2 overflow-x-auto">
        <style>{`
          #global-heatmap .color-github-1 { fill: #00F5FF !important; opacity: 0.35 !important; filter: drop-shadow(0 0 4px #00F5FF) !important; }
          #global-heatmap .color-github-2 { fill: #00F5FF !important; opacity: 0.55 !important; filter: drop-shadow(0 0 6px #00F5FF) !important; }
          #global-heatmap .color-github-3 { fill: #00F5FF !important; opacity: 0.8 !important; filter: drop-shadow(0 0 8px #00F5FF) !important; }
          #global-heatmap .color-github-4 { fill: #00F5FF !important; opacity: 1 !important; filter: drop-shadow(0 0 10px #00F5FF) !important; }
        `}</style>
        <div id="global-heatmap">
          <CalendarHeatmap
            startDate={startDateStr}
            endDate={endDateStr}
            values={values}
            classForValue={(val) => {
              if (!val || !val.count) return 'color-empty'
              
              // Scale intensity based on percentage of total habits completed
              const totalHabits = habits.length || 1
              const ratio = val.count / totalHabits
              
              if (ratio >= 0.75) return 'color-github-4' // 75%+ of habits
              if (ratio >= 0.5) return 'color-github-3' // 50-74% of habits
              if (ratio >= 0.25) return 'color-github-2' // 25-49% of habits
              if (ratio > 0) return 'color-github-1' // Some habits completed
              return 'color-empty'
            }}
            gutterSize={2}
            showWeekdayLabels
          />
        </div>
      </div>
    </div>
  )
}
