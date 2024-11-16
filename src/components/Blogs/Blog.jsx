import React from 'react';
import './Blog.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap'; // Correct import for Button from React-Bootstrap

const Blog = () => {
  // Generate multiple icons dynamically
  const renderIcons = () => {
    const icons = [];
    for (let i = 0; i < 10; i++) {
      const size = Math.random() * 80 + 50; // Random size between 50px and 130px
      const top = Math.random() * 100; // Random position on Y-axis
      const left = Math.random() * 90; // Random position on X-axis
      const delay = Math.random() * 8; // Random animation delay

      icons.push(
        <div
          key={i}
          className="floating-icon"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
            animationDelay: `${delay}s`,
          }}
        ></div>
      );
    }
    return icons;
  };

  return (
    <div className="blog">
      {/* Multiple Background Icons */}
      <div className="icons-container">{renderIcons()}</div>

      <div className="Blog-content">
        <h1 className="blog-title">
          شاركنا خبراتك واهتماماتك وكن جزءًا من مجتمع واعي الخيري
        </h1>
        <p className="blog-description">
          انضم إلينا في رحلتنا لمشاركة الأفكار، وتقديم الإلهام، وإنشاء مدونة مميزة تلهم الجميع.
        </p>
        <div className="blog-tag">
          <Link to="/comunity">
            <Button className="button-blog" style={{backgroundColor:'#dc5151'}}>
              ابدأ الآن <i className="p-2"></i>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Blog;
