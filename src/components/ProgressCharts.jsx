import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Bar, BarChart } from 'recharts'
import { getMonthBuckets, getWeekBuckets } from '../utils/date'

const toChartArray = (buckets, limit = 8) =>
  Object.entries(buckets)
    .sort(([a], [b]) => (a > b ? 1 : -1))
    .slice(-limit)
    .map(([label, value]) => ({ label, value }))

export const ProgressCharts = ({ history }) => {
  const weekly = toChartArray(getWeekBuckets(history))
  const monthly = toChartArray(getMonthBuckets(history), 6)

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="glass rounded-xl p-4">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-100">Weekly completions</h4>
        <div className="mt-2 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weekly} margin={{ top: 8, bottom: 8, left: 0, right: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 245, 255, 0.08)" />
              <XAxis dataKey="label" tick={{ fill: '#7F8A9A', fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fill: '#7F8A9A', fontSize: 12 }} />
              <Tooltip contentStyle={{ background: 'rgba(10, 14, 20, 0.8)', border: '1px solid rgba(0, 245, 255, 0.2)', color: '#E6F1FF' }} />
              <Bar dataKey="value" fill="url(#weeklyGrad)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="weeklyGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#00F5FF" />
                  <stop offset="100%" stopColor="#B026FF" />
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
                  <stop offset="5%" stopColor="#00F5FF" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#B026FF" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 245, 255, 0.08)" />
              <XAxis dataKey="label" tick={{ fill: '#7F8A9A', fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fill: '#7F8A9A', fontSize: 12 }} />
              <Tooltip contentStyle={{ background: 'rgba(10, 14, 20, 0.8)', border: '1px solid rgba(0, 245, 255, 0.2)', color: '#E6F1FF' }} />
              <Area type="monotone" dataKey="value" stroke="#00F5FF" fillOpacity={1} fill="url(#monthlyGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
