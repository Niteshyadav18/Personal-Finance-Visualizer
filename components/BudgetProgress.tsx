"use client";

import { BudgetProgress as BudgetProgressType } from "@/lib/types";
import { Progress } from "@/components/ui/progress";

interface BudgetProgressProps {
  budgets: BudgetProgressType[];
}

export function BudgetProgress({ budgets }: BudgetProgressProps) {
  return (
    <div className="space-y-6">
      {budgets.map((budget) => (
        <div key={budget.categoryId} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium">{budget.name}</span>
            <span className="text-sm text-muted-foreground">
              ${budget.spent.toFixed(2)} / ${budget.budgeted.toFixed(2)}
            </span>
          </div>
          <Progress
            value={budget.percentage}
            className="h-2"
            style={{
              backgroundColor: `${budget.color}40`,
            }}
            indicatorStyle={{
              backgroundColor: budget.color,
            }}
          />
          <p className="text-sm text-muted-foreground">
            {budget.percentage > 100
              ? `${(budget.percentage - 100).toFixed(1)}% over budget`
              : `${(100 - budget.percentage).toFixed(1)}% remaining`}
          </p>
        </div>
      ))}
    </div>
  );
}