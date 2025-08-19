import { Routes, Route } from 'react-router-dom';
import Component from './pages/test/Component';
import ListPage from './pages/ListPage';
import MessageListPage from './pages/MessageListPage';
import CreatePage from './pages/CreatePage';
import MessageCreatePage from './pages/MessageCreatePage';
import { useEffect, useState } from 'react';
import FullScreenLoading from './components/ui/FullScreenLoading';
import Home from './pages/Home';

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    setTimeout(() => setLoading(false), 3000);

  }, [])

  if (loading) {
    return (
      <>
        <FullScreenLoading color="var(--primary)" />
      </>
    )
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/message-list/:id" element={<MessageListPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/message-create/:id" element={<MessageCreatePage />} />
        <Route path="/test-component" element={<Component />} />
      </Routes>
    </>
  )
}

export default App
