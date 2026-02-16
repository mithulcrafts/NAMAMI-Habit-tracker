import { useMemo } from 'react'

const getThemeClasses = () => {
  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  return {
    selectBorder: isDark ? 'border-cyan-400/20' : 'border-blue-400/20',
    selectBg: isDark ? 'bg-slate-800/40' : 'bg-white/50',
  }
}

export const QuoteCard = ({ quote, category, onCategoryChange }) => {
  const theme = useMemo(() => getThemeClasses(), [])

  return (
    <div className="glass rounded-xl p-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-100">QUOTE OF THE DAY</p>
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className={`w-full sm:w-auto rounded-lg border ${theme.selectBorder} ${theme.selectBg} backdrop-blur pl-4 pr-10 py-2.5 text-sm font-medium text-white shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/50`}
        >
          <option value="general">General</option>
          <option value="gita">Bhagavad Gita</option>
        </select>
      </div>
      <p className="mt-3 text-lg font-semibold text-white italic">"{quote}"</p>
    </div>
  )
}
