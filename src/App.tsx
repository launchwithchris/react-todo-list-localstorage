import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Stack,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { type Dayjs } from "dayjs";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/NavBar";
import About from "./pages/About";
import Contact from "./pages/Contact";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  dueDate: Dayjs | null;
  completedAt: Dayjs | null;
}

const LOCAL_STORAGE_KEY = "my-todo-list";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    // Initialize state from localStorage
    const savedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedTodos) {
      // Parse the JSON and convert date strings back to Dayjs objects
      return JSON.parse(savedTodos).map((todo: any) => ({
        ...todo,
        dueDate: todo.dueDate ? dayjs(todo.dueDate) : null,
        completedAt: todo.completedAt ? dayjs(todo.completedAt) : null,
      }));
    }
    return [];
  });

  const [inputValue, setInputValue] = useState<string>("");
  const [dueDate, setDueDate] = useState<Dayjs | null>(null);

  // Sync state with localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(
        todos.map((todo) => ({
          ...todo,
          dueDate: todo.dueDate ? todo.dueDate.toISOString() : null,
          completedAt: todo.completedAt ? todo.completedAt.toISOString() : null,
        }))
      )
    );
  }, [todos]);

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: inputValue,
          completed: false,
          dueDate: dueDate,
          completedAt: null,
        },
      ]);
      setInputValue("");
      setDueDate(null);
    }
  };

  const handleToggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          const newCompletedStatus = !todo.completed;
          return {
            ...todo,
            completed: newCompletedStatus,
            completedAt: newCompletedStatus ? dayjs() : null,
          };
        }
        return todo;
      })
    );
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
          <Routes>
            <Route
              path="/"
              element={
                <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
                  <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    align="center"
                  >
                    Todo List
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      mb: 2,
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      label="New Todo"
                      variant="outlined"
                      fullWidth
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAddTodo()}
                    />
                    <Button
                      variant="contained"
                      onClick={handleAddTodo}
                      sx={{ flexShrink: 0 }}
                    >
                      Add
                    </Button>
                  </Box>

                  <Stack spacing={2} sx={{ mb: 2 }}>
                    <DateTimePicker
                      label="Optional Due Date"
                      value={dueDate}
                      onChange={(newValue) => setDueDate(newValue)}
                    />
                  </Stack>

                  <List>
                    {todos.map((todo) => (
                      <ListItem
                        key={todo.id}
                        sx={{
                          textDecoration: todo.completed
                            ? "line-through"
                            : "none",
                        }}
                      >
                        <Checkbox
                          edge="start"
                          checked={todo.completed}
                          tabIndex={-1}
                          disableRipple
                          onChange={() => handleToggleComplete(todo.id)}
                        />
                        <ListItemText
                          primary={todo.text}
                          secondary={
                            <Box component="span">
                              {todo.dueDate && (
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  display="block"
                                >
                                  Due:{" "}
                                  {todo.dueDate.format("MM/DD/YYYY h:mm A")}
                                </Typography>
                              )}
                              {todo.completedAt && (
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                  display="block"
                                >
                                  Completed:{" "}
                                  {todo.completedAt.format("MM/DD/YYYY h:mm A")}
                                </Typography>
                              )}
                            </Box>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Paper>
      </Container>
    </>
  );
}
