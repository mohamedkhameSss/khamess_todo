import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import { Card, CardContent, IconButton, Typography } from "@mui/material";
// icons
import CheckIcon from "@mui/icons-material/Check";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
// context 
import { toastContext } from "../contexts/toastContext";

const Todo = ({ todo, showDelete, showUpdate,dispatch }) => {
  const { showHideToast } = useContext(toastContext);
  
  // handels
  const handelCheckClick = () => {
    dispatch({type:"CheckUpdated",payload:todo})
    showHideToast("Changed successfully");
  };
  const handelOpenDeelteDailoge = () => {
    showDelete(todo);
  };
  const handelshowUpdate = () => {
    showUpdate(todo);
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
              onClick={handelshowUpdate}
            >
              <ModeEditOutlineOutlinedIcon fontSize='small' />
            </IconButton>
            {/* UPDATE BUTTON end */}

            {/* DELETE BUTTON  */}
            <IconButton
              className='iconButton'
              variant='outlined'
              onClick={handelOpenDeelteDailoge}
              style={{
                backgroundColor: "white",
                border: "solid #b23c17 3px",
                color: "#b23c17",
              }}
            >
              <DeleteForeverOutlinedIcon fontSize='small' />
            </IconButton>
            {/* DELETE BUTTON end */}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Todo;
