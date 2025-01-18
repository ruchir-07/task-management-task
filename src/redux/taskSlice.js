import { createSlice } from "@reduxjs/toolkit";

const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const loadTasksFromLocalStorage = () => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
};


export const taskSlice = createSlice({
  name: "taskData",
  initialState: loadTasksFromLocalStorage(),
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
      saveTasksToLocalStorage(state);
    },
    updateStatus: (state, action) => {
      const { id, status } = action.payload;
      const task = state.find((task) => task.id === id);
      if (task) {
        task.status = status;
        saveTasksToLocalStorage(state);
      }
    },
    deleteTask: (state, action) => {
      const newState = state.filter((task) => task.id !== action.payload);
      saveTasksToLocalStorage(newState);
      return newState;
    },
    updateTask: (state, action) => {
      const { id, title, detail, priority } = action.payload;
      const task = state.find((task) => task.id === id);
      if (task) {
        task.title = title;
        task.detail = detail;
        task.priority = priority;
        saveTasksToLocalStorage(state);
      }
    },
  },
});

export const { addTask, updateStatus, deleteTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;
