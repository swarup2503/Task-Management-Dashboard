import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import TaskDetails from './pages/TaskDetails';

const AppRouter = () => (
  <Router>
    <Routes>
      {/* Default route: Redirect "/" to "/tasks" */}
      <Route path="/" element={<Navigate to="/tasks" />} />
      <Route path="/tasks" element={<Dashboard />} />
      {/* <Route path="/tasks/:id" element={<TaskDetails />} /> */}
    </Routes>
  </Router>
);

export default AppRouter;
