import * as React from "react";
import { useState, useContext, useEffect } from "react";

// design
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, Divider, Grid, TextField } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import Todo from "./Todo";
// id
import { v4 as uuidv4 } from "uuid";
// context 
import { todosContext } from "../contexts/todoContext";

export default function TodoList() {
  const { todos, setTodos } = useContext(todosContext);
  const [titleInput, setTitleInput] = useState("");
  const [displayTypeTodos, setdisplayTypeTodos] = useState("all");
  useEffect(() => {
    const storageTodos = JSON.parse(localStorage?.getItem("todos")) ?? [];
    setTodos(storageTodos);
  }, []);

  const handelAddClick = () => {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage?.setItem("todos", JSON?.stringify(updatedTodos));
    setTitleInput("");
  };
  const ChangingTodosState = (e) => {
    setdisplayTypeTodos(e.target.value);
  };
  const notCompletedTodos = todos.filter((t) => {
    return !t.isCompleted;
  });
  const completedTodos = todos.filter((t) => {
    return t.isCompleted;
  });
  let todosToBeREnder = todos;

  if (displayTypeTodos === "completed") {
    todosToBeREnder = completedTodos;
  } else if (displayTypeTodos === "notcompleted") {
    todosToBeREnder = notCompletedTodos;
  } else {
    todosToBeREnder = todos;
  }

  const todoRender = todosToBeREnder.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });
  return (
    <Container maxWidth='sm'>
      <Card
        sx={{ minWidth: 275 }}
        style={{ backgroundColor: "darkcyan", color: "white" }}
      >
        <CardContent>
          {/* title */}
          <Typography variant='h2' component='div'>
            TodoList
          </Typography>
          {/* title end*/}
          <Divider
            light
            style={{
              marginBottom: "20px",
              marginTop: "20px",
              backgroundColor: "white",
            }}
          />
          {/*main buttons */}
          <ToggleButtonGroup
            color='warning'
            value={displayTypeTodos}
            onChange={ChangingTodosState}
            exclusive
            aria-label='Platform'
          >
            <ToggleButton value='all'>All</ToggleButton>
            <ToggleButton value='completed'>Completed</ToggleButton>
            <ToggleButton value='notcompleted'>Not Completed</ToggleButton>
          </ToggleButtonGroup>
          {/*main buttons end */}
          {/*all todos  */}

          {todoRender.length === 0 ? (
            <Typography
              style={{
                width: "100%",
                height: "20vh",
                margin: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "25px",
              }}
            >
              No Tasks Aavilable
            </Typography>
          ) : (
            todoRender
          )}
          {/*all todos end */}
          {/* Button + Add  */}
          <CardContent>
            <Grid container style={{ marginTop: "20px" }} spacing={2}>
              <Grid
                item
                xs={4}
                display='flex'
                alignItems='center'
                justifyContent='space-around'
                padding='5px'
              >
                <Button
                  onClick={() => handelAddClick()}
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "chocolate",
                  }}
                  variant='contained'
                  disabled={titleInput.length <= 0}
                >
                  Add Task
                </Button>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  style={{
                    width: "100%",
                  }}
                  id='outlined-basic'
                  label='Write Your Task'
                  variant='outlined'
                  value={titleInput}
                  onChange={(e) => {
                    setTitleInput(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
          {/* Button + Add end */}
        </CardContent>
      </Card>
    </Container>
  );
}
