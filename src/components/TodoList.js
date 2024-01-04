import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, Divider, Grid, TextField } from "@mui/material";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Todo from "./Todo";

export default function TodoList() {
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
          <ToggleButtonGroup color='primary' exclusive aria-label='Platform'>
            <ToggleButton style={{ color: "white", borderColor: "white" }}>
              <Typography>All</Typography>
            </ToggleButton>
            <ToggleButton style={{ color: "white", borderColor: "white" }}>
              <Typography>Completed</Typography>
            </ToggleButton>
            <ToggleButton style={{ color: "white", borderColor: "white" }}>
              <Typography>Incompleted</Typography>
            </ToggleButton>
          </ToggleButtonGroup>
          {/*main buttons end */}
          {/*all todos  */}
          <Todo />
          {/*all todos end */}
          {/* Button + Add  */}
          <CardContent>
            <Grid container style={{ marginTop: "20px" }} spacing={2}>
              <Grid
                xs={4}
                display='flex'
                alignItems='center'
                justifyContent='space-around'
                padding='5px'
              >
                <Button
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "chocolate",
                  }}
                  variant='contained'
                >
                  Add Mission
                </Button>
              </Grid>
              <Grid xs={8}>
                <TextField
                  style={{
                    width: "100%",
                  }}
                  id='outlined-basic'
                  label='Mission Title'
                  variant='outlined'
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
