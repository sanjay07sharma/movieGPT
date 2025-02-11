import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";

const Body = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Router>
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/browse" element={<Browse />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default Body;
