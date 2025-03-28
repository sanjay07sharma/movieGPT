import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import MovieInfo from "./MovieInfo";

const Body = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Router>
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/:movieName" element={<MovieInfo />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default Body;
