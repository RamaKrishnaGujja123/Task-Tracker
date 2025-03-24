import React from "react";
import TaskItem from "./TaskItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../styles/TaskList.css";

const TaskList = ({ tasks, editTask, updateTaskStatus, deleteTask }) => {
  const updateTaskOrder = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(source.index, 1);
    reorderedTasks.splice(destination.index, 0, movedTask);
    editTask(reorderedTasks);
  };

  return (
    <DragDropContext onDragEnd={updateTaskOrder}>
      <Droppable droppableId="task-list">
        {(provided) => (
          <ul className="task-list" ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                {(provided) => (
                  <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <TaskItem
                      task={task}
                      editTask={editTask}
                      updateTaskStatus={updateTaskStatus}
                      deleteTask={deleteTask}
                    />
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;