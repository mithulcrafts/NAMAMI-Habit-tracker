import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import { getPastDate } from '../utils/date'

export const Heatmap = ({ history, habitColor, habitName, goalType, goalTarget, dailyValueHistory }) => {
  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - 120)

  const values = Object.entries(history || {}).map(([date, done]) => {
    if (goalType === 'binary') {
      return { date, count: done ? 1 : 0 }
    } else {
      const value = dailyValueHistory?.[date] ?? 0
      const isMet = value >= (goalTarget || 1)
      return { date, count: isMet ? 1 : 0 }
    }
  })

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
          .heatmap-${habitColor?.slice(1)} .color-github-4 { fill: ${habitColor} !important; }
        `}</style>
        <div className={`heatmap-${habitColor?.slice(1)}`}>
          <CalendarHeatmap
            startDate={startDate}
            endDate={endDate}
            values={values}
            classForValue={(val) => {
              if (!val || !val.count) return 'color-empty'
              return 'color-github-4'
            }}
            gutterSize={2}
            showWeekdayLabels
          />
        </div>
      </div>
    </div>
  )
}
