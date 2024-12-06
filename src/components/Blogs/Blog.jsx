import React from 'react';
import './Blog.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap'; 

const Blog = () => {
  // Generate multiple icons dynamically
  const renderIcons = () => {
    const icons = [];
    for (let i = 0; i < 10; i++) {
      const size = Math.random() * 80 + 50; 
      const top = Math.random() * 100;
      const left = Math.random() * 90; 
      const delay = Math.random() * 8;

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
      <div className="icons-container">{renderIcons()}</div>

      <div className="Blog-content">
        <h1 className="blog-title">
        اكتشف أفضل الفرص الوظيفية وكن جزءًا من مسيرة نجاحنا
        </h1>
        <p className="blog-description">
        انضم إلى منصتنا اليوم لتصفح أفضل الوظائف المتاحة وابدأ في بناء مستقبلك المهني معنا.
        </p>
        <div className="blog-tag">
          <Link to="/comunity">
            <Button className="button-blog" style={{backgroundColor:'#dc5151'}}>
            استعرض الوظائف المتاحة <i className="p-2"></i>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Blog;
