import React, { useState } from 'react';
// import './UpdatePostModal.css'; // Create a CSS file for styling if needed

const UpdatePostModal = ({ post, onUpdate, onClose }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [image, setImage] = useState(post.image);
  const [imagePreview, setImagePreview] = useState(post.image); // For displaying the current image

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...post, title, content, image });
    onClose(); // Close the modal after update
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Save the file for uploading later
      setImagePreview(URL.createObjectURL(file)); // Update the preview
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="العنوان"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="اكتب ماذا تفكر"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="file"
              className="form-control"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="img-preview" />
            )}
          </div>
          <button type="submit" className="btn btn-publisher">تحديث</button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePostModal;
