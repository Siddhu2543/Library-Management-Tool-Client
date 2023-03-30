import axios from "axios";
import { useEffect, useState } from "react";
import AddPublisherModal from "./AddPublisherModal";

const Publishers = () => {
  const [isSeached, setIsSearched] = useState(false);
  const [publishers, setPublishers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:7279/api/Publishers").then((res) => {
      const publishers = res.data;
      setPublishers(publishers);
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

  const handlePublisherSearchClick = () => {
    setIsSearched(true);
    axios
      .get(`https://localhost:7279/api/Publishers/Search/${searchQuery}`)
      .then(
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
          placeholder="Search Publisher"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={handlePublisherSearchClick}
        >
          <i className="fa fa-magnifying-glass"></i> Search
        </button>
      </div>
      {!isSeached && (
        <div className="available-books">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="my-4 text-secondary">Registered Publishers</h2>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-toggle="modal"
              data-bs-target="#addpublisher"
            >
              Add Publisher
            </button>
          </div>
          <div className="row row-cols-lg-5 row-cols-md-4 row-cols-sm-2 row-cols-1">
            {publishers.map((p, i) => {
              return (
                <div className="col mb-3" key={p.id}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title mt-2">{p.name}</h5>
                      <p className="text-muted">Address: {p.address}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <AddPublisherModal setPublishers={setPublishers} />
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
              <p className="text-success">No Publishers found!</p>
            )}
            {searchResult.map((p, i) => {
              return (
                <div className="col mb-3" key={p.id}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title mt-2">{p.name}</h5>
                      <p className="text-muted">Address: {p.address}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Publishers;
