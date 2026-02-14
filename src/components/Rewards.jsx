import { useState } from 'react'

export const Rewards = ({
  rewards,
  claimedRewards,
  points,
  onAdd,
  onClaim,
  onUpdate,
  onDelete,
  streakFreezes = 0,
  streakFreezeCost = 60,
  onBuyStreakFreeze,
}) => {
  const [form, setForm] = useState({ name: '', requiredPoints: 50 })
  const [editing, setEditing] = useState(null)
  const [confirmingId, setConfirmingId] = useState(null)

  const claimCounts = {}
  ;(claimedRewards || []).forEach((entry) => {
    claimCounts[entry.rewardId] = (claimCounts[entry.rewardId] || 0) + 1
  })

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
      <h3 className="text-sm font-bold uppercase tracking-wider text-white\">REWARDS</h3>
      <div className="glass rounded-lg p-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-base font-bold uppercase tracking-wide text-white\">STREAK FREEZE</p>
            <p className="text-sm text-slate-400\">Spend {streakFreezeCost} MITHURA to protect a missed day</p>
          </div>
          <div className="text-xs text-slate-400\ font-medium\">OWNED: {streakFreezes}</div>
        </div>
        <div className="mt-3">
          <button
            disabled={!onBuyStreakFreeze || points < streakFreezeCost}
            onClick={() => onBuyStreakFreeze?.()}
            className={`w-full rounded-md px-3 py-1 text-xs font-bold uppercase tracking-wide text-white ${
              points >= streakFreezeCost && onBuyStreakFreeze
                ? 'bg-sky-500 hover:bg-sky-400'
                : 'bg-slate-800/50 text-slate-500'
            }`}
          >
            {points >= streakFreezeCost ? 'Buy streak freeze' : `Need ${Math.max(streakFreezeCost - points, 0)} more`}
          </button>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {rewards.map((reward) => {
          const available = points >= reward.requiredPoints
          const claimCount = claimCounts[reward.id] || 0
          return (
            <div key={reward.id} className="glass rounded-lg p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-base font-bold uppercase tracking-wide text-white">{reward.name}</p>
                  <p className="text-sm text-slate-400">{reward.requiredPoints} MITHURA</p>
                  {claimCount > 0 && (
                    <p className="text-xs text-emerald-300 font-medium">CLAIMED {claimCount}X</p>
                  )}
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(reward)}
                    className="rounded-md border border-cyan-400/20 px-2 py-1 text-xs font-medium uppercase text-slate-300 hover:border-cyan-400/40"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(reward.id)}
                    className="rounded-md border border-red-500/30 px-2 py-1 text-xs font-medium uppercase text-red-400 hover:border-red-500/50"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="mt-2">
                {confirmingId === reward.id ? (
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between rounded-md bg-emerald-500/10 border border-emerald-500/30 p-2">
                    <p className="text-xs text-emerald-300 font-semibold">
                      CONFIRM SPEND {reward.requiredPoints} MITHURA FOR "{reward.name}"?
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          onClaim(reward.id)
                          setConfirmingId(null)
                        }}
                        className="rounded-md bg-emerald-500 px-3 py-1 text-xs font-bold uppercase text-white hover:bg-emerald-400"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setConfirmingId(null)}
                        className="rounded-md border border-cyan-400/20 px-3 py-1 text-xs font-medium uppercase text-slate-200 hover:border-cyan-400/40"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    disabled={!available}
                    onClick={() => setConfirmingId(reward.id)}
                    className={`w-full rounded-md px-3 py-1 text-xs font-bold uppercase tracking-wide text-white ${
                      available
                        ? 'bg-emerald-500 hover:bg-emerald-400'
                        : 'bg-slate-800/50 text-slate-500'
                    }`}
                  >
                    {available ? 'Claim now' : `Need ${Math.max(reward.requiredPoints - points, 0)} more`}
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {editing ? (
        <div className="glass rounded-lg p-3">
          <p className="text-sm font-bold uppercase tracking-wider text-white\">EDIT REWARD</p>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            <input
              className="rounded-md border border-cyan-400/20 bg-slate-900/40 backdrop-blur px-3 py-2 text-sm"
              placeholder="Reward name"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            />
            <input
              type="number"
              min="1"
              className="rounded-md border border-cyan-400/20 bg-slate-900/40 backdrop-blur px-3 py-2 text-sm"
              value={form.requiredPoints}
              onChange={(e) => setForm((p) => ({ ...p, requiredPoints: e.target.value }))}
            />
          </div>
          <div className="mt-2 flex flex-col-reverse gap-2 sm:flex-row">
            <button
              onClick={() => setEditing(null)}
              className="rounded-md border border-cyan-400/20 px-4 py-2 text-sm font-medium uppercase text-slate-200 hover:border-cyan-400/40"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEdit}
              className="rounded-md bg-brand-500 px-4 py-2 text-sm font-bold uppercase tracking-wide text-white hover:bg-brand-400"
            >
              Save edit
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="glass rounded-lg p-3">
          <p className="text-sm font-bold uppercase tracking-wider text-white\">ADD NEW REWARD</p>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            <input
              className="rounded-md border border-cyan-400/20 bg-slate-900/40 backdrop-blur px-3 py-2 text-sm"
              placeholder="Reward name"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              required
            />
            <input
              type="number"
              min="1"
              className="rounded-md border border-cyan-400/20 bg-slate-900/40 backdrop-blur px-3 py-2 text-sm"
              value={form.requiredPoints}
              onChange={(e) => setForm((p) => ({ ...p, requiredPoints: e.target.value }))}
            />
          </div>
          <button
            type="submit"
            className="mt-2 rounded-md bg-brand-500 px-4 py-2 text-sm font-bold uppercase tracking-wide text-white hover:bg-brand-400"
          >
            Add reward
          </button>
        </form>
      )}
    </div>
  )
}
