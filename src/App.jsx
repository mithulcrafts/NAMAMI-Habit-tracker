import './App.css'
import { useState } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import { Dashboard } from './pages/Dashboard'
import { HabitDetail } from './pages/HabitDetail'
import { Settings } from './pages/Settings'

const Shell = () => {
  const {
    loading,
    habits,
    points,
    bonusDays,
    rewards,
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
  const selectedHabit = openHabitId ? habits.find((h) => h.id === openHabitId) : null

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
        Loading NAMAMI…
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-10 pt-6">
        <Dashboard
          habits={habits}
          points={points}
          bonusDays={bonusDays}
          quoteOfDay={quoteOfDay}
          settings={settings}
          onCategoryChange={(category) => updateSettings({ quoteCategory: category })}
          onAddCustomQuote={addCustomQuote}
          onAddHabit={addHabit}
          onToggle={toggleCompletion}
          onOpenHabit={setOpenHabitId}
          onEditHabit={updateHabit}
          onDeleteHabit={deleteHabit}
        />

        {selectedHabit && (
          <HabitDetail
            habit={selectedHabit}
            points={points}
            rewards={rewards}
            onAddReward={addReward}
            onClaimReward={claimReward}
            onUpdateReward={updateReward}
            onDeleteReward={deleteReward}
            globalSettings={settings}
            onUpdateHabitGamification={updateHabitGamification}
            onClose={() => setOpenHabitId(null)}
          />
        )}

        <Settings settings={settings} onUpdate={updateSettings} />
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
