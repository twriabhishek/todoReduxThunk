import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  isLoading: false,
  isError: false,
};

export const getAllTodo = createAsyncThunk("getAllTodo", async () => {
  const response = await fetch("http://localhost:8000/api/v1/todo/getalltask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  console.log(response);
  return response.json();
});

export const addTodo = createAsyncThunk("addTodo", async (task) => {
  let taskdetail = {
    title: task,
  };
  const response = await fetch("http://localhost:8000/api/v1/todo/addtask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskdetail),
    credentials: "include",
  });
  console.log(response);
  return response.json();
});

export const updateTodo = createAsyncThunk("updateTodo", async (task) => {
  let taskdetail = {
    taskId: task.id,
    title: task.text,
  };
  const response = await fetch("http://localhost:8000/api/v1/todo/updatetask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskdetail),
    credentials: "include",
  });
  console.log(response);
  return response.json();
});

export const deleteTodo = createAsyncThunk("deleteTodo", async (id) => {
  let taskdetail = {
    taskId: id,
  };
  const response = await fetch("http://localhost:8000/api/v1/todo/deletetask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskdetail),
    credentials: "include",
  });
  console.log(response);
  return response.json();
});

export const todoSlice = createSlice({
  name: "todo",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(getAllTodo.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
    });
    builder.addCase(getAllTodo.rejected, (state, action) => {
      state.isError = true;
    });
    builder.addCase(addTodo.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      window.location.reload();
    });
    builder.addCase(addTodo.rejected, (state, action) => {
      state.isError = true;
    });
    builder.addCase(updateTodo.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      window.location.reload();
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.isError = true;
    });
    builder.addCase(deleteTodo.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      window.location.reload();
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export const { getTodo } = todoSlice.actions;

export default todoSlice.reducer;