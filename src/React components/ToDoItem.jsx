import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ToDoItem() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the backend
  useEffect(() => {
    axios.get('http://3.135.233.41:8000/api/tasks/')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the tasks!', error);
      });
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (task) {
      axios.post('http://3.135.233.41:8000/api/tasks/', { title: task, completed: false })
        .then(response => {
          setTasks([...tasks, response.data]);
          setTask('');
        })
        .catch(error => {
          console.error('There was an error adding the task!', error);
        });
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (index) => {
    const newTasks = [...tasks];
    const task = newTasks[index];
    task.completed = !task.completed;

    // Update the task in the backend
    axios.put(`http://3.135.233.41:8000/api/tasks/${task.id}/`, task)
      .then(response => {
        setTasks(newTasks);
      })
      .catch(error => {
        console.error('There was an error updating the task!', error);
      });
  };

  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div>
      <nav className="flex justify-center">
        <h4 className="text-4xl text-center">Roulettech Inc. To-Do List</h4>
      </nav>

      <div className="container mx-auto p-4">
        <form className="mb-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2 w-full">
            Add Task
          </button>
          <h1 className="text-2xl font-bold mb-4 mt-3">My To-Do List</h1>
        </form>
        <ul className="list-disc list-inside">
          {tasks.map((task, index) => (
            <li key={index} className="mb-1 flex items-center">
              <input
                type="checkbox"
                id={`task-${index}`}
                className="mr-2"
                checked={task.completed}
                onChange={() => handleCheckboxChange(index)}
              />
              <label htmlFor={`task-${index}`}>{task.title}</label>
            </li>
          ))}
        </ul>

        <div>
          <div className="container mx-auto p-1">
            <h1 className="text-2xl font-bold mb-4">Completed Tasks</h1>
            <ul className="list-disc list-inside">
              {completedTasks.map((task, index) => (
                <li key={index} className="mb-1">
                  {task.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}






