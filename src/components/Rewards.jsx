import { useState } from 'react'

export const Rewards = ({ rewards, points, onAdd, onClaim, onUpdate, onDelete }) => {
  const [form, setForm] = useState({ name: '', requiredPoints: 50 })
  const [editing, setEditing] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return
    onAdd({ ...form, requiredPoints: Number(form.requiredPoints) })
    setForm({ name: '', requiredPoints: 50 })
  }

  const handleEdit = (reward) => {
    setEditing(reward)
    setForm({ name: reward.name, requiredPoints: reward.requiredPoints })
  }

  const handleSaveEdit = () => {
    if (!form.name.trim()) return
    onUpdate(editing.id, { name: form.name, requiredPoints: Number(form.requiredPoints) })
    setEditing(null)
    setForm({ name: '', requiredPoints: 50 })
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-white">Rewards</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {rewards.map((reward) => {
          const available = points >= reward.requiredPoints && !reward.claimed
          return (
            <div key={reward.id} className="rounded-lg border border-white/5 bg-slate-900/70 p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-base font-semibold text-white">{reward.name}</p>
                  <p className="text-sm text-slate-300">{reward.requiredPoints} MITHURA</p>
                </div>
                <div className="flex gap-1">
                  {!reward.claimed && (
                    <>
                      <button
                        onClick={() => handleEdit(reward)}
                        className="rounded-md border border-white/10 px-2 py-1 text-xs text-slate-300 hover:border-white/30"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(reward.id)}
                        className="rounded-md border border-white/10 px-2 py-1 text-xs text-red-400 hover:border-red-500/30"
                      >
                        Remove
                      </button>
                    </>
                  )}
                </div>
              </div>
              <button
                disabled={!available}
                onClick={() => onClaim(reward.id)}
                className={`mt-2 w-full rounded-md px-3 py-1 text-xs font-semibold text-white ${
                  available
                    ? 'bg-emerald-500 hover:bg-emerald-400'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {reward.claimed ? 'Claimed' : available ? 'Claim now' : `${reward.requiredPoints - points} left`}
              </button>
            </div>
          )
        })}
      </div>

      {editing ? (
        <div className="rounded-lg border border-white/5 bg-slate-900/70 p-3">
          <p className="text-sm font-semibold text-white">Edit reward</p>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            <input
              className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm"
              placeholder="Reward name"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            />
            <input
              type="number"
              min="1"
              className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm"
              value={form.requiredPoints}
              onChange={(e) => setForm((p) => ({ ...p, requiredPoints: e.target.value }))}
            />
          </div>
          <div className="mt-2 flex gap-2">
            <button
              onClick={handleSaveEdit}
              className="rounded-md bg-brand-500 px-4 py-2 text-sm font-semibold text-white"
            >
              Save edit
            </button>
            <button
              onClick={() => setEditing(null)}
              className="rounded-md border border-white/10 px-4 py-2 text-sm text-slate-200"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="rounded-lg border border-white/5 bg-slate-900/70 p-3">
          <p className="text-sm font-semibold text-white">Add new reward</p>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            <input
              className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm"
              placeholder="Reward name"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              required
            />
            <input
              type="number"
              min="1"
              className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm"
              value={form.requiredPoints}
              onChange={(e) => setForm((p) => ({ ...p, requiredPoints: e.target.value }))}
            />
          </div>
          <button
            type="submit"
            className="mt-2 rounded-md bg-brand-500 px-4 py-2 text-sm font-semibold text-white"
          >
            Add reward
          </button>
        </form>
      )}
    </div>
  )
}
