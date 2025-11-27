import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postsApi } from '../services/api';

// Async thunk para obtener posts
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const data = await postsApi.getPosts();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk para crear un post
export const createPost = createAsyncThunk(
  'posts/createPost',
  async (post, { rejectWithValue }) => {
    try {
      const data = await postsApi.createPost(post);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk para eliminar un post
export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId, { rejectWithValue }) => {
    try {
      const data = await postsApi.deletePost(postId);
      return { postId, data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Función auxiliar para filtrar posts por nombre de forma segura
const filterPostsByName = (posts, filterText) => {
  if (!filterText) return posts;
  const filterLower = filterText.toLowerCase();
  return posts.filter((post) => {
    const postName = post?.name;
    return postName && typeof postName === 'string' && postName.toLowerCase().includes(filterLower);
  });
};

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    filteredItems: [],
    filterText: '',
    loading: false,
    error: null,
    initialized: false,
  },
  reducers: {
    setFilterText: (state, action) => {
      state.filterText = action.payload;
      state.filteredItems = filterPostsByName(state.items, action.payload);
    },
    clearFilter: (state) => {
      state.filterText = '';
      state.filteredItems = state.items;
    },
  },
  extraReducers: (builder) => {
    // Fetch posts
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        // Manejar diferentes formatos de respuesta (array directo o objeto con propiedad)
        const posts = Array.isArray(action.payload) 
          ? action.payload 
          : action.payload?.posts || action.payload?.data || [];
        state.items = posts;
        // Aplicar filtro actual si existe
        state.filteredItems = filterPostsByName(posts, state.filterText);
        state.initialized = true;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.initialized = true;
      });

    // Create post
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
        // Aplicar filtro actual si existe
        state.filteredItems = filterPostsByName(state.items, state.filterText);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete post
    builder
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((post) => post.id !== action.payload.postId);
        // Aplicar filtro actual si existe
        state.filteredItems = filterPostsByName(state.items, state.filterText);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilterText, clearFilter } = postsSlice.actions;
export default postsSlice.reducer;

