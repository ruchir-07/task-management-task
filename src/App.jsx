import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import TaskDetails from "./Pages/TaskDetails";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<TaskDetails />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
