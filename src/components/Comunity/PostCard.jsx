import React from 'react'

const PostCard = ({ post }) => {
  return (
    <div className="card mb-3 card">
    <div className="card-body">
      <h5 className="card-title">{post.title}</h5>
      <p className="card-text">{post.content}</p>
      {post.image && <img src={post.image} alt="Post" className="img-fluid" />}
    </div>
  </div>
  )
}

export default PostCard
