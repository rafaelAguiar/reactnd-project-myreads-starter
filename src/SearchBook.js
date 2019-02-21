import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types'

class SearchBook extends Component {

  state = {
    books: []
  }

  componentWillUnmount() {
    this.props.onRefresh()
  }

  onSearchBooks = (query) => {
    if (this.find) {
      clearTimeout(this.find);
    }

    if (query) {
      this.find = setTimeout(() => {
        BooksAPI.search(query).then((books)=>{
          if (books.error) {
            this.setState({books: []})    
            
          } else {
            let newbooks = books.map((book)=>{
              let bookOnShelf = this.props.booksOnShelf.filter((booksOnShelf)=>{
                return booksOnShelf.id===book.id
              })[0]

              if (bookOnShelf)
                return {...book, shelf:bookOnShelf.shelf}
              else 
                return {...book}
            })
            this.setState({books: newbooks})
          }
        })
      },1000)
      
    } else {
      this.setState({books: []})
    }
  }

  onChangeShelfBook = (bookID, shelf) => {
    let book = this.state.books.filter((book)=>{
      return book.id===bookID
    })

    BooksAPI.update(book[0], shelf).then((booksByShelf)=>{
      let newbooks = this.state.books.map(book => {
        if (book.id === bookID) {
          return {...book, shelf:shelf}
        } else {
          return {...book}
        }
      })

      this.setState({books: newbooks})
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
            {this.state.books.length > 0 ? this.state.books.map((book)=>(
              <li key={book.id}>
                <Book id={book.id} 
                    key={book.id}
                    shelf={book.shelf}
                    title={book.title} 
                    authors={book.authors}
                    image={book.imageLinks ? book.imageLinks.thumbnail : ''}
                    isScreenShelf={false}
                    onChangeShelf={this.onChangeShelfBook}/>
              </li>
            )) : (<p>No books to show.</p>)}
          </ol>
        </div>
      </div>
    )
  }
}

SearchBook.propTypes = {
  onRefresh: PropTypes.func.isRequired,
  booksOnShelf: PropTypes.array.isRequired
}

export default SearchBook