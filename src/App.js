import { Routes, Route } from "react-router-dom"

import GenerateBadge from "./pages/GenerateBadge";
import Badge from "./pages/Badge";


function App() {

  

  return (
    <div className="app">
      <Routes>
        <Route exact path='/' element={<GenerateBadge />} />
        <Route path='badge/:name/:email/:github' element={<Badge />} />
      </Routes>
    </div>
  );
}

export default App;
