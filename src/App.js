import React, { useState } from 'react';
import './styles/App.css';
import Header from './components/Header';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import TaskFilters from './components/TaskFilters';
import SearchBar from './components/SearchBar';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ status: 'all' });
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: uuidv4() }]);
  };

  const updateTaskStatus = (id, status) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, status } : task))
    );
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
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filters.status === 'all') return true;
    return task.status === filters.status;
  }).filter((task) => {
    return task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           task.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className={`App ${isDarkMode ? 'dark' : ''}`}>
      <Header />
      <button onClick={toggleDarkMode}>
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
      <SearchBar searchTasks={searchTasks} />
      <AddTaskForm addTask={addTask} />
      <TaskFilters setFilters={setFilters} />
      <TaskList
        tasks={filteredTasks}
        editTask={editTask}
        updateTaskStatus={updateTaskStatus}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default App;