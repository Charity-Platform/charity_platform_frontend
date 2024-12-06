import React from 'react';
import video from '../../assets/blog.mp4';
import './Blog.css';

const Blog_video = () => {
  return (
    <div className="video-blog">
      <video autoPlay muted loop id="video-background">
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content-overlay">
        <h1 className="overlay-title">مرحبًا بكم في أكبر مجمع توظيفي</h1>
        <p className="overlay-description">ابنِ مهاراتك وانطلق للحصول على وظيفتك</p>
      </div>
    </div>
  );
};

export default Blog_video;
