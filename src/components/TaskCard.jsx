import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTaskStatus, deleteTask, editTask } from "../app/tasksSlice";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTaskData, setEditTaskData] = useState({
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
  });

  // Handle checkbox change
  const handleCheckboxChange = () => {
    const currentDate = new Date();
    let newStatus = "";

    if (new Date(task.dueDate) < currentDate && task.status !== "Completed") {
      newStatus = "Overdue";
    } else if (task.status === "Completed") {
      newStatus = "Pending";
    } else {
      newStatus = "Completed";
    }

    dispatch(updateTaskStatus({ id: task.id, status: newStatus }));
  };

  // Show confirmation popup for deletion
  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  // Confirm deletion
  const confirmDelete = () => {
    dispatch(deleteTask(task.id));
    setShowConfirm(false);
  };

  // Cancel deletion
  const cancelDelete = () => {
    setShowConfirm(false);
  };

  // Handle Edit Modal
  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditTaskData({ ...editTaskData, [name]: value });
  };

  const saveEditChanges = () => {
    // Determine the new status based on the updated due date
    const currentDate = new Date();
    const updatedDueDate = new Date(editTaskData.dueDate);
    let updatedStatus = task.status; // Default to current status

    if (updatedDueDate < currentDate) {
      updatedStatus = "Overdue";
    } else if (task.status === "Completed") {
      updatedStatus = "Completed";
    } else {
      updatedStatus = "Pending";
    }

    // Dispatch the editTask action with updated details and status
    dispatch(
      editTask({
        id: task.id,
        title: editTaskData.title,
        description: editTaskData.description,
        dueDate: editTaskData.dueDate,
        status: updatedStatus,
      })
    );

    setShowEditModal(false);
  };

  const cancelEdit = () => {
    setShowEditModal(false);
  };

  return (
    <>
      <tr>
        <td>{task.title}</td>
        <td>{task.description}</td>
        <td>{task.dueDate}</td>
        <td className="checkbox-cell">
          <input
            type="checkbox"
            checked={task.status === "Completed"}
            onChange={handleCheckboxChange}
          />
        </td>
        <td>
          <button onClick={handleEditClick} className="edit_button">
            Edit
          </button>
          <button onClick={handleDeleteClick} className="delete_button">
            Delete
          </button>
        </td>
      </tr>

      {/* Edit Modal using Material UI Dialog */}
      <Dialog open={showEditModal} onClose={cancelEdit}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            variant="outlined"
            name="title"
            value={editTaskData.title}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            variant="outlined"
            name="description"
            value={editTaskData.description}
            onChange={handleEditChange}
            multiline
            rows={4}
          />
          <TextField
            margin="dense"
            label="Due Date"
            fullWidth
            variant="outlined"
            name="dueDate"
            type="date"
            value={editTaskData.dueDate}
            onChange={handleEditChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelEdit} color="secondary">
            Cancel
          </Button>
          <Button onClick={saveEditChanges} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Popup for Delete */}
      <Dialog open={showConfirm} onClose={cancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <p>⚠️ Are you sure you want to delete this task? This action cannot be undone.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirmDelete} color="primary">
            Yes, Delete
          </Button>
          <Button onClick={cancelDelete} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskCard;
