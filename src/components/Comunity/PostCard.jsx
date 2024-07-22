import React from 'react'

const PostCard = ({ post }) => {
  return (
    <div className="card mb-3 card-comunity">
    <div className="card-body">
      <h5 className="card-comunity-title">{post.title}</h5>
      <p className="card-comunity-text">{post.content}</p>
      {post.image && <img src={post.image} alt="Post" className="img-fluid" />}
    </div>
  </div>
  )
}

export default PostCard
