import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from './PostCard';
import PostPublisher from './PostPublish';
import UpdatePostModal from './UpdatePostModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch all posts from the server
  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}posts`);
      setPosts(Array.isArray(response.data.document) ? response.data.document : []);
    } catch (err) {
      setError('Error fetching posts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Add a new post
  const addPost = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_MAIN_URL}posts`,
        formData,
        { 
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );

      // Check if the response contains the expected 'id'
      if (response.data && response.data.id) {
        const newPost = {
          id: response.data.id,
          title: formData.get('title'),
          content: formData.get('content'),
          image: response.data.image || null
        };

        // Update posts state to include the new post
        setPosts((prevPosts) => [newPost, ...prevPosts]);

        // Show success toast notification
        toast.success("Post published successfully!");

      } else {
        console.error("No ID returned from the server. Full response:", response.data);
      }
    } catch (err) {
      console.error('Error adding post:', err.response ? err.response.data : err.message);
      toast.error("Error publishing post!");
    }
  };

  // Function to handle editing a post
  const handleEdit = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const handleUpdate = async (updatedPost) => {
    try {
      await axios.put(`${import.meta.env.VITE_MAIN_URL}posts/${updatedPost.id}`, updatedPost);
      setPosts(posts.map(post => (post.id === updatedPost.id ? updatedPost : post)));
      setShowModal(false);
      setSelectedPost(null);
    } catch (err) {
      console.error('Error updating post:', err);
    }
  };

  // Function to handle post deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_MAIN_URL}posts/${id}`, { withCredentials: true });
      setPosts(posts.filter(post => post._id !== id)); // Update state based on the correct ID property
      console.log("Post deleted successfully");
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  return (
    <div className="post-list">
      <PostPublisher addPost={addPost} />
      {loading && <p>Loading posts...</p>}
      {error && <p>{error}</p>}
      {posts.map(post => (
        <PostCard 
          key={post.id} 
          post={post} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      ))}
      {showModal && (
        <UpdatePostModal 
          post={selectedPost} 
          onUpdate={handleUpdate} 
          onClose={() => setShowModal(false)} 
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default PostList;
