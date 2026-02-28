import { memo, useRef } from 'react'

export const DateNavigator = memo(function DateNavigator({
  selectedDateDisplay,
  selectedDateKey,
  today,
  isToday,
  onPreviousDay,
  onNextDay,
  onDateChange,
}) {
  const dateInputRef = useRef(null)

  const openDatePicker = () => {
    const input = dateInputRef.current
    if (!input) return
    if (typeof input.showPicker === 'function') {
      input.showPicker()
      return
    }
    input.click()
  }

  return (
    <div
      className="date-nav-shell rounded-xl p-4"
      style={{ transform: 'translateZ(0)', WebkitTransform: 'translateZ(0)' }}
    >
      <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-2 sm:gap-3">
        <button
          onClick={onPreviousDay}
          aria-label="Previous day"
          className="date-nav-btn flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-semibold"
        >
          <span className="date-nav-arrow" aria-hidden="true">‹</span>
        </button>

        <div className="flex min-w-0 items-center justify-center gap-2 text-center sm:gap-3" style={{ transform: 'translateZ(0)' }}>
          <div className="flex min-w-0 flex-col">
            <span className="text-[11px] uppercase tracking-[0.18em] text-brand-100">Date</span>
            <span
              className="date-display-safe truncate text-sm font-semibold leading-tight text-white sm:text-base"
              style={{
                color: 'var(--text-primary)',
                WebkitTextFillColor: 'var(--text-primary)',
                forcedColorAdjust: 'none',
              }}
            >
              {selectedDateDisplay}
            </span>
          </div>
          <button
            type="button"
            onClick={openDatePicker}
            className="date-nav-btn relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg cursor-pointer"
            aria-label="Select date"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4 pointer-events-none">
              <rect x="3" y="5" width="18" height="16" rx="2" ry="2" />
              <line x1="16" y1="3" x2="16" y2="7" />
              <line x1="8" y1="3" x2="8" y2="7" />
              <line x1="3" y1="11" x2="21" y2="11" />
            </svg>
          </button>
          <input
            ref={dateInputRef}
            aria-label="Select date"
            type="date"
            max={today}
            value={selectedDateKey}
            onChange={(e) => onDateChange(e.target.value)}
            className="pointer-events-none absolute h-px w-px opacity-0"
            tabIndex={-1}
          />
        </div>

        <button
          onClick={onNextDay}
          disabled={isToday}
          aria-label="Next day"
          className="date-nav-btn flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="date-nav-arrow" aria-hidden="true">›</span>
        </button>
      </div>
    </div>
  )
})
