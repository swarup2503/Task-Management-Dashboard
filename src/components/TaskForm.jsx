import React, { useState } from 'react';
import { TextField, Button, DialogActions, DialogContent } from '@mui/material';

const TaskForm = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(), // Generate a unique ID for the task
      title,
      description,
      dueDate,
      completed: false,
    };
    onSubmit(newTask); // Call the onSubmit function from the parent
  };

  return (
    <form onSubmit={handleSubmit}>
      
        <h2>Add New Task</h2>

        {/* Title Input Field */}
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ marginBottom: '16px' }}
        />

        {/* Description Textarea Field */}
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ marginBottom: '16px' }}
        />

        {/* Due Date Input Field */}
        <TextField
          label="Due Date"
          variant="outlined"
          type="date"
          fullWidth
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          InputLabelProps={{
            shrink: true,
          }}
          style={{ marginBottom: '16px' }}
        />
      

      {/* Dialog Actions (Buttons) */}
      <DialogActions>
        <Button onClick={onCancel} color="secondary">
          Cancel
        </Button>
        <Button type="submit" color="primary" variant="contained">
          Add Task
        </Button>
      </DialogActions>
    </form>
  );
};

export default TaskForm;
