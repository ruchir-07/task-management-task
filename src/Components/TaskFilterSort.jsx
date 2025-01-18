import PropTypes from "prop-types";

const TaskFilterSort = ({ onFilterChange, onSortChange }) => {
  const handleFilterChange = (e) => {
    onFilterChange(e.target.value);
  };

  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="flex mb-4">
      <div className=" mx-2 ">
        <label className="block text-sm font-medium text-gray-700">
          Filter by:
        </label>
        <select
          onChange={handleFilterChange}
          className="mt-1 block  px-1 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1C4670] focus:border-indigo-500 text-sm"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="Incomplete">Incomplete</option>
        </select>
      </div>
      <div className="mx-2">
        <label className="block text-sm font-medium text-gray-700">
          Sort by:
        </label>
        <select
          onChange={handleSortChange}
          className="mt-1  w-full px-1 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        >
          <option value="date">Creation Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>
    </div>
  );
};

TaskFilterSort.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

export default TaskFilterSort;
