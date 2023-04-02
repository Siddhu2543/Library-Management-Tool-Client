import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Issue = () => {
  const [searchCriteria, setSearchCriteria] = useState("Book");
  const [isSeached, setIsSearched] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [issues, setIssues] = useState([]);
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:7279/api/Issues/").then((res) => {
      const issues = res.data;
      setIssues(issues);
    });
    setSearchCriteria("Book");
    setIsSearched(false);
    setSearchQuery("");
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      const bookArr = issues.map(
        async (issue) =>
          await axios.get(`https://localhost:7279/api/Books/${issue.bookId}`)
      );

      Promise.all(bookArr).then((res) => {
        const books = res.map((r) => r.data);
        setBooks(books);
      });
    };

    const fetchMembers = async () => {
      const memberArr = issues.map(
        async (issue) =>
          await axios.get(
            `https://localhost:7279/api/Members/${issue.memberId}`
          )
      );

      Promise.all(memberArr).then((res) => {
        const members = res.map((r) => r.data);
        setMembers(members);
      });
    };
    if (issues.length > 0) {
      fetchBooks();
      fetchMembers();
    }
  }, [issues]);

  const handleSearchQueryChange = (e) => {
    const search = e.target.value;
    if (search === "") {
      setIsSearched(false);
      setSearchQuery("");
      setSearchResult([]);
      return;
    }
    setSearchQuery(search);
    setIsSearched(true);
    if (searchCriteria == "Book") {
      axios
        .get(`https://localhost:7279/api/Issues/Search/Book/${search}`)
        .then((res) => {
          const issues = res.data;
          setSearchResult(issues);
        })
        .catch(() => {
          setSearchResult([]);
        });
    } else {
      axios
        .get(`https://localhost:7279/api/Issues/Search/Member/${search}`)
        .then((res) => {
          const issues = res.data;
          setSearchResult(issues);
        })
        .catch(() => {
          setSearchResult([]);
        });
    }
  };

  const handleSearchCriteriaChange = (e) => {
    setSearchCriteria(e.target.value);
  };

  const handleRenewClick = (e) => {
    const id = e.target.id;
    axios.get(`https://localhost:7279/api/Issues/Renew/${id}`).then((res) => {
      const issue = res.data;
      console.log(issue);
      window.alert("Book renewed!\nDue date is extended by 1 Month!");
      axios.get("https://localhost:7279/api/Issues/").then((res) => {
        const issues = res.data;
        setIssues(issues);
      });
    });
  };

  const handleReturnClick = (e) => {
    const id = e.target.id;
    axios.get(`https://localhost:7279/api/Issues/Return/${id}`).then((res) => {
      window.alert("Book returned!");
      axios.get("https://localhost:7279/api/Issues/").then((res) => {
        const issues = res.data;
        setIssues(issues);
      });
    });
  };

  const changeDateFormat = (date) => {
    return new Date(date).toUTCString().slice(0, 16);
  };

  return (
    <>
      <div className="row">
        <div className="col-10 m-0 p-0">
          <input
            type="search"
            className="form-control"
            placeholder="Search Book"
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
        </div>
        <div className="col-2 m-0 p-0">
          <select
            className="form-select"
            value={searchCriteria}
            onChange={handleSearchCriteriaChange}
          >
            <option value={"Book"}>Book</option>
            <option value={"Member"}>Member</option>
          </select>
        </div>
      </div>
      {!isSeached && (
        <div className="issues">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="my-4 text-secondary">Issued Books with Members</h2>
          </div>
          {issues.length > 0 && (
            <table className="table table-striped caption-top">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Book</th>
                  <th>Member</th>
                  <th>Issue Date</th>
                  <th>Due Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {issues.map((i, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={"/books/" + books[index]?.id}>
                        <h5>{books[index]?.title}</h5>
                      </Link>
                      <p className="lead">by {books[index]?.author}</p>
                    </td>
                    <td>
                      <Link to={"/members/" + members[index]?.id}>
                        <h5>{members[index]?.name}</h5>
                      </Link>
                      <p className="lead">by {members[index]?.address}</p>
                    </td>
                    <td>{changeDateFormat(i.issueDate)}</td>
                    <td>{changeDateFormat(i.dueDate)}</td>
                    <td>
                      <button
                        className="btn btn-primary mb-1"
                        onClick={handleReturnClick}
                        id={i.id}
                      >
                        Return Book
                      </button>
                      <br />
                      <button
                        className="btn btn-secondary"
                        onClick={handleRenewClick}
                        id={i.id}
                      >
                        Renew Book
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
      {isSeached && (
        <div className="search-books">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="my-4 text-secondary">Search Result</h2>
          </div>
          <div className="row row-cols-lg-5 row-cols-md-4 row-cols-sm-2 row-cols-1">
            {searchResult.length === 0 && (
              <p className="text-success">No Entries found!</p>
            )}
            <table className="table table-striped caption-top">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Book</th>
                  <th>Member</th>
                  <th>Issue Date</th>
                  <th>Due Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {searchResult.map((i, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={"/books/" + books[index]?.id}>
                        <h5>{books[index]?.title}</h5>
                      </Link>
                      <p className="lead">by {books[index]?.author}</p>
                    </td>
                    <td>
                      <Link to={"/members/" + members[index]?.id}>
                        <h5>{members[index]?.name}</h5>
                      </Link>
                      <p className="lead">by {members[index]?.address}</p>
                    </td>
                    <td>{changeDateFormat(i.issueDate)}</td>
                    <td>{changeDateFormat(i.dueDate)}</td>
                    <td>
                      <button
                        className="btn btn-primary mb-1"
                        onClick={handleReturnClick}
                        id={i.id}
                      >
                        Return Book
                      </button>
                      <br />
                      <button
                        className="btn btn-secondary"
                        onClick={handleRenewClick}
                        id={i.id}
                      >
                        Renew Book
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Issue;
