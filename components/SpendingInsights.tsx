"use client";

import { Transaction, categories } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, TrendingDown, TrendingUp } from "lucide-react";

interface SpendingInsightsProps {
  transactions: Transaction[];
  budgets: Record<string, number>;
}

export function SpendingInsights({ transactions, budgets }: SpendingInsightsProps) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthlyTransactions = transactions.filter(
    (t) => {
      const date = new Date(t.date);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    }
  );

  const categorySpending = monthlyTransactions.reduce((acc, transaction) => {
    acc[transaction.categoryId] = (acc[transaction.categoryId] || 0) + transaction.amount;
    return acc;
  }, {} as Record<string, number>);

  const insights = [];

  // Check for categories over budget
  for (const categoryId in categorySpending) {
    const budget = budgets[categoryId] || 0;
    if (budget > 0 && categorySpending[categoryId] > budget) {
      const category = categories.find(c => c.id === categoryId);
      const percentage = ((categorySpending[categoryId] - budget) / budget * 100).toFixed(1);
      insights.push({
        type: "warning",
        icon: AlertTriangle,
        message: `${category?.name} is ${percentage}% over budget this month`,
      });
    }
  }

  // Find highest spending category
  const highestSpending = Object.entries(categorySpending).reduce(
    (max, [categoryId, amount]) =>
      amount > (max.amount || 0) ? { categoryId, amount } : max,
    { categoryId: "", amount: 0 }
  );

  if (highestSpending.categoryId) {
    const category = categories.find(c => c.id === highestSpending.categoryId);
    insights.push({
      type: "info",
      icon: TrendingUp,
      message: `Highest spending: ${category?.name} ($${highestSpending.amount.toFixed(2)})`,
    });
  }

  // Find categories with no spending
  const categoriesWithNoBudget = categories.filter(
    category => !budgets[category.id]
  );

  if (categoriesWithNoBudget.length > 0) {
    insights.push({
      type: "tip",
      icon: TrendingDown,
      message: `Set budgets for: ${categoriesWithNoBudget.map(c => c.name).join(", ")}`,
    });
  }

  return (
    <div className="space-y-4">
      {insights.map((insight, index) => (
        <Card key={index}>
          <CardContent className="flex items-center gap-4 py-4">
            <insight.icon className={`h-5 w-5 ${
              insight.type === "warning" ? "text-destructive" :
              insight.type === "info" ? "text-primary" :
              "text-muted-foreground"
            }`} />
            <p className="text-sm">{insight.message}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}