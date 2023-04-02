import axios from "axios";
import { useNavigate } from "react-router-dom";

const RemoveMemberModal = ({ member }) => {
  const navigate = useNavigate();

  const handleRemoveClick = async () => {
    const res = await axios.get(
      `https://localhost:7279/api/Issues/CurrentMemberIssueCount/${member.id}`
    );
    const count = res.data;
    if (count > 0) {
      window.alert(
        'Can not change status to "Inactive" because books are stil issued to this member!'
      );
      return;
    }
    axios
      .put(`https://localhost:7279/api/Members/${member.id}`, {
        ...member,
        status: "Inactive",
      })
      .then((res) => {
        window.alert("Member status is changed to Inactive!");
        navigate("/members");
      });
  };

  return (
    <div
      className="modal fade"
      id="removemember"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Delete Member Details</h1>
          </div>
          <div className="modal-body">
            <h5>Are you sure you want to remove this member's details?</h5>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={handleRemoveClick}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveMemberModal;
