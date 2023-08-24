import "./App.css";
import ListPage from "./component/ListPage";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MovieDetailsPage from "./component/MovieDetailsPage";
import ErrorBoundary from "./ErrorBoundary"; // Import the ErrorBoundary component
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ErrorBoundary><ListPage /></ErrorBoundary>} />
        <Route path="/details/:id" element={<ErrorBoundary><MovieDetailsPage /></ErrorBoundary>} />
      </Routes>
    </Router>
  );
}

export default App;
