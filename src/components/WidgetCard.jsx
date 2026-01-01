export const WidgetCard = ({ quote, streak, points }) => {
  return (
    <div id="widget" className="rounded-2xl border border-white/5 bg-slate-900/80 p-4 shadow-soft">
      <p className="text-xs font-semibold uppercase tracking-widest text-brand-100">Home widget preview</p>
      <p className="mt-2 text-sm text-slate-300">Add NAMAMI to your home screen to access this widget.</p>
      <div className="mt-3 rounded-xl bg-gradient-to-r from-brand-500/40 to-accent/40 p-3">
        <p className="text-xs text-slate-100">Quote</p>
        <p className="text-base font-semibold text-white">“{quote}”</p>
        <div className="mt-3 flex items-center justify-between text-sm text-white">
          <span>Streak: {streak} days</span>
          <span>MITHURA: {points}</span>
        </div>
      </div>
    </div>
  )
}
