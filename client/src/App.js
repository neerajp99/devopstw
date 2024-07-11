import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Paper,
  Box,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";

function App() {
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    console.log("Fetching data...");
    axios
      .get("http://localhost:8000/items")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const addItem = () => {
    console.log("Adding item...", newItem);
    axios
      .post("http://localhost:8000/items", { item: newItem })
      .then((response) => setData([...data, response.data]))
      .catch((error) => console.error("Error adding item:", error));
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" color="inherit" aria-label="menu"> */}
          {/* <MenuIcon /> */}
          {/* </IconButton> */}
          {/* <Typography variant="h6">Item List</Typography> */}
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Items
          </Typography>
          <Paper>
            <List>
              {data.map((item) => (
                <ListItem key={item.id}>
                  <ListItemText primary={item.item} />
                </ListItem>
              ))}
            </List>
          </Paper>
          <Box display="flex" alignItems="center" mt={2}>
            <TextField
              label="New Item"
              variant="outlined"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={addItem}
              startIcon={<AddIcon />}
              style={{ marginLeft: 8 }}
            >
              Add Item
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default App;
