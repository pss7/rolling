import { Routes, Route } from 'react-router-dom';
import Component from './pages/test/Component';
import Home from './pages/test/Home';
import ListPage from './pages/ListPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/test-component" element={<Component />} />
      </Routes>
    </>
  )
}

export default App
