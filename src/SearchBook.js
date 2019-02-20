import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

class SearchBook extends Component {

  state = {
    books: []
  }

  onSearchBooks = (query) => {
    if (query) {
      BooksAPI.search(query).then((books)=>{
        if (books.error) {
          this.setState({books: []})    
        } else {
          this.setState({books})
        }
      })
    } else {
      this.setState({books: []})
    }
    
  }

  onChangeShelfBook = (bookID, shelf) => {
    let book = this.state.books.filter((book)=>{
      return book.id===bookID
    })

    BooksAPI.update(book[0], shelf).then((books)=>{
      console.log(books)
    });
  }

  render() {
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/'>
              <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
              <input 
                type="text" 
                placeholder="Search by title or author" 
                onChange={(e)=>{this.onSearchBooks(e.target.value)}}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map((book)=>(
              <li key={book.id}>
                <Book id={book.id} 
                    key={book.id}
                    shelf={book.shelf}
                    title={book.title} 
                    authors={book.authors}
                    image={book.imageLinks ? book.imageLinks.thumbnail : ''}
                    onChangeShelf={this.onChangeShelfBook}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBook