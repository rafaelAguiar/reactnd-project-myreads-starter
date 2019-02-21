import React from 'react';
import PropTypes from 'prop-types'

const Book = props => {
  const {id, title, authors, image, shelf, onChangeShelf, isScreenShelf} = props
  
  return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" 
                style={{ width: 128, height: 193, 
                backgroundImage: `url(${image})` }}>
          </div>
          <div className="book-shelf-changer">
            <select defaultValue={shelf || "none"} onChange={(e)=>{onChangeShelf(id, e.target.value)}}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead" >Want to Read</option>
              <option value="read">Read</option>
              {isScreenShelf && (<option value="none">None</option>)}
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        {authors ? authors.map((author, index)=>(
          <div className="book-authors" key={index}>{author}</div>
        )) : ''}
      </div>
  );
}

Book.propTypes = {
  title: PropTypes.string.isRequired,
  authors: PropTypes.array,
  image: PropTypes.any
}

export default Book