import React, { useContext, useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Button,
  Card,
  CardContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
// icons
import CheckIcon from "@mui/icons-material/Check";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { todosContext } from "../contexts/todoContext";
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

const Todo = ({ todo }) => {
  const { todos, setTodos } = useContext(todosContext);
  const [open, setOpen] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [UpdateTodoDialog, setUpdateTodoDialog] = useState(todo);

  // handels
  const handelCheckClick = () => {
    const updatedTodos = todos.map((d) => {
      if (d.id === todo.id) {
        d.isCompleted = !d.isCompleted;
      }
      return d;
    });
    setTodos(updatedTodos);
    localStorage?.setItem("todos", JSON.stringify(updatedTodos));
  };
  const handelOpen = () => {
    setOpen(true);
  };
  const handleDeleteClose = () => {
    setOpen(false);
  };
  const handelDeleteConfirm = () => {
    const updatedTodos = todos.filter((t) => {
      return t.id !== todo.id;
    });
    setTodos(updatedTodos);
    localStorage?.setItem("todos", JSON.stringify(updatedTodos));
  };
  const handleUpdateClose = () => {
    setOpenUpdateDialog(false);
  };
  const handleUpdateOpen = () => {
    setOpenUpdateDialog(true);
  };
  const handelUpdateConfirm = () => {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return {
          ...t,
          title: UpdateTodoDialog.title,
          details: UpdateTodoDialog.details,
        };
      } else {
        return t;
      }
    });
    setTodos(updatedTodos);
    localStorage?.setItem("todos", JSON.stringify(updatedTodos));
    setOpenUpdateDialog(false);
  };
  // handels end
  return (
    <Card
      className='todoCard'
      style={{
        backgroundColor: `${todo.isCompleted ? "chocolate" : "#191b1f"}`,
        color: "white",
        marginTop: "20px",
      }}
    >
      <CardContent>
        <Grid container>
          <Grid item xs={6} md={8}>
            <Typography
              variant='h5'
              sx={{
                textAlign: "left",
                textDecoration: `${todo.isCompleted ? "line-through" : ""}`,
              }}
            >
              {todo.title}
            </Typography>
            <Typography sx={{ textAlign: "left", fontSize: "15px" }}>
              {todo.details}
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            md={4}
            display='flex'
            alignItems='center'
            justifyContent='space-around'
            padding='5px'
          >
            {/* isCompleted BUTTON  */}
            <IconButton
              className='iconButton'
              variant='outlined'
              style={{
                backgroundColor: todo.isCompleted ? "palegreen" : "white",
                border: "solid palegreen 3px",
                color: `${todo.isCompleted ? "white" : "palegreen"}`,
              }}
              onClick={(e) => {
                handelCheckClick();
              }}
            >
              <CheckIcon fontSize='small' />
            </IconButton>
            {/* isCompleted BUTTON end */}
            
            {/* UPDATE BUTTON  */}
            <IconButton
              className='iconButton'
              variant='outlined'
              style={{
                backgroundColor: "white",
                border: "solid #1769aa 3px",
                color: "#1769aa",
              }}
              onClick={handleUpdateOpen}
            >
              <ModeEditOutlineOutlinedIcon fontSize='small' />
            </IconButton>
            {/* UPDATE BUTTON end */}

            {/* DELETE BUTTON  */}
            <IconButton
              className='iconButton'
              variant='outlined'
              onClick={handelOpen}
              style={{
                backgroundColor: "white",
                border: "solid #b23c17 3px",
                color: "#b23c17",
              }}
            >
              <DeleteForeverOutlinedIcon fontSize='small' />
            </IconButton>
            {/* DELETE BUTTON end */}

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
                  value={UpdateTodoDialog.title}
                  onChange={(e) =>
                    setUpdateTodoDialog({
                      ...UpdateTodoDialog,
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
                  value={UpdateTodoDialog.details}
                  onChange={(e) => {
                    setUpdateTodoDialog({
                      ...UpdateTodoDialog,
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

            {/*DELETE Dialog  */}
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleDeleteClose}
              aria-describedby='alert-dialog-slide-description'
            >
              <DialogTitle>{"Use Google's location service?"}</DialogTitle>
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

          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Todo;
