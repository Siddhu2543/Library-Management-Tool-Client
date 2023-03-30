import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IssueBookModal from "./IssueBookModal";
import RemoveBookModal from "./RemoveBookModal";
import UpdateBookModal from "./UpdateBookModal";

const getPublisherName = async (id) => {
  const res = await axios.get(`https://localhost:7279/api/Publishers/${id}`);
  return res.data.name;
};

const Book = () => {
  const { id } = useParams();
  const [book, setBook] = useState();
  const [publisher, setPublisher] = useState("");

  useEffect(() => {
    axios.get(`https://localhost:7279/api/Books/${id}`).then(
      (res) => {
        const book = res.data;
        setBook(book);
      },
      (res) => {
        setBook(null);
      }
    );
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const name = await getPublisherName(book.publisherId);
      setPublisher(name);
    };
    fetchData();
  });

  const changeDateFormat = (date) => {
    return new Date(date).toUTCString().slice(0, 16);
  };

  if (book == null) {
    return <p className="text-danger">Book not found!</p>;
  }

  return (
    <>
      <div className="row">
        <div className="col-md-4 col-12">
          <div className="card">
            <div className="card-body">
              <img
                src={book.imageURL}
                className="card-img-top"
                alt={"Cover image for " + book.title}
              />
            </div>
          </div>
        </div>
        <div className="col-md-8 col-12">
          <h3 className="pt-md-0 pt-sm-3">{book.title}</h3>
          <h5 className="text-muted mb-3">by {book.author}</h5>
          <span className="blockquote">
            <u>Price:</u>{" "}
            <i className="fa fa-circle-info" title="Book's Purchase Price"></i>
          </span>
          <p className="lead">
            <strong>₹{book.price}</strong>
          </p>

          <p className="blockquote">
            <u>Description</u>
          </p>
          <p className="lead">
            <strong>{book.description}</strong>
          </p>

          <p className="blockquote">
            <u>Extra details</u>
          </p>
          <div className="row mb-3">
            <div className="col-2">Published by: </div>
            <div className="col-10">
              <strong>{publisher}</strong>
            </div>
            <div className="col-2">Added Date: </div>
            <div className="col-10">
              <strong>{changeDateFormat(book.addedDate.slice(0, 10))}</strong>
            </div>
            <div className="col-2">Total Copies: </div>
            <div className="col-10">
              <strong>{book.totalCopies}</strong>
            </div>
          </div>
          <p className="blockquote">
            <u>Availability</u>
          </p>
          <p className="lead">
            <input
              className="form-control-lg"
              type={"number"}
              value={book.availability}
              readOnly
              title="Availability will only change if either Total Copies are changed or the book is returned or issued."
            />
          </p>
        </div>
      </div>
      <div className="d-flex justify-content-around align-items-center my-5">
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#updatebook"
        >
          Update Book Details
        </button>
        <button
          className="btn btn-danger"
          title="Only if all the copies are available in the Library"
          data-bs-toggle="modal"
          data-bs-target="#removebook"
        >
          Remove Book from Library
        </button>
        {book.availability > 0 && (
          <button
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#issuebook"
          >
            Issue Book
          </button>
        )}
      </div>
      <UpdateBookModal book={book} setBook={setBook} />
      <RemoveBookModal book={book} />
      <IssueBookModal book={book} />
    </>
  );
};

export default Book;
