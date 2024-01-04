import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["Kalam"],
  },
});
function App() {
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
        <TodoList />
      </div>
    </ThemeProvider>
  );
}

export default App;
