import * as React from "react";
import { useState, useContext, useEffect, useMemo } from "react";

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
import { toastContext } from "../contexts/toastContext";
// dialoge
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
// Transition effect
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});
export default function TodoList() {
  const { todos, setTodos } = useContext(todosContext);
  const { showHideToast } = useContext(toastContext);
  const [titleInput, setTitleInput] = useState("");
  const [displayTypeTodos, setdisplayTypeTodos] = useState("all");
  const [openDeleteDialoge, setOpenDeleteDialoge] = useState(false);
  const [DailogeTodo, setDialogeTodo] = useState(null);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage?.getItem("todos")) ?? [];
    setTodos(storageTodos);
  }, []);

  // HANDELERS
  const handleUpdateClose = () => {
    setOpenUpdateDialog(false);
  };
  const handleUpdateOpen = (todo) => {
    setDialogeTodo(todo);
    setOpenUpdateDialog(true);
  };
  const handelUpdateConfirm = () => {
    const updatedTodos = todos?.map((t) => {
      if (t.id === DailogeTodo.id) {
        return {
          ...t,
          title: DailogeTodo.title,
          details: DailogeTodo.details,
        };
      } else {
        return t;
      }
    });
    setTodos(updatedTodos);
    localStorage?.setItem("todos", JSON.stringify(updatedTodos));
    setOpenUpdateDialog(false);
    showHideToast("Task Updated Successfully");
  };
  const handleDeleteClose = () => {
    setOpenDeleteDialoge(false);
  };
  const handleDeleteopen = (todo) => {
    setDialogeTodo(todo);
    setOpenDeleteDialoge(true);
  };
  const handelDeleteConfirm = () => {
    const updatedTodos = todos.filter((t) => {
      return t.id !== DailogeTodo.id;
    });
    setTodos(updatedTodos);
    localStorage?.setItem("todos", JSON.stringify(updatedTodos));
    setOpenDeleteDialoge(false);
    showHideToast("Task Deleted successfully");
  };
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
    showHideToast("Task Added successfully");
  };
  const ChangingTodosState = (e) => {
    setdisplayTypeTodos(e.target.value);
  };
  const notCompletedTodos = useMemo(() => {
    return todos.filter(
      (t) => {
        return !t.isCompleted;
      },
      [todos]
    );
  });
  const completedTodos = useMemo(() => {
    return todos.filter(
      (t) => {
        return t.isCompleted;
      },
      [todos]
    );
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
    return (
      <Todo
        key={t.id}
        todo={t}
        showDelete={handleDeleteopen}
        showUpdate={handleUpdateOpen}
      />
    );
  });
  return (
    <>
      {/*DELETE Dialog  */}
      <Dialog
        open={openDeleteDialoge}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDeleteClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            If you click agree you will delete it permanently.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Disagree</Button>
          <Button onClick={handelDeleteConfirm}>Agree</Button>
        </DialogActions>
      </Dialog>
      {/*DELETE Dialog END */}

      {/* UPDATE Dialog  */}
      <Dialog open={openUpdateDialog} onClose={handleUpdateClose}>
        <DialogTitle>UPDATE YOUR TODO</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Title'
            type='text'
            fullWidth
            variant='standard'
            value={DailogeTodo?.title}
            onChange={(e) =>
              setDialogeTodo({
                ...DailogeTodo,
                title: e.target.value,
              })
            }
          />
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Details'
            type='text'
            fullWidth
            variant='standard'
            value={DailogeTodo?.details}
            onChange={(e) => {
              setDialogeTodo({
                ...DailogeTodo,
                details: e.target.value,
              });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>Cancel</Button>
          <Button onClick={handelUpdateConfirm}>Update</Button>
        </DialogActions>
      </Dialog>
      {/* UPDATE Dialog end */}
      <Container maxWidth='sm'>
        <Card
          sx={{ minWidth: 275 }}
          style={{
            backgroundColor: "darkcyan",
            color: "white",
            marginTop: "2.5rem",
          }}
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
    </>
  );
}
