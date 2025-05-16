import { Routes, Route } from 'react-router-dom';
import Component from './pages/test/Component';
import Home from './pages/test/Home';
import ListPage from './pages/ListPage';
import MessageListPage from './pages/MessageListPage';
import CreatePage from './pages/createPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/message-list/:id" element={<MessageListPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/test-component" element={<Component />} />
      </Routes>
    </>
  )
}

export default App
