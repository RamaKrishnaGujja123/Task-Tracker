import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../styles/AddTaskForm.css';

const AddTaskForm = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [priority, setPriority] = useState("Low");
  const [reminderTime, setReminderTime] = useState(10); // minutes before due date

  const handleSubmit = (e) => {
    setReminderTime(e.target.value);
    e.preventDefault();
    addTask({ title, description, dueDate, priority, reminderTime });
    setTitle("");
    setDescription("");
    setDueDate(null);
    setPriority("Low");
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <h2>Add New Task</h2>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <DatePicker 
        selected={dueDate} 
        onChange={setDueDate} 
        placeholderText="Select Due Date"
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskForm;