import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const IssueBookModal = ({ book }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
    axios
      .get(`https://localhost:7279/api/Members/Search/${e.target.value}`)
      .then(
        (res) => {
          const members = res.data;
          setSearchResult(members);
        },
        (res) => {
          setSearchResult([]);
        }
      );
  };
  const handleIssueClick = async (e) => {
    const id = e.target.id;
    const res = await axios.get(
      `https://localhost:7279/api/Issues/CurrentMemberIssueCount/${id}`
    );
    const count = res.data;
    if (count >= 3) {
      window.alert(
        "Maximum issue limit reached for this Member!\nCan not issue book!"
      );
      return;
    }

    const res1 = await axios.get(
      `https://localhost:7279/api/Issues/IsBookIssuedToMember/${book.id}/${id}`
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

    axios.get(`https://localhost:7279/api/Books/NewIssue/${book.id}`).then(
      (res) => {
        window.alert(res.status);
      },
      (res) => {
        if (res.status === 400) {
          window.alert("Book copies are not available to issue");
        }
      }
    );

    axios
      .post("https://localhost:7279/api/Issues", {
        bookId: book.id,
        memberId: id,
        issueDate: today,
        dueDate: duedate,
      })
      .then(
        (res) => {
          const issue = res.data;
          console.log(issue);
        },
        (res) => {
          axios.get(`https://localhost:7279/api/Books/CancelIssue/${book.id}`);
        }
      );
  };
  return (
    <div
      className="modal fade"
      id="issuebook"
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
              placeholder="Search Member"
              value={searchQuery}
              onChange={handleSearchQueryChange}
            />
            {searchResult.length == 0 && (
              <p className="text-primary">No Member found!</p>
            )}
            {searchResult.length > 0 && (
              <div className="row">
                {searchResult.map((member, i) => (
                  <div className="col-12 mb-2" key={i}>
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <img
                            src="/profile-pic.jpeg"
                            alt={member.name}
                            width="50px"
                            className="me-2"
                          />
                          <div className="d-flex flex-column flex-grow-1">
                            <p className="lead mb-0">
                              <Link
                                to={`/members/${member.id}`}
                                style={{ textDecoration: "none" }}
                              >
                                <strong>{member.name}</strong>
                              </Link>
                              <br />
                              {member.address}
                            </p>
                          </div>
                          <button
                            className="btn btn-success"
                            type="button"
                            data-bs-dismiss="modal"
                            onClick={handleIssueClick}
                            id={member.id}
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

export default IssueBookModal;
