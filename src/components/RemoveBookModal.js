import axios from "axios";
import { useNavigate } from "react-router-dom";

const RemoveBookModal = ({ book }) => {
  const navigate = useNavigate();
  const handleRemoveClick = () => {
    if (book.availability !== book.totalCopies) {
      window.alert(
        "Book can not be removed because some of the copies are still issued to some members!"
      );
      return;
    }

    axios.delete(`https://localhost:7279/api/Books/${book.id}`).then((res) => {
      window.alert("Book removed successfully");
      navigate("/books");
    });
  };
  return (
    <div
      className="modal fade"
      id="removebook"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Remove Book from Library</h1>
          </div>
          <div className="modal-body">
            <h5>Are you sure you want to remove this book from Library?</h5>
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

export default RemoveBookModal;
