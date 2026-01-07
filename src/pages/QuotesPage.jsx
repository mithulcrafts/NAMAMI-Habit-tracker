import { QuoteCard } from '../components/QuoteCard'

export const QuotesPage = ({
  quoteOfDay,
  category,
  onCategoryChange,
  onAddCustomQuote,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">💭 Daily Quotes</h2>
        <p className="text-sm text-slate-300 mt-1">Get inspired with daily wisdom</p>
      </div>

      <QuoteCard
        quote={quoteOfDay}
        category={category}
        onCategoryChange={onCategoryChange}
        onAddCustom={onAddCustomQuote}
      />
    </div>
  )
}
