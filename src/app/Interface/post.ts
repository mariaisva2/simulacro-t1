export interface Post {
    id: number;
    title: string;
    description: string;
    user_id: number;
  }
  
  export interface PostsResponse {
    message: string;
    posts: Post[];
  }
  