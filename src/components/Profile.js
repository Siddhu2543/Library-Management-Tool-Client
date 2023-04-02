import { useContext, useEffect } from "react";
import { UserContext } from "../App";

const Profile = () => {
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("USER")));
  }, []);

  const changeDateFormat = (date) => {
    return new Date(date).toUTCString().slice(0, 16);
  };
  return (
    <div className="row">
      <div className="col-md-4 col-12">
        <div className="card">
          <div className="card-body">
            <img
              src="/profile-pic.jpeg"
              className="card-img-top"
              alt={user.name}
            />
          </div>
        </div>
      </div>
      <div className="col-md-8 col-12">
        <h1 className="pt-md-0 pt-sm-3">Hello {user.username}!</h1>
        <hr />
        <h3 className="pt-md-0 pt-sm-3">{user.name}</h3>
        <h5 className="text-muted mb-3">Address: {user.address}</h5>
        <span className="blockquote">
          <u>Mobile:</u>
        </span>
        <p className="lead">
          <strong>{user.mobile}</strong>
        </p>

        <span className="blockquote">
          <u>Date of Birth:</u>
        </span>
        <p className="lead">
          <strong>{changeDateFormat(user.dob)}</strong>
        </p>
      </div>
    </div>
  );
};

export default Profile;
