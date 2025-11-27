import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from './store/postsSlice';
import PostForm from './components/PostForm/PostForm';
import PostFilter from './components/PostFilter/PostFilter';
import PostList from './components/PostList/PostList';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { initialized } = useSelector((state) => state.posts);

  // Cargar posts solo una vez al montar el componente
  useEffect(() => {
    if (!initialized) {
      dispatch(fetchPosts());
    }
  }, [dispatch, initialized]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Gestión de Posts</h1>
      </header>
      <main className="app-main">
        <div className="app-container">
          <PostForm />
          <PostFilter />
          <PostList />
        </div>
      </main>
    </div>
  );
}

export default App;

