import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const ShelfBook = props => {
  const {booksByShelf, shelfs, onChangeShelfBook} = props

  return(
    <div>
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        
        {shelfs.map((shelf)=>(
          <div key={shelf}>
            <div className="bookshelf">
              <h2 className="bookshelf-title">{shelf}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {booksByShelf[shelf].length > 0 ? 
                    booksByShelf[shelf].map((book)=>(
                      <li key={book.id}>
                        <Book id={book.id} 
                            key={book.id}
                            isScreenShelf={true}
                            shelf={book.shelf}
                            title={book.title} 
                            authors={book.authors}
                            image={book.imageLinks ? book.imageLinks.thumbnail : ''}
                            onChangeShelf={onChangeShelfBook}/>
                      </li> )) : (<p>No books to show.</p>)}
                </ol>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

ShelfBook.propTypes = {
  shelfs: PropTypes.array.isRequired,
  booksByShelf: PropTypes.object.isRequired,
  onChangeShelfBook: PropTypes.func.isRequired
}

export default ShelfBook