import axios from "axios";
import { useState } from "react";

const AddPublisherModal = ({ setPublishers }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleCancelClick = () => {
    setName("");
    setAddress("");
  };

  const handleAddClick = () => {
    if (name === "" || address === "") {
      window.alert(
        "Please enter Publisher Details properly!\nPublisher not added!"
      );
    }
    axios
      .post("https://localhost:7279/api/Publishers", {
        name: name,
        address: address,
      })
      .then((res) => {
        const publisher = res.data;
        console.log(publisher);

        window.alert("Publisher added successfully");

        axios.get("https://localhost:7279/api/Publishers").then((res) => {
          const publishers = res.data;
          setPublishers(publishers);
        });
      });

    setName("");
    setAddress("");
  };

  return (
    <div
      className="modal fade"
      id="addpublisher"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Add Publisher Details</h1>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Publisher Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Publisher Name"
                value={name}
                onChange={handleNameChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Address"
                value={address}
                onChange={handleAddressChange}
                required
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={handleAddClick}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPublisherModal;
