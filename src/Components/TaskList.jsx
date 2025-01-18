import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateStatus, deleteTask, updateTask } from "../redux/taskSlice";
import TaskModal from "./TaskModal";
import TaskFilterSort from "./TaskFilterSort";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const dispatch = useDispatch();
  const taskList = useSelector((state) => state.taskData);
  const [isTaskUpdating, setTaskUpdate] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("date");
  const navigate = useNavigate();

  const handleCheckboxChange = (id, status) => {
    const newStatus = status === "completed" ? "Incomplete" : "completed";
    dispatch(updateStatus({ id, status: newStatus }));
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleUpdate = (task) => {
    setCurrentTask(task);
    setTaskUpdate(true);
  };

  const handleSave = (updatedTask) => {
    dispatch(updateTask(updatedTask));
    setTaskUpdate(false);
    setCurrentTask(null);
  };

  const handleClose = () => {
    setTaskUpdate(false);
    setCurrentTask(null);
  };

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  const handleSortChange = (sortOption) => {
    setSort(sortOption);
  };

  const filteredTasks = taskList.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sort === "date") {
      return new Date(a.creationDate) - new Date(b.creationDate);
    } else if (sort === "priority") {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0;
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <TaskFilterSort
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />
      <div className="mt-6 space-y-4">
        {sortedTasks.map((task) => (
          <div
            key={task.id}
            className="border border-gray-300 p-4 rounded-lg bg-white shadow-md"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold truncate">{task.title}</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => navigate("/details", { state: { task } })}
                  className="text-[#1C4670] hover:underline"
                >
                  Get Details
                </button>
                <button
                  onClick={() => handleUpdate(task)}
                  className="text-yellow-500 hover:underline"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm">Priority: {task.priority}</p>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={task.status === "completed"}
                  onChange={() => handleCheckboxChange(task.id, task.status)}
                  className="form-checkbox h-4 w-4 text-indigo-600"
                />
                <span className="text-sm">Mark as completed</span>
              </label>
            </div>
            {isTaskUpdating && currentTask.id === task.id && (
              <TaskModal
                task={task}
                onClose={handleClose}
                onSave={handleSave}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
