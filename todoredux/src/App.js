import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Todo from "./component/todo";
import Login from "./component/login";
import Signup from "./component/signup";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
