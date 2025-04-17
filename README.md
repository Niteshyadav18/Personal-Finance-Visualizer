# Personal Finance Tracker

A modern web application for tracking personal finances, managing budgets, and gaining insights into spending habits.

![Personal Finance Tracker](https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200&h=600)

## Features

### Transaction Management
- Add, edit, and delete financial transactions
- Categorize transactions with predefined categories
- Track transaction dates and descriptions
- View transaction history in a sortable table

### Budget Management
- Set monthly budgets for different spending categories
- Track budget progress with visual indicators
- Get alerts when spending exceeds budget limits
- View remaining budget percentages

### Analytics & Insights
- Monthly expenses bar chart
- Category-wise pie chart
- Real-time spending insights
- Budget vs. actual comparison
- Highest spending category tracking
- Over-budget warnings

### Dashboard
- Total expenses overview
- Top spending categories
- Recent activity summary
- Monthly spending trends

## Tech Stack

- **Framework**: Next.js 13 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Icons**: Lucide React

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── BudgetForm.tsx
│   ├── BudgetProgress.tsx
│   ├── CategoryPieChart.tsx
│   ├── DashboardSummary.tsx
│   ├── ExpensesChart.tsx
│   ├── SpendingInsights.tsx
│   ├── TransactionForm.tsx
│   ├── TransactionList.tsx
│   └── ui/
├── lib/
│   ├── types.ts
│   └── utils.ts
└── public/
```

## Key Components

### TransactionForm
- Handles adding new transactions
- Form validation with Zod
- Category selection
- Date picker with calendar

### BudgetProgress
- Visual representation of budget utilization
- Progress bars with category colors
- Percentage-based indicators
- Over-budget warnings

### SpendingInsights
- Smart insights based on spending patterns
- Budget violation alerts
- Spending trend analysis
- Category-wise recommendations

### Analytics Charts
- Monthly expenses tracking
- Category distribution visualization
- Interactive tooltips
- Responsive design

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Recharts](https://recharts.org/) for the charting library
- [Lucide](https://lucide.dev/) for the icons