import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RemoveMemberModal from "./RemoveMemberModal";
import UpdateMemberModal from "./UpdateMemberModal";
import IssueBookModal1 from "./IssueBookModal1";

const getIssues = async (id) => {
  const res = await axios.get(
    `https://localhost:7279/api/Issues/Members/${id}`
  );
  return res.data;
};

const Member = () => {
  const { id } = useParams();
  const [member, setMember] = useState();
  const [issues, setIssues] = useState([]);
  const [issueBooks, setIssueBooks] = useState([]);

  useEffect(() => {
    axios.get(`https://localhost:7279/api/Members/${id}`).then(
      (res) => {
        const member = res.data;
        setMember(member);
      },
      (res) => {
        setMember(null);
      }
    );
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const issues = await getIssues(member.id);
      setIssues(issues);
    };
    if (member) fetchData();
  }, [member]);

  useEffect(() => {
    const fetchData = async () => {
      const bookArr = issues.map(
        async (issue) =>
          await axios.get(`https://localhost:7279/api/Books/${issue.bookId}`)
      );

      Promise.all(bookArr).then((res) => {
        const books = res.map((r) => r.data);
        setIssueBooks(books);
      });
    };
    if (issues.length > 0) fetchData();
  }, [issues]);

  const changeDateFormat = (date) => {
    return new Date(date).toUTCString().slice(0, 16);
  };

  const handleRenewMemberClick = () => {
    const date = new Date();
    const expiryDate = new Date(member.expiryDate);
    window.alert(
      "Member's Membership Expiration Date will be extended by 1 year."
    );
    axios
      .put(`https://localhost:7279/api/Members/${member.id}`, {
        id: member.id,
        name: member.name,
        address: member.address,
        mobile: member.mobile,
        dob: member.dob,
        status: member.status,
        admissionDate: member.admissionDate.slice(0, 10),
        expiryDate: new Date(date.setFullYear(expiryDate.getFullYear() + 1))
          .toISOString()
          .slice(0, 10),
      })
      .then((res) => {
        axios
          .get(`https://localhost:7279/api/Members/${member.id}`)
          .then((res) => {
            const member = res.data;
            setMember(member);
          });
      });
  };

  const handleRenewClick = (e) => {
    const id = e.target.id;
    axios.get(`https://localhost:7279/api/Issues/Renew/${id}`).then((res) => {
      const issue = res.data;
      console.log(issue);
      window.alert("Book renewed!\nDue date is extended by 1 Month!");
      axios
        .get(`https://localhost:7279/api/Members/${member.id}`)
        .then((res) => {
          const member = res.data;
          setMember(member);
        });
    });
  };

  const handleReturnClick = (e) => {
    const id = e.target.id;
    axios.get(`https://localhost:7279/api/Issues/Return/${id}`).then((res) => {
      window.alert("Book returned!");
      axios
        .get(`https://localhost:7279/api/Members/${member.id}`)
        .then((res) => {
          const member = res.data;
          setMember(member);
        });
    });
  };

  if (member == null) {
    return <p className="text-danger">Member not found!</p>;
  }

  return (
    <>
      <div className="row">
        <div className="col-md-4 col-12">
          <div className="card">
            <div className="card-body">
              <img
                src="/profile-pic.jpeg"
                className="card-img-top"
                alt={member.name}
              />
            </div>
          </div>
        </div>
        <div className="col-md-8 col-12">
          <h3 className="pt-md-0 pt-sm-3">{member.name}</h3>
          <h5 className="text-muted mb-3">Address: {member.address}</h5>
          <span className="blockquote">
            <u>Mobile:</u>{" "}
            <i className="fa fa-circle-info" title="Member Contact Number"></i>
          </span>
          <p className="lead">
            <strong>{member.mobile}</strong>
          </p>

          <span className="blockquote">
            <u>Date of Birth:</u>
          </span>
          <p className="lead">
            <strong>{changeDateFormat(member.dob)}</strong>
          </p>

          <span className="blockquote">
            <u>Member Status:</u>
          </span>
          <p className="lead">
            <strong>{member.status}</strong>
          </p>

          <span className="blockquote">
            <u>Library Admission Date:</u>
          </span>
          <p className="lead">
            <strong>{changeDateFormat(member.admissionDate)}</strong>
          </p>

          <span className="blockquote">
            <u>Library Membership Expiration Date:</u>
          </span>
          <p className="lead">
            <strong>{changeDateFormat(member.expiryDate)}</strong>
          </p>
        </div>
      </div>
      <div className="d-flex justify-content-around align-items-center my-5">
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#updatemember"
        >
          Update Member Details
        </button>
        <button className="btn btn-secondary" onClick={handleRenewMemberClick}>
          Renew Membership
        </button>
        <button
          className={
            member.status == "Active" ? "btn btn-danger" : "btn btn-warning"
          }
          title="Only if all the copies are available in the Library"
          data-bs-toggle="modal"
          data-bs-target="#removemember"
        >
          Change Member Status to{" "}
          {member.status == "Active" ? "Inactive" : "Active"}
        </button>
        <button
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#issuebook1"
        >
          Issue Book
        </button>
      </div>
      <table className="table table-striped caption-top">
        <caption>Current Book Details</caption>
        <thead>
          <tr>
            <th>#</th>
            <th>Book</th>
            <th>Issue Date</th>
            <th>Due Date</th>
            <th></th>
          </tr>
        </thead>
        {issues.length > 0 ? (
          <tbody>
            {issues.map((i, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <h5>{issueBooks[index]?.title}</h5>
                  <p className="lead">by {issueBooks[index]?.author}</p>
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
        ) : (
          <caption>No Book is issued to this member currently</caption>
        )}
      </table>
      <UpdateMemberModal member={member} setMember={setMember} />
      <RemoveMemberModal member={member} />
      <IssueBookModal1 member={member} setMember={setMember} />
    </>
  );
};

export default Member;
