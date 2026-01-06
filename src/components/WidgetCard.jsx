import { useState, useEffect } from 'react'

export const WidgetCard = ({ quote, streak, points }) => {
  const [canInstall, setCanInstall] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [isWidgetMode, setIsWidgetMode] = useState(false)

  useEffect(() => {
    // Check if already installed
    const standalone = window.matchMedia('(display-mode: standalone)').matches
    setIsStandalone(standalone)

    // Check if opened in widget mode
    const params = new URLSearchParams(window.location.search)
    if (params.get('widget') === 'true') {
      setIsWidgetMode(true)
    }

    if (!standalone) {
      const handleInstallReady = () => {
        setCanInstall(true)
      }

      window.addEventListener('installPromptReady', handleInstallReady)
      return () => window.removeEventListener('installPromptReady', handleInstallReady)
    }
  }, [])

  const handleInstallClick = async () => {
    if (window.triggerInstall) {
      await window.triggerInstall()
      setCanInstall(false)
    }
  }

  // Widget-only mode (minimal display for home screen)
  if (isWidgetMode) {
    return (
      <div className="min-h-screen bg-slate-950 p-4 flex items-center justify-center">
        <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-soft w-full max-w-sm">
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-100">NAMAMI</p>
              <p className="mt-1 text-xs text-slate-400">Habit Tracker Widget</p>
            </div>
            <div className="rounded-xl bg-gradient-to-r from-brand-500/40 to-accent/40 p-4">
              <p className="text-xs text-slate-100 mb-2">Daily Quote</p>
              <p className="text-sm font-semibold text-white leading-relaxed">"{quote}"</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-slate-800/50 p-3 text-center">
                <p className="text-xs text-slate-400">Current Streak</p>
                <p className="mt-1 text-xl font-bold text-brand-300">{streak}</p>
                <p className="text-[10px] text-slate-500">days</p>
              </div>
              <div className="rounded-lg bg-slate-800/50 p-3 text-center">
                <p className="text-xs text-slate-400">MITHURA</p>
                <p className="mt-1 text-xl font-bold text-accent-300">{points}</p>
                <p className="text-[10px] text-slate-500">points</p>
              </div>
            </div>
            <button
              onClick={() => window.open('/?mode=widget', '_self')}
              className="w-full rounded-lg bg-brand-500/20 border border-brand-500/50 px-4 py-2 text-xs font-semibold text-brand-200 hover:bg-brand-500/30 transition-colors"
            >
              Open App
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div id="widget" className="rounded-2xl border border-white/5 bg-slate-900/80 p-4 shadow-soft">
      <p className="text-xs font-semibold uppercase tracking-widest text-brand-100">Home widget preview</p>
      <p className="mt-2 text-sm text-slate-300">
        {isStandalone
          ? 'Widget is available on your home screen! Long-press your home screen and select "Widgets" to add NAMAMI.'
          : 'Add NAMAMI to your home screen to access this widget.'}
      </p>
      <div className="mt-3 rounded-xl bg-gradient-to-r from-brand-500/40 to-accent/40 p-3">
        <p className="text-xs text-slate-100">Quote</p>
        <p className="text-base font-semibold text-white">"{quote}"</p>
        <div className="mt-3 flex items-center justify-between text-sm text-white">
          <span>Streak: {streak} days</span>
          <span>MITHURA: {points}</span>
        </div>
      </div>
      {canInstall && (
        <button
          onClick={handleInstallClick}
          className="mt-4 w-full rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600 active:bg-brand-700 transition-colors"
        >
          Add to Home Screen
        </button>
      )}
      {isStandalone && (
        <div className="mt-4 rounded-lg bg-slate-800/50 p-3 text-xs text-slate-300">
          <p className="font-semibold text-slate-100 mb-2">📱 How to add widget:</p>
          <ol className="space-y-1 text-slate-400">
            <li>• Long-press your home screen</li>
            <li>• Tap "Widgets"</li>
            <li>• Find and select "NAMAMI Widget"</li>
            <li>• Drag to your home screen</li>
          </ol>
        </div>
      )}
    </div>
  )
}
