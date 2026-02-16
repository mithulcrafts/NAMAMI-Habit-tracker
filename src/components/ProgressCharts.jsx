import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Bar, BarChart } from 'recharts'
import { getMonthBuckets, getWeekBuckets } from '../utils/date'

const toChartArray = (buckets, limit = 8) =>
  Object.entries(buckets)
    .sort(([a], [b]) => (a > b ? 1 : -1))
    .slice(-limit)
    .map(([label, value]) => ({ label, value }))

const getChartColors = () => {
  const isDark = document.documentElement.classList.contains('dark')
  return {
    gridStroke: isDark ? 'rgba(0, 245, 255, 0.08)' : 'rgba(51, 65, 85, 0.1)',
    axisColor: isDark ? '#7F8A9A' : '#64748b',
    tooltipBg: isDark ? 'rgba(10, 14, 20, 0.8)' : 'rgba(255, 255, 255, 0.9)',
    tooltipBorder: isDark ? 'rgba(0, 245, 255, 0.2)' : 'rgba(51, 65, 85, 0.15)',
    tooltipColor: isDark ? '#E6F1FF' : '#1e293b',
    gradientStart: isDark ? '#00F5FF' : '#3b82f6',
    gradientEnd: isDark ? '#B026FF' : '#8b5cf6',
    areaStroke: isDark ? '#00F5FF' : '#3b82f6',
  }
}

export const ProgressCharts = ({ history }) => {
  const weekly = toChartArray(getWeekBuckets(history))
  const monthly = toChartArray(getMonthBuckets(history), 6)
  const colors = getChartColors()

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="glass rounded-xl p-4">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-100">Weekly completions</h4>
        <div className="mt-2 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weekly} margin={{ top: 8, bottom: 8, left: 0, right: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.gridStroke} />
              <XAxis dataKey="label" tick={{ fill: colors.axisColor, fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fill: colors.axisColor, fontSize: 12 }} />
              <Tooltip contentStyle={{ background: colors.tooltipBg, border: `1px solid ${colors.tooltipBorder}`, color: colors.tooltipColor }} />
              <Bar dataKey="value" fill="url(#weeklyGrad)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="weeklyGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor={colors.gradientStart} />
                  <stop offset="100%" stopColor={colors.gradientEnd} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass rounded-xl p-4">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-100">Monthly completions</h4>
        <div className="mt-2 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthly} margin={{ top: 8, bottom: 8, left: 0, right: 0 }}>
              <defs>
                <linearGradient id="monthlyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.gradientStart} stopOpacity={0.6} />
                  <stop offset="95%" stopColor={colors.gradientEnd} stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.gridStroke} />
              <XAxis dataKey="label" tick={{ fill: colors.axisColor, fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fill: colors.axisColor, fontSize: 12 }} />
              <Tooltip contentStyle={{ background: colors.tooltipBg, border: `1px solid ${colors.tooltipBorder}`, color: colors.tooltipColor }} />
              <Area type="monotone" dataKey="value" stroke={colors.areaStroke} fillOpacity={1} fill="url(#monthlyGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
