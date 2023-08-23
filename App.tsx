import "./App.css";
import ListPage from "./component/ListPage";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MovieDetailsPage from "./component/MovieDetailsPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/details/:id" element={<MovieDetailsPage />} />{" "}
        {/* Use the imported component */}
      </Routes>
    </Router>
  );
}

export default App;
