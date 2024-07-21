import React from 'react';
import './Blog.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Blog = () => {
  return (
    <div className="blog">
      <div className="Blog-content">
        <h1 className="blog-title">
        يمكنك مشاركة اهتماماتك على طريقتك
        {" "}
        </h1>

        <div className="blog-tag">
            <Link to='/FormBlog'>
            <Button className='button-hero'>إنشاء مدونتك <i className='p-2'>{}</i></Button>
            </Link>
       

        </div>
      </div>
      <div className="blog-books"></div>
    </div>
  );
}

export default Blog
