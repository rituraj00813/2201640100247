import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shortener from './pages/Shortener';
import Stats from './pages/Stats';
import Redirector from './redirector/Redirector';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Shortener />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/r/:code" element={<Redirector />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
