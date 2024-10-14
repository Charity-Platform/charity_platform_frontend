import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons
import './Comunity.css';

const PostCard = ({ post, onEdit, onDelete }) => {
  return (
    <div className="card mb-3 card-comunity">
      <div className="card-body">
        <h5 className="card-comunity-title">{post.title}</h5>
        <p className="card-comunity-text">{post.content}</p>
        {post.image && <img src={post.image} alt="Post" className="img-fluid" />}
        <div className="icons">
          <FaEdit 
            onClick={() => {
              console.log("Edit icon clicked", post);
              onEdit(post);
            }} 
            style={{ cursor: 'pointer', marginRight: '10px' }} 
          />
          <FaTrash 
            onClick={() => {
              console.log("Delete icon clicked", post._id); // Use post._id instead of post.id
              onDelete(post._id); // Use post._id instead of post.id
            }} 
            style={{ cursor: 'pointer', color: 'red' }} 
          />
        </div>
      </div>
    </div>
  );
}

export default PostCard;
