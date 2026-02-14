import { sendNotification } from '../utils/notifications'

export const QuoteCard = ({ quote, category, onCategoryChange }) => {
  const pushNotification = async () => {
    await sendNotification('NAMAMI – Quote', quote)
  }

  return (
    <div className="rounded-xl border border-white/5 bg-gradient-to-br from-slate-900/80 to-slate-900 p-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-100">Quote of the day</p>
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full sm:w-auto rounded-lg border border-white/20 bg-slate-800/80 pl-4 pr-10 py-2.5 text-sm font-medium text-white shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/50"
        >
          <option value="general">General</option>
          <option value="gita">Bhagavad Gita</option>
        </select>
      </div>
      <p className="mt-3 text-lg font-semibold text-white">"{quote}"</p>
      <div className="mt-4 flex justify-end">
        <button
          onClick={pushNotification}
          className="rounded-md border border-white/10 px-4 py-2 text-sm text-slate-200 hover:border-white/30"
        >
          Notify
        </button>
      </div>
    </div>
  )
}
