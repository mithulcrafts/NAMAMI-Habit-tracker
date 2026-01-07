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
  const selectedHabit = openHabitId ? habits.find((h) => h.id === openHabitId) : null

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
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
          />
        )
      case 'rewards':
        return (
          <RewardsPage
            rewards={rewards}
            claimedRewards={claimedRewards}
            points={points}
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
    <div className="min-h-screen bg-slate-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 pb-10 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">NAMAMI</h1>
            <p className="text-sm text-slate-400 mt-0.5">Your habit journey</p>
          </div>
          
          {/* Simple Tab Navigation */}
          <div className="flex gap-1 rounded-lg bg-slate-900/50 p-1">
            <button
              onClick={() => setCurrentPage('home')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'home'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('rewards')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'rewards'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Rewards
            </button>
            <button
              onClick={() => setCurrentPage('settings')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'settings'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Settings
            </button>
          </div>
        </div>

        {/* Page Content */}
        {renderPage()}

        {/* Habit Detail Modal */}
        {selectedHabit && (
          <HabitDetail
            habit={selectedHabit}
            points={lifetimePoints}
            globalSettings={settings}
            onUpdateHabitGamification={updateHabitGamification}
            onClose={() => setOpenHabitId(null)}
          />
        )}
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
