import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddBookModal from "./AddBookModal";

const Books = () => {
  const [searchCriteria, setSearchCriteria] = useState("Book Name");
  const [isSeached, setIsSearched] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:7279/api/Books").then((res) => {
      const books = res.data;
      setBooks(books);
    });
  }, []);

  const handleBookNameChangeCriteria = () => {
    setSearchCriteria("Book Name");
  };

  const handleAuthorNameChangeCriteria = () => {
    setSearchCriteria("Author Name");
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleBookSearchClick = () => {
    setIsSearched(true);
    if (searchCriteria === "Book Name") {
      axios
        .get(`https://localhost:7279/api/Books/Search/Book-Name/${searchQuery}`)
        .then(
          (res) => {
            const books = res.data;
            setSearchResult(books);
          },
          (e) => {
            if (e.response.status === 404) {
              setSearchResult([]);
            }
          }
        );
    } else if (searchCriteria === "Author Name") {
      axios
        .get(
          `https://localhost:7279/api/Books/Search/Author-Name/${searchQuery}`
        )
        .then(
          (res) => {
            const books = res.data;
            setSearchResult(books);
          },
          (e) => {
            if (e.response.status === 404) {
              setSearchResult([]);
            }
          }
        );
    }
  };

  const handleCloseSearchClick = () => {
    setSearchCriteria("Book Name");
    setSearchQuery("");
    setSearchResult([]);
    setIsSearched(false);
  };

  return (
    <>
      <div className="input-group">
        <input
          type="search"
          className="form-control"
          placeholder="Search Book"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
        <button
          className="btn btn-outline-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {searchCriteria}
        </button>
        <ul className="dropdown-menu">
          <li>
            <button
              className="dropdown-item"
              onClick={handleBookNameChangeCriteria}
            >
              Book Name
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={handleAuthorNameChangeCriteria}
            >
              Author Name
            </button>
          </li>
        </ul>
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={handleBookSearchClick}
        >
          <i className="fa fa-magnifying-glass"></i> Search
        </button>
      </div>
      {!isSeached && (
        <div className="available-books">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="my-4 text-secondary">Available Books</h2>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-toggle="modal"
              data-bs-target="#addbook"
            >
              Add Book
            </button>
          </div>
          <div className="row row-cols-lg-5 row-cols-md-4 row-cols-sm-2 row-cols-1">
            {books.map((book, i) => {
              return (
                <div className="col mb-3" key={book.id}>
                  <div className="card">
                    <div className="card-body">
                      <Link
                        to={`/books/${book.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <img
                          src={book.imageURL}
                          className="card-img-top"
                          alt="Book Cover"
                        />
                        <h5 className="card-title mt-2">{book.title}</h5>
                      </Link>
                      <p className="text-muted">by {book.author}</p>
                      <div className="input-group">
                        <span className="input-group-text" id="basic-addon1">
                          Availability
                        </span>
                        <input
                          type="number"
                          className="form-control"
                          value={book.availability}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <AddBookModal setBooks={setBooks} />
        </div>
      )}
      {isSeached && (
        <div className="search-books">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="my-4 text-secondary">Search Result</h2>
            <button
              type="button"
              className="btn-close"
              title="Close"
              onClick={handleCloseSearchClick}
            ></button>
          </div>
          <div className="row row-cols-lg-5 row-cols-md-4 row-cols-sm-2 row-cols-1">
            {searchResult.length === 0 && (
              <p className="text-success">No Books found!</p>
            )}
            {searchResult.map((book, i) => {
              return (
                <div className="col mb-3" key={book.id}>
                  <div className="card">
                    <div className="card-body">
                      <Link
                        to={`/books/${book.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <img
                          src={book.imageURL}
                          className="card-img-top"
                          alt="Book Cover"
                        />
                        <h5 className="card-title mt-2">{book.title}</h5>
                      </Link>
                      <p className="text-muted">by {book.author}</p>
                      <div className="input-group">
                        <span className="input-group-text" id="basic-addon1">
                          Availability
                        </span>
                        <input
                          type="number"
                          className="form-control"
                          value={book.availability}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <AddBookModal setBooks={setBooks} />
        </div>
      )}
    </>
  );
};

export default Books;
