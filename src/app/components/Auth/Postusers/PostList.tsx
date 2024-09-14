'use client';

import { useEffect, useState } from 'react';
import { Post } from '@/src/app/Interface/post';
import { createPost, deletePost, getPosts, updatePost } from '@/src/Home/posts';

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState({ title: '', description: '', userId: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [editPost, setEditPost] = useState({ title: '', description: '' });


  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { posts } = await getPosts();
      setPosts(posts);
      setError(null);
    } catch (error) {
      setError('Error al obtener las publicaciones');
    } finally {
      setLoading(false);
    }
  };


  const handleCreatePost = async () => {
    try {
      const post = await createPost(newPost.title, newPost.description, newPost.userId);
      setPosts([...posts, post]);
      setNewPost({ title: '', description: '', userId: 1 });
    } catch (error) {
      setError('Error al crear el post');
    }
  };


  const handleUpdatePost = async () => {
    if (selectedPostId === null) return;

    try {
      const updatedPost = await updatePost(selectedPostId, editPost.title, editPost.description, 1);
      setPosts(posts.map((post) => (post.id === selectedPostId ? updatedPost : post)));
      setSelectedPostId(null);
      setEditPost({ title: '', description: '' });
    } catch (error) {
      setError('Error al actualizar el post');
    }
  };

 
  const handleDeletePost = async (id: number) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      setError('Error al eliminar el post');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const startEditing = (post: Post) => {
    setSelectedPostId(post.id);
    setEditPost({ title: post.title, description: post.description });
  };

  return (
    <div>
      <h1>Posts</h1>
      {loading && <p>Cargando posts...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newPost.description}
          onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
        />
        <button onClick={handleCreatePost}>Create Post</button>
      </div>

      {selectedPostId !== null && (
        <div>
          <h2>Edit Post</h2>
          <input
            type="text"
            placeholder="Title"
            value={editPost.title}
            onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={editPost.description}
            onChange={(e) => setEditPost({ ...editPost, description: e.target.value })}
          />
          <button onClick={handleUpdatePost}>Update Post</button>
        </div>
      )}

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <button onClick={() => startEditing(post)}>Edit</button>
            <button onClick={() => handleDeletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
