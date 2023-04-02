import axios from "axios";
import { useEffect, useState } from "react";
import AddMemberModal from "./AddMemberModal";
import { Link } from "react-router-dom";
import IssueBookModal1 from "./IssueBookModal1";

const Members = () => {
  const [isSeached, setIsSearched] = useState(false);
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:7279/api/Members").then((res) => {
      const members = res.data;
      setMembers(members);
    });
  }, []);

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCloseSearchClick = () => {
    setIsSearched(false);
    setSearchQuery("");
    setSearchResult([]);
  };

  const handleMemberSearchClick = () => {
    setIsSearched(true);
    axios.get(`https://localhost:7279/api/Members/Search/${searchQuery}`).then(
      (res) => {
        const publishers = res.data;
        setSearchResult(publishers);
      },
      (e) => {
        if (e.response.status === 404) {
          setSearchResult([]);
        }
      }
    );
  };

  return (
    <>
      <div className="input-group">
        <input
          type="search"
          className="form-control"
          placeholder="Search Member"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={handleMemberSearchClick}
        >
          <i className="fa fa-magnifying-glass"></i> Search
        </button>
      </div>
      {!isSeached && (
        <div className="available-members">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="my-4 text-secondary">Registered Members</h2>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-toggle="modal"
              data-bs-target="#addmember"
            >
              Add New Member
            </button>
          </div>
          <div className="row">
            {members.map((member, i) => (
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
                      <div className="d-flex flex-column">
                        <h5>
                          <span className="badge bg-primary w-100">
                            Admission Date: {member.admissionDate.slice(0, 10)}
                          </span>
                        </h5>
                        <h5>
                          <span className="badge bg-danger w-100">
                            Membership End Date:{" "}
                            {member.expiryDate.slice(0, 10)}
                          </span>
                        </h5>
                      </div>
                      {/* <button
                        className="btn btn-success"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#issuebook1"
                        id={member.id}
                      >
                        Issue Book
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <AddMemberModal setMembers={setMembers} />
        </div>
      )}
      {isSeached && (
        <div className="search-members">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="my-4 text-secondary">Search Result</h2>
            <button
              type="button"
              className="btn-close"
              title="Close"
              onClick={handleCloseSearchClick}
            ></button>
          </div>
          <div className="row">
            {searchResult.length === 0 && (
              <p className="text-success">No Members found!</p>
            )}
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
                      <div className="d-flex flex-column">
                        <h5>
                          <span className="badge bg-primary w-100">
                            Admission Date: {member.admissionDate.slice(0, 10)}
                          </span>
                        </h5>
                        <h5>
                          <span className="badge bg-danger w-100">
                            Membership End Date:{" "}
                            {member.expiryDate.slice(0, 10)}
                          </span>
                        </h5>
                      </div>
                      {/* <button
                        className="btn btn-success"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#issuebook1"
                        id={member.id}
                      >
                        Issue Book
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Members;
