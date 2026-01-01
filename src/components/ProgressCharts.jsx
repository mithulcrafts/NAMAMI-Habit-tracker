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
      <div className="rounded-xl border border-white/5 bg-slate-900/70 p-4">
        <h4 className="text-sm font-semibold text-white">Weekly completions</h4>
        <div className="mt-2 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weekly} margin={{ top: 8, bottom: 8, left: 0, right: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="label" tick={{ fill: '#cbd5e1', fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fill: '#cbd5e1', fontSize: 12 }} />
              <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', color: '#e2e8f0' }} />
              <Bar dataKey="value" fill="url(#weeklyGrad)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="weeklyGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-white/5 bg-slate-900/70 p-4">
        <h4 className="text-sm font-semibold text-white">Monthly completions</h4>
        <div className="mt-2 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthly} margin={{ top: 8, bottom: 8, left: 0, right: 0 }}>
              <defs>
                <linearGradient id="monthlyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#c084fc" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="label" tick={{ fill: '#cbd5e1', fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fill: '#cbd5e1', fontSize: 12 }} />
              <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', color: '#e2e8f0' }} />
              <Area type="monotone" dataKey="value" stroke="#38bdf8" fillOpacity={1} fill="url(#monthlyGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
