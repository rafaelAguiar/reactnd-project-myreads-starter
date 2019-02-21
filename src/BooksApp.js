import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI';
import ShelfBook from './ShelfBook';
import SearchBook from './SearchBook';
import {Route, Link} from 'react-router-dom';
import './App.css';

class BooksApp extends Component {
  
  componentWillMount() {
    this.listBooksByShelf()
  }

  onRefresh = () => {
    this.listBooksByShelf()
  }

  onChangeShelfBook = (bookID, shelf) => {
    let book = this.state.books.filter((book)=>{
      return book.id===bookID
    })

    BooksAPI.update(book[0], shelf).then((booksByShelf)=>{
      this.updateBooksByShelf(booksByShelf)
    });
  }

  listBooksByShelf() {
    BooksAPI.getAll().then((books) => {
        this.setState(()=>({books}))
        this.putOnBooksInShelf()
    });
  }

  updateBooksByShelf(booksByShelf) {   
    Object.keys(booksByShelf).forEach(shelf=>{
      booksByShelf[shelf] = booksByShelf[shelf].map(bookID=>{
        let book = this.state.books.filter(book=>{
          return book.id === bookID
        })[0]

        book.shelf = shelf
        return book
      })
    })
    this.setState({booksByShelf})
  }

  putOnBooksInShelf() {
    let booksByShelf = {}
    this.state.books.forEach(book=>{
      if (booksByShelf[book.shelf]) 
        booksByShelf[book.shelf].push(book)
      else
        booksByShelf[book.shelf] = [book]
    })

    this.setState({booksByShelf})
  }

  state = {
    books: [],
    booksByShelf: {'currentlyReading':[], 'wantToRead':[], 'read':[]}
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={()=>(
          <SearchBook onRefresh={this.onRefresh} booksOnShelf={this.state.books}/>
        )}/>
          
        <Route exact path='/' render={()=>(
          <div className="list-books">
            <ShelfBook 
              shelfs={Object.keys(this.state.booksByShelf)} 
              booksByShelf={this.state.booksByShelf} 
              onChangeShelfBook={this.onChangeShelfBook}/>
            <div className="open-search">
              <Link to='/search'>
                  <button>Add a book</button>
              </Link>
            </div>
          </div>
          )}/>
      </div>
    )
  }
}

export default BooksApp
