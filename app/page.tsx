"use client";

import { useState } from "react";
import { Budget, Transaction, TransactionFormData, BudgetFormData } from "@/lib/types";
import { TransactionForm } from "@/components/TransactionForm";
import { TransactionList } from "@/components/TransactionList";
import { ExpensesChart } from "@/components/ExpensesChart";
import { CategoryPieChart } from "@/components/CategoryPieChart";
import { DashboardSummary } from "@/components/DashboardSummary";
import { BudgetForm } from "@/components/BudgetForm";
import { BudgetProgress } from "@/components/BudgetProgress";
import { SpendingInsights } from "@/components/SpendingInsights";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categories } from "@/lib/types";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Record<string, number>>({});

  const handleAddTransaction = (data: TransactionFormData) => {
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      amount: data.amount,
      date: new Date(data.date),
      description: data.description,
      categoryId: data.categoryId,
    };
    setTransactions([...transactions, newTransaction]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const handleSetBudget = (data: BudgetFormData) => {
    setBudgets({
      ...budgets,
      [data.categoryId]: data.amount,
    });
  };

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthlyTransactions = transactions.filter(
    (t) => {
      const date = new Date(t.date);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    }
  );

  const budgetProgress = categories.map(category => {
    const spent = monthlyTransactions
      .filter(t => t.categoryId === category.id)
      .reduce((sum, t) => sum + t.amount, 0);
    const budgeted = budgets[category.id] || 0;
    return {
      categoryId: category.id,
      name: category.name,
      budgeted,
      spent,
      color: category.color,
      percentage: budgeted > 0 ? (spent / budgeted) * 100 : 0,
    };
  });

  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Personal Finance Tracker
      </h1>

      <DashboardSummary transactions={transactions} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Add Transaction</CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionForm onSubmit={handleAddTransaction} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Set Monthly Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <BudgetForm onSubmit={handleSetBudget} existingBudgets={budgets} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Budget Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <BudgetProgress budgets={budgetProgress} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Spending Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <SpendingInsights
                transactions={transactions}
                budgets={budgets}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Expense Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="monthly">
            <TabsList className="mb-4">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="category">By Category</TabsTrigger>
            </TabsList>
            <TabsContent value="monthly">
              <ExpensesChart transactions={transactions} />
            </TabsContent>
            <TabsContent value="category">
              <CategoryPieChart transactions={transactions} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionList
            transactions={transactions}
            onDelete={handleDeleteTransaction}
          />
        </CardContent>
      </Card>
    </div>
  );
}