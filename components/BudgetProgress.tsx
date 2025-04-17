"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import { BudgetProgress as BudgetProgressType } from "@/lib/types";

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

          {/* ✅ Custom Progress Bar */}
          <ProgressPrimitive.Root
            value={budget.percentage}
            className="relative h-2 w-full overflow-hidden rounded bg-gray-200"
            style={{ backgroundColor: `${budget.color}40` }} // light background
          >
            <ProgressPrimitive.Indicator
              className="h-full transition-all"
              style={{
                width: `${Math.min(budget.percentage, 100)}%`,
                backgroundColor: budget.color, // solid fill
              }}
            />
          </ProgressPrimitive.Root>

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
