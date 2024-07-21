import PostCard from './PostCard';
import PostPublisher from './PostPublish';
import React, { useState } from 'react';



const PostList = () => {

    const [posts, setPosts] = useState([
        { id: 1, title: 'Post 1', content: 'اول بوست ' },
        { id: 2, title: 'Post 2', content: 'تانى بوست' },
        { id: 3, title: 'Post 3', content: 'تالت بوست' }
      ]);

    const addPost = (post) => {
        setPosts([{ id: posts.length + 1, ...post }, ...posts]);
      };
  return (
    <div className="post-list">
    <PostPublisher addPost={addPost} />
    {posts.map(post => (
      <PostCard key={post.id} post={post} />
    ))}
  </div>
  )
}

export default PostList
