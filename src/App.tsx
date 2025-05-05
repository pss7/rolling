import { Routes, Route } from 'react-router-dom';
import Component from './pages/test/Component';

function App() {
  return (
    <>
      <Routes>
        <Route path="/test-component" element={<Component />} />
      </Routes>
    </>
  )
}

export default App
