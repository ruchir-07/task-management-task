import TaskForm from "../Components/TaskForm";
import TaskList from "../Components/TaskList";
import { useSelector } from "react-redux";

const Home = () => {
  const tasks = useSelector((state) => state.taskData);

  return (
    <div className=" mt-5">
      <div>
        <TaskForm />
      </div>

      <div className="mt-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Task List
        </h1>
        {tasks.length > 0 ? (
          <div>
            <TaskList />
          </div>
        ) : (
          <p className="text-center  text-gray-500 text-xl mt-6">
            No tasks found
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
