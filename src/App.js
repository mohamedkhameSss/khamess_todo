import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// context
import { todosContext } from "./contexts/todoContext";

import { useState } from "react";
import { TostProvider } from "./contexts/toastContext";
const theme = createTheme({
  typography: {
    fontFamily: ["Kalam"],
  },
});
function App() {
  const [todos, setTodos] = useState([]);
  return (
    <ThemeProvider theme={theme}>
      
      <TostProvider >
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
      </TostProvider>
    </ThemeProvider>
  );
}

export default App;
