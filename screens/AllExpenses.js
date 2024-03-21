import React, { useContext } from "react";
import { Text } from "react-native";
import ExpensesOutput from "../component/Expenses/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

const AllExpenses = () => {
  const expenseCtx = useContext(ExpensesContext);

  return (
    <ExpensesOutput
      expenses={expenseCtx.expenses}
      expensesPeriod="Total"
      fallbackText="No expenses registered"
    />
  );
};

export default AllExpenses;
