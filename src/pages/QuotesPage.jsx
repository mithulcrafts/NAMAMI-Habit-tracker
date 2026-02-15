import { QuoteCard } from '../components/QuoteCard'

export const QuotesPage = ({
  quoteOfDay,
  category,
  onCategoryChange,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold uppercase tracking-wider text-white">💭 DAILY QUOTES</h2>
        <p className="text-sm text-slate-400 mt-1">Get inspired with daily wisdom</p>
      </div>

      <QuoteCard
        quote={quoteOfDay}
        category={category}
        onCategoryChange={onCategoryChange}
      />
    </div>
  )
}
