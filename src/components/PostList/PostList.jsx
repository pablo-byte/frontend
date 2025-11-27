import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../store/postsSlice';
import './PostList.css';

const PostList = () => {
  const dispatch = useDispatch();
  const { filteredItems, loading, error } = useSelector((state) => state.posts);

  const handleDelete = async (postId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este post?')) {
      try {
        await dispatch(deletePost(postId)).unwrap();
      } catch (error) {
        console.error('Error al eliminar el post:', error);
        alert('Error al eliminar el post. Por favor, intenta de nuevo.');
      }
    }
  };

  if (loading && filteredItems.length === 0) {
    return (
      <div className="post-list-container">
        <div className="loading">Cargando posts...</div>
      </div>
    );
  }

  if (error && filteredItems.length === 0) {
    return (
      <div className="post-list-container">
        <div className="error-message">
          Error al cargar los posts: {error.message || 'Error desconocido'}
        </div>
      </div>
    );
  }

  if (filteredItems.length === 0) {
    return (
      <div className="post-list-container">
        <div className="empty-state">
          No hay posts para mostrar. Crea tu primer post arriba.
        </div>
      </div>
    );
  }

  return (
    <div className="post-list-container">
      <h2>Lista de Posts ({filteredItems.length})</h2>
      <div className="posts-grid">
        {filteredItems.map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <h3 className="post-name">{post.name}</h3>
              <button
                className="delete-button"
                onClick={() => handleDelete(post.id)}
                disabled={loading}
                aria-label="Eliminar post"
              >
                ×
              </button>
            </div>
            <p className="post-description">{post.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;

