import React, { Suspense, lazy, useState } from 'react';
import './styles/App.css';
import Header from './components/Header';
import AddTaskForm from './components/AddTaskForm';
import TaskFilters from './components/TaskFilters';
import SearchBar from './components/SearchBar';
import CompletedTasks from './components/CompletedTasks';
import exportToCSV from './components/exportTasks';
import exportToPDF from './components/exportToPDF';
import { v4 as uuidv4 } from 'uuid';

const TaskList = lazy(() => import('./components/TaskList'));

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [filters, setFilters] = useState({ status: 'all' });
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: uuidv4() }]);
  };

  const updateTaskStatus = (id, status) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, status } : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const searchTasks = (query) => {
    setSearchQuery(query);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', isDarkMode);
  };

  const editTask = (id, updatedTask) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)));
  };

  const archiveTask = (taskId) => {
    const taskToArchive = tasks.find((task) => task.id === taskId);
    setCompletedTasks((prev) => [...prev, taskToArchive]);
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const recoverTask = (taskId) => {
    const taskToRecover = completedTasks.find((task) => task.id === taskId);
    setTasks((prev) => [...prev, taskToRecover]);
    setCompletedTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const filteredTasks = tasks
    .filter((task) => (filters.status === 'all' ? true : task.status === filters.status))
    .filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()) || task.description.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className={`App ${isDarkMode ? 'dark' : ''}`}>
      <Header />
      <button onClick={toggleDarkMode}>{isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</button>
      <SearchBar searchTasks={searchTasks} />
      <AddTaskForm addTask={addTask} />
      <TaskFilters setFilters={setFilters} />
      <button onClick={() => exportToCSV(tasks)}>Export to CSV</button>
      <button onClick={() => exportToPDF(tasks)}>Export to PDF</button>
      <Suspense fallback={<div>Loading...</div>}>
        <TaskList tasks={filteredTasks} editTask={editTask} updateTaskStatus={updateTaskStatus} deleteTask={deleteTask} onArchive={archiveTask} onRecover={recoverTask} />
      </Suspense>
      <CompletedTasks tasks={completedTasks} onRecover={recoverTask} />
    </div>
  );
};

export default App;
