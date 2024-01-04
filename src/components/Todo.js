import React from "react";
import Grid from "@mui/material/Grid";
import {
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
// icons
import CheckIcon from "@mui/icons-material/Check";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

const Todo = () => {
  return (
    <Card
      className='todoCard'
      //   sx={{ minWidth: 275 }}
      style={{
        backgroundColor: "#191b1f",
        color: "white",
        marginTop: "20px",
      }}
    >
      <CardContent>
        <Grid container>
          <Grid xs={6} md={8}>
            <Typography variant='h5' sx={{ textAlign: "left" }}>
              Mission 1
            </Typography>
            <Typography variant='h6' sx={{ textAlign: "left" }}>
              Mission 1
            </Typography>
          </Grid>
          <Grid
            xs={6}
            md={4}
            display='flex'
            alignItems='center'
            justifyContent='space-around'
            padding='5px'
          >
            <IconButton
              className='iconButton'
              variant='outlined'
              style={{
                backgroundColor: "white",
                border: "solid palegreen 3px",
                color: "palegreen",
              }}
            >
              <CheckIcon fontSize='small' />
            </IconButton>

            <IconButton
              className='iconButton'
              variant='outlined'
              style={{
                backgroundColor: "white",
                border: "solid #1769aa 3px",
                color: "#1769aa",
              }}
            >
              <ModeEditOutlineOutlinedIcon fontSize='small' />
            </IconButton>

            <IconButton
              className='iconButton'
              variant='outlined'
              style={{
                backgroundColor: "white",
                border: "solid #b23c17 3px",
                color: "#b23c17",
              }}
            >
              <DeleteForeverOutlinedIcon fontSize='small' />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Todo;
