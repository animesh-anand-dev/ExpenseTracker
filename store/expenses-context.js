import { createContext, useReducer, useState } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of Shoes",
    amount: 750,
    date: new Date("2024-03-20"),
  },
  {
    id: "e2",
    description: "Samosha",
    amount: 50,
    date: new Date("2024-03-05"),
  },
  {
    id: "e3",
    description: "Veg Thali",
    amount: 50,
    date: new Date("2024-03-15"),
  },
  {
    id: "e4",
    description: "Fruits",
    amount: 200,
    date: new Date("2024-03-18"),
  },
  {
    id: "e5",
    description: "Shirts",
    amount: 950,
    date: new Date("2024-03-13"),
  },
  {
    id: "e6",
    description: "A pair of Shoes",
    amount: 750,
    date: new Date("2024-03-20"),
  },
  {
    id: "e7",
    description: "Samosha",
    amount: 50,
    date: new Date("2024-03-05"),
  },
  {
    id: "e8",
    description: "Veg Thali",
    amount: 50,
    date: new Date("2024-03-15"),
  },
  {
    id: "e9",
    description: "Fruits",
    amount: 200,
    date: new Date("2024-03-18"),
  },
  {
    id: "e10",
    description: "Shirts",
    amount: 950,
    date: new Date("2024-03-13"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toDateString + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];

    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;

    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);

    default:
      return null;
  }
}

function ExpenseContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }
  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }
  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpenseContextProvider;
