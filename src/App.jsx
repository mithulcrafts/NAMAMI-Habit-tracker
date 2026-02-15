import './App.css'
import { useState, useEffect } from 'react'
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
    streakFreezes,
    streakFreezeCost,
    addHabit,
    toggleCompletion,
    updateHabit,
    deleteHabit,
    addReward,
    claimReward,
    updateReward,
    deleteReward,
    buyStreakFreeze,
    useStreakFreeze,
    removeStreakFreeze,
    updateSettings,
    addCustomQuote,
    updateHabitGamification,
    adjustMithura,
  } = useApp()

  const [openHabitId, setOpenHabitId] = useState(null)
  const [currentPage, setCurrentPage] = useState('home')
  const [hydrated, setHydrated] = useState(false)
  const [installAvailable, setInstallAvailable] = useState(false)
  const [installing, setInstalling] = useState(false)

  // Remove splash screen when data is loaded
  useEffect(() => {
    if (!loading && !hydrated) {
      setHydrated(true)
      window._NAMAMI_HYDRATED?.()
    }
  }, [loading, hydrated])

  useEffect(() => {
    const onReady = () => setInstallAvailable(true)
    const onInstalled = () => setInstallAvailable(false)

    window.addEventListener('installPromptReady', onReady)
    window.addEventListener('appinstalled', onInstalled)

    if (window.__NAMAMI_INSTALL_READY) {
      setInstallAvailable(true)
    }

    return () => {
      window.removeEventListener('installPromptReady', onReady)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  const handleInstall = async () => {
    if (!installAvailable || typeof window.triggerInstall !== 'function') return
    setInstalling(true)
    try {
      await window.triggerInstall()
    } finally {
      setInstalling(false)
    }
  }

  if (!hydrated) {
    return null
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
            streakFreezes={streakFreezes}
            onUseStreakFreeze={useStreakFreeze}
            onRemoveStreakFreeze={removeStreakFreeze}
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
            streakFreezes={streakFreezes}
            streakFreezeCost={streakFreezeCost}
            onBuyStreakFreeze={buyStreakFreeze}
            onAddReward={addReward}
            onClaimReward={claimReward}
            onUpdateReward={updateReward}
            onDeleteReward={deleteReward}
          />
        )
      case 'settings':
        return <Settings settings={settings} onUpdate={updateSettings} onAdjustMithura={adjustMithura} />
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
          <div className="flex items-center gap-2">
            {installAvailable && (
              <button
                onClick={handleInstall}
                disabled={installing}
                className="px-3 py-2 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors"
                style={{
                  backgroundColor: 'var(--active-bg)',
                  color: 'var(--text-primary)',
                  opacity: installing ? 0.6 : 1,
                }}
              >
                {installing ? 'Installing...' : 'Install'}
              </button>
            )}
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
