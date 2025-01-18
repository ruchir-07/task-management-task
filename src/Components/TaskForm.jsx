import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";

const TaskForm = () => {
  const dispatch = useDispatch();

  const [task, setTask] = useState({
    title: "",
    detail: "",
    priority: "High",
    status: "Incomplete",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = {
      ...task,
      id: Date.now(),
    };
    dispatch(addTask(payload));
    setTask({
      title: "",
      detail: "",
      priority: "High",
      status: "Incomplete",
    });
  };

  return (
    <form
      className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg bg-white shadow-md"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Task</h2>
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="detail"
          className="block text-sm font-medium text-gray-700"
        >
          Detail
        </label>
        <textarea
          id="detail"
          name="detail"
          value={task.detail}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="priority"
          className="block text-sm font-medium text-gray-700"
        >
          Priority
        </label>
        <select
          id="priority"
          name="priority"
          value={task.priority}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-[#FFA229] text-white font-semibold rounded-md shadow-sm hover:bg-[#e68b13] focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
