import { Rewards } from '../components/Rewards'
import { EarnedBadges } from '../components/EarnedBadges'

export const RewardsPage = ({
  rewards,
  claimedRewards,
  points,
  earnedBadges,
  badgeDefinitions,
  habits,
  streakFreezes,
  streakFreezeCost,
  onBuyStreakFreeze,
  onAddReward,
  onClaimReward,
  onUpdateReward,
  onDeleteReward,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold uppercase tracking-wider text-white">🎁 REWARDS</h2>
        <p className="text-sm text-slate-400 mt-1">Redeem your MITHURA points for rewards</p>
      </div>

      {/* Earned Badges Section */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-bold uppercase tracking-wider text-white mb-4">🏆 BADGES EARNED</h3>
        <EarnedBadges earnedBadges={earnedBadges} badgeDefinitions={badgeDefinitions} habits={habits} />
      </div>

      {/* Rewards Section */}
      <div className="glass rounded-xl p-6">
        <Rewards
          rewards={rewards}
          claimedRewards={claimedRewards}
          points={points}
          streakFreezes={streakFreezes}
          streakFreezeCost={streakFreezeCost}
          onBuyStreakFreeze={onBuyStreakFreeze}
          onAdd={onAddReward}
          onClaim={onClaimReward}
          onUpdate={onUpdateReward}
          onDelete={onDeleteReward}
        />
      </div>
    </div>
  )
}
