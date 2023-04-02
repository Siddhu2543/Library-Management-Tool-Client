import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const IssueBookModal1 = ({ member, setMember }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [issues, setIssues] = useState();

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === "") {
      setSearchResult([]);
      return;
    }
    axios
      .get(
        `https://localhost:7279/api/Books/Search/Book-Name/${e.target.value}`
      )
      .then(
        (res) => {
          const books = res.data;
          setSearchResult(books);
        },
        (res) => {
          setSearchResult([]);
        }
      );
  };

  const handleIssueClick = async (e) => {
    const id = e.target.id;
    const res = await axios.get(
      `https://localhost:7279/api/Issues/CurrentMemberIssueCount/${member.id}`
    );
    const count = res.data;
    if (count >= 3) {
      window.alert(
        "Maximum issue limit reached for this Member!\nCan not issue book!"
      );
      return;
    }

    const res1 = await axios.get(
      `https://localhost:7279/api/Issues/IsBookIssuedToMember/${id}/${member.id}`
    );
    const boolres = res1.data;
    if (boolres) {
      window.alert("Book already issued to this Member!");
      return;
    }

    const date = new Date();
    const today = date.toISOString().slice(0, 10);
    const duedate = new Date(date.setDate(date.getDate() + 30))
      .toISOString()
      .slice(0, 10);

    axios.get(`https://localhost:7279/api/Books/NewIssue/${id}`).then(
      (res) => {},
      (res) => {
        if (res.status === 400) {
          window.alert("Book copies are not available to issue");
        }
      }
    );

    axios
      .post("https://localhost:7279/api/Issues", {
        bookId: id,
        memberId: member.id,
        issueDate: today,
        dueDate: duedate,
      })
      .then(
        (res) => {
          const issue = res.data;
          console.log(issue);
          window.alert("Book Issued Successfully");
          axios
            .get(`https://localhost:7279/api/Members/${member.id}`)
            .then((res) => {
              const member = res.data;
              setMember(member);
            });
        },
        (res) => {
          axios.get(`https://localhost:7279/api/Books/CancelIssue/${id}`);
        }
      );
  };

  return (
    <div
      className="modal fade"
      id="issuebook1"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Issue Book</h1>
          </div>
          <div className="modal-body">
            <input
              type="search"
              className="form-control mb-3"
              placeholder="Search Book by Name"
              value={searchQuery}
              onChange={handleSearchQueryChange}
            />
            {searchResult.length == 0 && (
              <p className="text-primary">No Books found!</p>
            )}
            {searchResult.length > 0 && (
              <div className="row">
                {searchResult.map((book, i) => (
                  <div className="col-12 mb-2" key={i}>
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <img
                            src={book.imageURL}
                            alt={book.title}
                            width="50px"
                            className="me-2"
                          />
                          <div className="d-flex flex-column flex-grow-1">
                            <p className="lead mb-0">
                              <Link
                                to={`/books/${book.id}`}
                                style={{ textDecoration: "none" }}
                              >
                                <strong>{book.title}</strong>
                              </Link>
                              <br />
                              by {book.author}
                            </p>
                          </div>
                          <button
                            className="btn btn-success"
                            type="button"
                            data-bs-dismiss="modal"
                            onClick={handleIssueClick}
                            id={book.id}
                          >
                            Issue
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueBookModal1;
