import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'

export const Heatmap = ({ history, habitColor, habitName, goalType, goalTarget, dailyValueHistory }) => {
  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - 120)

  const formatDateString = (d) => {
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const endDateStr = formatDateString(endDate)
  const startDateStr = formatDateString(startDate)

  // Build values for the entire date range to reflect partial progress
  const values = (() => {
    const vals = []
    const cursor = new Date(startDate)
    const end = new Date(endDate)
    while (cursor <= end) {
      const key = formatDateString(cursor)
      if (goalType === 'binary') {
        const done = (history || {})[key] === true
        vals.push({ date: key, count: done ? 1 : 0 })
      } else {
        const value = (dailyValueHistory || {})[key] ?? 0
        vals.push({ date: key, count: value })
      }
      cursor.setDate(cursor.getDate() - -1) // increment by 1 day
    }
    return vals
  })()

  return (
    <div className="rounded-xl border border-white/5 bg-slate-900/70 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-white">Completion heatmap</h4>
          {habitName && <p className="text-xs text-slate-400">{habitName}</p>}
          {goalType !== 'binary' && (
            <p className="text-xs text-slate-500">Target: {goalTarget} {goalType === 'count' ? 'items' : 'min'}</p>
          )}
        </div>
        <span className="text-xs text-slate-400">Last 4 months</span>
      </div>
      <div className="mt-2 overflow-x-auto">
        <style>{`
          .heatmap-${habitColor?.slice(1)} .color-github-1 { fill: ${habitColor}; opacity: 0.25; }
          .heatmap-${habitColor?.slice(1)} .color-github-2 { fill: ${habitColor}; opacity: 0.5; }
          .heatmap-${habitColor?.slice(1)} .color-github-3 { fill: ${habitColor}; opacity: 0.75; }
          .heatmap-${habitColor?.slice(1)} .color-github-4 { fill: ${habitColor}; opacity: 1; }
        `}</style>
        <div className={`heatmap-${habitColor?.slice(1)}`}>
          <CalendarHeatmap
            startDate={startDateStr}
            endDate={endDateStr}
            values={values}
            classForValue={(val) => {
              if (!val || !val.count) return 'color-empty'
              
              // For binary habits, just show full intensity
              if (goalType === 'binary') return 'color-github-4'
              
              // For numeric goals, scale intensity based on count
              const target = goalTarget || 1
              const ratio = val.count / target
              
              if (ratio >= 1) return 'color-github-4' // Met or exceeded goal
              if (ratio >= 0.75) return 'color-github-3' // 75% of goal
              if (ratio >= 0.5) return 'color-github-2' // 50% of goal
              if (ratio > 0) return 'color-github-1' // Some activity
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
