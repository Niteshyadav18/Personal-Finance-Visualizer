"use client";

import { Transaction, categories } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DashboardSummaryProps {
  transactions: Transaction[];
}

export function DashboardSummary({ transactions }: DashboardSummaryProps) {
  const totalExpenses = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  const categoryTotals = transactions.reduce((acc, transaction) => {
    const category = categories.find((c) => c.id === transaction.categoryId);
    if (!category) return acc;

    acc[category.id] = (acc[category.id] || 0) + transaction.amount;
    return acc;
  }, {} as Record<string, number>);

  const topCategory = Object.entries(categoryTotals).reduce(
    (max, [categoryId, amount]) =>
      amount > (max.amount || 0)
        ? {
            category: categories.find((c) => c.id === categoryId)?.name || "",
            amount,
          }
        : max,
    { category: "", amount: 0 }
  );

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            All time total expenses
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{topCategory.category}</div>
          <p className="text-xs text-muted-foreground">
            ${topCategory.amount.toFixed(2)}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {transactions.length} Transactions
          </div>
          <p className="text-xs text-muted-foreground">
            Total number of transactions
          </p>
        </CardContent>
      </Card>
    </div>
  );
}