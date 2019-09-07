import React from 'react'

const BlogForm = ({
    addBlog,
    newTitle,
    handleTitleChange,
    newAuthor,
    handleAuthorChange,
    newUrl,
    handleUrlChange
}) => (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
        title:
        <input
          value={newTitle}
          onChange={handleTitleChange}
        />
        </div>
        <div>
        author:
        <input
          value={newAuthor}
          onChange={handleAuthorChange}
        />
        </div>
        <div>
        url:
        <input
          value={newUrl}
          onChange={handleUrlChange}
        />
        </div>
        <button type="submit">create</button>
      </form>  
    </div>
  )

export default BlogForm