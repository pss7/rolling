import { Routes, Route } from 'react-router-dom';
import Component from './pages/test/Component';
import Home from './pages/test/Home';
import ListPage from './pages/ListPage';
import MessagePage from './pages/MessagePage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/message/:id" element={<MessagePage />} />
        <Route path="/test-component" element={<Component />} />
      </Routes>
    </>
  )
}

export default App
