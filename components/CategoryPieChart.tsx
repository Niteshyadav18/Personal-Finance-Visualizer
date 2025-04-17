"use client";

import { CategoryTotal, Transaction, categories } from "@/lib/types";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface CategoryPieChartProps {
  transactions: Transaction[];
}

export function CategoryPieChart({ transactions }: CategoryPieChartProps) {
  const categoryTotals = transactions.reduce((acc: CategoryTotal[], transaction) => {
    const category = categories.find((c) => c.id === transaction.categoryId);
    if (!category) return acc;

    const existingCategory = acc.find((item) => item.categoryId === category.id);
    if (existingCategory) {
      existingCategory.total += transaction.amount;
    } else {
      acc.push({
        categoryId: category.id,
        name: category.name,
        total: transaction.amount,
        color: category.color,
      });
    }
    return acc;
  }, []);

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={categoryTotals}
            dataKey="total"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            label={({ name, percent }) =>
              `${name} (${(percent * 100).toFixed(0)}%)`
            }
          >
            {categoryTotals.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [`$${value.toFixed(2)}`, "Amount"]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}