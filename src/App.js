import Multiplication from "./components/Multiplication";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Multiplication />} path="/" />
        </Routes>
      </Router>
    </>
  );
}

export default App;
