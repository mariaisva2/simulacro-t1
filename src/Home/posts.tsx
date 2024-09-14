'use client'
import { Post, PostsResponse } from '../app/Interface/post';


const API_URL = 'https://simuate-test-backend-1.onrender.com/api/posts';

export const getPosts = async (): Promise<PostsResponse> => {
  const response = await fetch(API_URL);
  const data: PostsResponse = await response.json();
  return data;
};

export const createPost = async (title: string, description: string, userId: number): Promise<Post> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, description, user_id: userId }),
  });
  const data: Post = await response.json();
  return data;
};

export const updatePost = async (id: number, title: string, description: string, userId: number): Promise<Post> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, description, user_id: userId }),
  });
  const data: Post = await response.json();
  return data;
};

export const deletePost = async (id: number): Promise<void> => {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
};
