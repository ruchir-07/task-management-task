import { useLocation } from "react-router-dom";

const TaskDetails = () => {
  const location = useLocation();
  const { task } = location.state;

  return (
    <div className="max-w-4xl mt-5 mx-auto p-8 bg-white rounded-lg shadow-lg border border-gray-200">
      <h1 className="text-3xl text-center font-bold mb-6 text-primary">
        Task Details
      </h1>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Title</h2>
        <p className="text-gray-600 bg-gray-100 p-4 rounded-md shadow-sm">
          {task.title}
        </p>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Detail</h2>
        <p className="text-gray-600 bg-gray-100 p-4 rounded-md shadow-sm">
          {task.detail}
        </p>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Priority</h2>
        <p
          className={`text-gray-600 p-4 rounded-md shadow-sm ${
            task.priority === "High"
              ? "bg-red-100 text-red-600"
              : task.priority === "Medium"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {task.priority}
        </p>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Status</h2>
        <p
          className={`text-gray-600 p-4 rounded-md shadow-sm ${
            task.status === "Completed"
              ? "bg-green-100 text-green-600"
              : "bg-gray-100"
          }`}
        >
          {task.status}
        </p>
      </div>
    </div>
  );
};

export default TaskDetails;
