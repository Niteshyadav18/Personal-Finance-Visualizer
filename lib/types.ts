export type Category = {
  id: string;
  name: string;
  color: string;
};

export const categories: Category[] = [
  { id: "groceries", name: "Groceries", color: "hsl(var(--chart-1))" },
  { id: "utilities", name: "Utilities", color: "hsl(var(--chart-2))" },
  { id: "entertainment", name: "Entertainment", color: "hsl(var(--chart-3))" },
  { id: "transport", name: "Transport", color: "hsl(var(--chart-4))" },
  { id: "other", name: "Other", color: "hsl(var(--chart-5))" },
];

export interface Transaction {
  id: string;
  amount: number;
  date: Date;
  description: string;
  categoryId: string;
}

export interface TransactionFormData {
  amount: number;
  date: string;
  description: string;
  categoryId: string;
}

export interface CategoryTotal {
  categoryId: string;
  name: string;
  total: number;
  color: string;
}

export interface Budget {
  categoryId: string;
  amount: number;
}

export interface BudgetFormData {
  categoryId: string;
  amount: number;
}

export interface BudgetProgress {
  categoryId: string;
  name: string;
  budgeted: number;
  spent: number;
  color: string;
  percentage: number;
}