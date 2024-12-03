import { createSlice } from '@reduxjs/toolkit';

const loadFromLocalStorage = () => {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
};

const saveToLocalStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const initialState = {
  tasks: loadFromLocalStorage(),
  filteredTasks: loadFromLocalStorage(),
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      state.filteredTasks = state.tasks;
      saveToLocalStorage(state.tasks);
    },
    editTask: (state, action) => {
      const { id, title, description, dueDate } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.title = title;
        task.description = description;
        task.dueDate = dueDate;

        const currentDate = new Date();
        const updatedDueDate = new Date(dueDate);
        task.status =
          updatedDueDate < currentDate ? 'Overdue' : task.status === 'Completed' ? 'Completed' : 'Pending';
      }
      state.filteredTasks = state.tasks;
      saveToLocalStorage(state.tasks);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      state.filteredTasks = state.tasks;
      saveToLocalStorage(state.tasks);
    },
    updateTaskStatus: (state, action) => {
      const { id, status } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.status = status;
      }
      state.filteredTasks = state.tasks;
      saveToLocalStorage(state.tasks);
    },
    filterTasks: (state, action) => {
      const filter = action.payload;
      if (filter === 'All') {
        state.filteredTasks = state.tasks;
      } else if (filter === 'Completed') {
        state.filteredTasks = state.tasks.filter((task) => task.status === 'Completed');
      } else if (filter === 'Pending') {
        state.filteredTasks = state.tasks.filter((task) => task.status === 'Pending');
      } else if (filter === 'Overdue') {
        const currentDate = new Date();
        state.filteredTasks = state.tasks.filter(
          (task) => new Date(task.dueDate) < currentDate && task.status !== 'Completed'
        );
      }
    },
    searchTasks: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      state.filteredTasks = state.tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm)
      );
    },
  },
});

export const { addTask, editTask, deleteTask, updateTaskStatus, filterTasks, searchTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
