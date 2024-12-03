import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { addTask, filterTasks } from '../app/tasksSlice';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem, FormControl, InputLabel } from '@mui/material'; // Correct import for Material UI components

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const tasks = useSelector((state) => state.tasks.filteredTasks);
  const dispatch = useDispatch();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleAddTask = (task) => {
    dispatch(addTask(task));
    toggleModal(); // Close modal after adding task
  };

  const handleFilterChange = (event) => {
    const filter = event.target.value;
    setSelectedFilter(filter);
    dispatch(filterTasks(filter));
  };

  return (
    <div className="dashboard">
      <h1 className="title">Task Dashboard</h1>

      {/* Material UI Select Dropdown for Filtering */}
      <FormControl variant="outlined" style={{ marginBottom: '20px' }}>
        <InputLabel>Filter Tasks</InputLabel>
        <Select
          value={selectedFilter}
          onChange={handleFilterChange}
          label="Filter Tasks"
        >
          <MenuItem value="All">All Tasks</MenuItem>
          <MenuItem value="Completed">Completed Tasks</MenuItem>
          <MenuItem value="Pending">Pending Tasks</MenuItem>
          <MenuItem value="Overdue">Overdue Tasks</MenuItem>
        </Select>
      </FormControl>

      {/* Material UI Button to Add New Task */}
      <Button
        variant="contained"
        color="primary"
        onClick={toggleModal}
        style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            fontSize: '1rem',
            cursor: 'pointer',
            width: '200px',
        }}
      >
        Add New Task
      </Button>

      {/* Material UI Dialog Modal for Adding Task */}
      <Dialog open={showModal} onClose={toggleModal}>
        <DialogContent>
          <TaskForm onSubmit={handleAddTask} onCancel={toggleModal} />
        </DialogContent>
      </Dialog>

      {/* Table for displaying tasks */}
      <div className="table-container">
  <table className="table" border="1" cellPadding="10">
    <thead>
      <tr>
      <th style={{ backgroundColor: '#3b4147', color: 'white' }}>Task Name</th>
      <th style={{ backgroundColor: '#3b4147', color: 'white' }}>Task Description</th>
      <th style={{ backgroundColor: '#3b4147', color: 'white' }}>Due Date</th>
      <th style={{ backgroundColor: '#3b4147', color: 'white' }}>Status</th>
      </tr>
    </thead>
    <tbody>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default Dashboard;
