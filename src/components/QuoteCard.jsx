import { useState } from 'react'
import { sendNotification } from '../utils/notifications'

export const QuoteCard = ({ quote, category, onCategoryChange, onAddCustom }) => {
  const [custom, setCustom] = useState('')

  const pushNotification = async () => {
    await sendNotification('NAMAMI – Quote', quote)
  }

  return (
    <div className="rounded-xl border border-white/5 bg-gradient-to-br from-slate-900/80 to-slate-900 p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-100">Quote of the day</p>
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="rounded-md border border-white/10 bg-slate-900 px-2 py-1 text-xs"
        >
          <option value="general">General</option>
          <option value="gita">Bhagavad Gita</option>
        </select>
      </div>
      <p className="mt-3 text-lg font-semibold text-white">“{quote}”</p>
      <div className="mt-3 flex gap-2">
        <input
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          placeholder="Add your own quote"
          className="flex-1 rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm"
        />
        <button
          onClick={() => {
            onAddCustom(custom)
            setCustom('')
          }}
          className="rounded-md bg-brand-500 px-3 py-2 text-sm font-semibold text-white"
        >
          Save
        </button>
        <button
          onClick={pushNotification}
          className="rounded-md border border-white/10 px-3 py-2 text-sm text-slate-200 hover:border-white/30"
        >
          Notify
        </button>
      </div>
    </div>
  )
}
