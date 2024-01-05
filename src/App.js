import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { todosContext } from "./contexts/todoContext";
import { useState } from "react";
const theme = createTheme({
  typography: {
    fontFamily: ["Kalam"],
  },
});
function App() {
  const [todos, setTodos] = useState([]);
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#191b1f",
        }}
      >
        <todosContext.Provider value={{ todos, setTodos }}>
          <TodoList />
        </todosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
