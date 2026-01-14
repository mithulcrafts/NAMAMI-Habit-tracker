import './App.css'
import { useState } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import { Home } from './pages/Home'
import { RewardsPage } from './pages/RewardsPage'
import { HabitDetail } from './pages/HabitDetail'
import { Settings } from './pages/Settings'

const Shell = () => {
  const {
    loading,
    habits,
    points,
    lifetimePoints,
    pointsSpent,
    bonusDays,
    globalStreak,
    rewards,
    claimedRewards,
    earnedBadges,
    badgeDefinitions,
    quoteOfDay,
    settings,
    addHabit,
    toggleCompletion,
    updateHabit,
    deleteHabit,
    addReward,
    claimReward,
    updateReward,
    deleteReward,
    updateSettings,
    addCustomQuote,
    updateHabitGamification,
  } = useApp()

  const [openHabitId, setOpenHabitId] = useState(null)
  const [currentPage, setCurrentPage] = useState('home')

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        Loading NAMAMI…
      </div>
    )
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home
            habits={habits}
            points={points}
            lifetimePoints={lifetimePoints}
            pointsSpent={pointsSpent}
            bonusDays={bonusDays}
            globalStreak={globalStreak}
            quoteOfDay={quoteOfDay}
            category={settings.quoteCategory}
            onCategoryChange={(category) => updateSettings({ quoteCategory: category })}
            onAddCustomQuote={addCustomQuote}
            onAddHabit={addHabit}
            onToggle={toggleCompletion}
            onOpenHabit={setOpenHabitId}
            onEditHabit={updateHabit}
            onDeleteHabit={deleteHabit}
            globalSettings={settings}
            onUpdateHabitGamification={updateHabitGamification}
          />
        )
      case 'rewards':
        return (
          <RewardsPage
            rewards={rewards}
            claimedRewards={claimedRewards}
            points={points}
            earnedBadges={earnedBadges}
            badgeDefinitions={badgeDefinitions}
            habits={habits}
            onAddReward={addReward}
            onClaimReward={claimReward}
            onUpdateReward={updateReward}
            onDeleteReward={deleteReward}
          />
        )
      case 'settings':
        return <Settings settings={settings} onUpdate={updateSettings} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 pb-10 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>NAMAMI</h1>
            <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>Your habit journey</p>
          </div>
          
          {/* Simple Tab Navigation */}
          <div className="flex gap-1 rounded-lg p-1" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <button
              onClick={() => setCurrentPage('home')}
              className="px-4 py-2 rounded-md text-sm font-medium transition-colors"
              style={{
                backgroundColor: currentPage === 'home' ? 'var(--active-bg)' : 'transparent',
                color: currentPage === 'home' ? 'var(--text-primary)' : 'var(--text-secondary)',
              }}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('rewards')}
              className="px-4 py-2 rounded-md text-sm font-medium transition-colors"
              style={{
                backgroundColor: currentPage === 'rewards' ? 'var(--active-bg)' : 'transparent',
                color: currentPage === 'rewards' ? 'var(--text-primary)' : 'var(--text-secondary)',
              }}
            >
              Rewards
            </button>
            <button
              onClick={() => setCurrentPage('settings')}
              className="px-4 py-2 rounded-md text-sm font-medium transition-colors"
              style={{
                backgroundColor: currentPage === 'settings' ? 'var(--active-bg)' : 'transparent',
                color: currentPage === 'settings' ? 'var(--text-primary)' : 'var(--text-secondary)',
              }}
            >
              Settings
            </button>
          </div>
        </div>

        {/* Page Content */}
        {renderPage()}
      </div>
    </div>
  )
}

const App = () => (
  <AppProvider>
    <Shell />
  </AppProvider>
)

export default App
