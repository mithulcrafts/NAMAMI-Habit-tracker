import { Rewards } from '../components/Rewards'

export const RewardsPage = ({
  rewards,
  claimedRewards,
  points,
  onAddReward,
  onClaimReward,
  onUpdateReward,
  onDeleteReward,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">🎁 Rewards</h2>
        <p className="text-sm text-slate-300 mt-1">Redeem your MITHURA points for rewards</p>
      </div>

      <div className="glass rounded-xl p-6">
        <Rewards
          rewards={rewards}
          claimedRewards={claimedRewards}
          points={points}
          onAdd={onAddReward}
          onClaim={onClaimReward}
          onUpdate={onUpdateReward}
          onDelete={onDeleteReward}
        />
      </div>
    </div>
  )
}
