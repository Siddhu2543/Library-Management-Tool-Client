import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ flex: "1" }}>
      <section className="about">
        <h2 className="text-center mb-4 text-secondary">
          About{" "}
          <i
            className="fa fa-info-circle"
            title="About Library Management Tool"
          ></i>
        </h2>
        <div className="row">
          <div className="col-md-4 mb-3">
            <div className="card">
              <div
                className="card-body bg-dark"
                style={{ borderRadius: "10px" }}
              >
                <h5
                  className="card-title text-center my-3"
                  style={{ color: "#ca9929" }}
                >
                  Manage Books & Publishers
                </h5>
                <p
                  className="card-text text-white mb-3 px-md-3"
                  style={{ textAlign: "justify" }}
                >
                  Here you can manage all the Books & Publishers available in
                  your Library and have a complete record available online. Use
                  this tool to add new Books, remove Books and change the number
                  of copies currently available.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card">
              <div
                className="card-body bg-dark"
                style={{ borderRadius: "10px" }}
              >
                <h5
                  className="card-title text-center my-3"
                  style={{ color: "#ca9929" }}
                >
                  Manage Members
                </h5>
                <p
                  className="card-text text-white mb-3 px-md-3"
                  style={{ textAlign: "justify" }}
                >
                  Manage all the details of the members registered in your
                  library. You can also find complete details of a member just
                  by searching their name. Here you can see all personal details
                  and membership details,too.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card">
              <div
                className="card-body bg-dark"
                style={{ borderRadius: "10px" }}
              >
                <h5
                  className="card-title text-center my-3"
                  style={{ color: "#ca9929" }}
                >
                  Manage Book - Member Transaction
                </h5>
                <p
                  className="card-text text-white mb-3 px-md-3"
                  style={{ textAlign: "justify" }}
                >
                  Here you can manage all the details when you issue a Book to a
                  member which will maintain info. about date of issue, due date
                  and date of return, member info.. Make sure to change status
                  when a member returns a Book.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr />
      <section className="functions">
        <h2 className="text-center mb-4 text-secondary">
          Tools{" "}
          <i
            className="fa fa-info-circle"
            title="Tools provided by Library Management Tool"
          ></i>
        </h2>
        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="card">
              <div
                className="card-body bg-primary"
                style={{ borderRadius: "10px" }}
              >
                <Link
                  to="/books"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  <div className="d-flex align-items-center">
                    <div className="p-2">
                      <i className="fa fa-book fa-xl"></i>
                    </div>
                    <div
                      className="p-2 align-self-stretch flex-grow-1 fw-bold"
                      style={{ fontSize: "1.25em" }}
                    >
                      View all Books
                    </div>
                    <div className="p-2 align-self-stretch">
                      <i className="fa-solid fa-circle-chevron-right fa-xl"></i>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card">
              <div
                className="card-body bg-secondary"
                style={{ borderRadius: "10px" }}
              >
                <Link
                  to="/publishers"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  <div className="d-flex align-items-center">
                    <div className="p-2">
                      <i className="fa fa-user-pen fa-xl"></i>
                    </div>
                    <div
                      className="p-2 align-self-stretch flex-grow-1 fw-bold"
                      style={{ fontSize: "1.25em" }}
                    >
                      View all Publishers
                    </div>
                    <div className="p-2 align-self-stretch">
                      <i className="fa-solid fa-circle-chevron-right fa-xl"></i>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card">
              <div
                className="card-body bg-success"
                style={{ borderRadius: "10px" }}
              >
                <Link
                  to="/members"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  <div className="d-flex align-items-center">
                    <div className="p-2">
                      <i className="fa fa-user-group fa-xl"></i>
                    </div>
                    <div
                      className="p-2 align-self-stretch flex-grow-1 fw-bold"
                      style={{ fontSize: "1.25em" }}
                    >
                      View all Members
                    </div>
                    <div className="p-2 align-self-stretch">
                      <i className="fa-solid fa-circle-chevron-right fa-xl"></i>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card">
              <div
                className="card-body bg-danger"
                style={{ borderRadius: "10px" }}
              >
                <Link
                  to="/issue"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  <div className="d-flex align-items-center">
                    <div className="p-2">
                      <i className="fa fa-swatchbook fa-xl"></i>
                    </div>
                    <div
                      className="p-2 align-self-stretch flex-grow-1 fw-bold"
                      style={{ fontSize: "1.25em" }}
                    >
                      Issue Section
                    </div>
                    <div className="p-2 align-self-stretch">
                      <i className="fa-solid fa-circle-chevron-right fa-xl"></i>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr />
      <section className="rules">
        <h2 className="text-center mb-4 text-secondary">
          Rules <i className="fa fa-info-circle" title="Rules"></i>
        </h2>
        <ol
          className="bg-dark text-white py-3"
          style={{ borderRadius: "10px" }}
          id="rules"
        >
          <li className="m-3" style={{ textAlign: "justify" }}>
            Every member has Membership Expiry Date. The membership of a member
            will be revoked past the expiry date. No functionalities such as
            Book Issue will be allowed for members with expired membership.
            Their membership can be renewed by admin and can again use all the
            functionalities.
          </li>
          <li className="m-3" style={{ textAlign: "justify" }}>
            A member can only issue atmost 3 books simultaneously and will not
            be allowed to issue more than 3. A member must return 1 or more
            books in case they want other books instead.
          </li>
          <li className="m-3" style={{ textAlign: "justify" }}>
            When a book is issued, the due date of return will be a month. If a
            member renews a book, then the due date will be extended by 1 month.
            A book must be returned before its due date or penalty can be
            applied.
          </li>
          <li className="m-3" style={{ textAlign: "justify" }}>
            A book details can not be removed if its copies are issued to some
            members. All the books must be available in the library before
            removing its details online.
          </li>
          <li className="m-3" style={{ textAlign: "justify" }}>
            A member can not be removed if some books are issued to that member.
            A member details can only be deleted after they return all the
            issued books.
          </li>
        </ol>
      </section>
    </div>
  );
};

export default Home;
