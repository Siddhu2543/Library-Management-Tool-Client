import axios from "axios";
import { useState } from "react";

const UpdateMemberModal = ({ member, setMember }) => {
  const [name, setName] = useState(member.name);
  const [address, setAddress] = useState(member.address);
  const [mobile, setMobile] = useState(member.mobile);
  const [dob, setDob] = useState(member.dob.slice(0, 10));

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  };

  const handleDobChange = (e) => {
    setDob(e.target.value);
  };

  const handleCancelClick = () => {
    setName(member.name);
    setAddress(member.address);
    setDob(member.dob.slice(0, 10));
    setMobile(member.mobile);
  };

  const handleUpdateClick = () => {
    if (name === "" || address === "" || !mobile || !dob) {
      window.alert(
        "Please enter Member Details properly!\nMember not updated!"
      );
      return;
    }
    axios
      .put(`https://localhost:7279/api/Members/${member.id}`, {
        id: member.id,
        name: name,
        address: address,
        mobile: mobile,
        dob: dob,
        status: member.status,
        admissionDate: member.admissionDate.slice(0, 10),
        expiryDate: member.expiryDate.slice(0, 10),
      })
      .then((res) => {
        const Member = res.data;
        console.log(Member);

        window.alert("Member details updated successfully");

        axios
          .get(`https://localhost:7279/api/Members/${member.id}`)
          .then((res) => {
            const member = res.data;
            setMember(member);
            setName(member.name);
            setAddress(member.address);
            setMobile(member.mobile);
            setDob(member.dob.slice(0, 10));
          });
      })
      .finally(() => {
        setName(member.name);
        setAddress(member.address);
        setMobile(member.mobile);
        setDob(member.dob.slice(0, 10));
      });
  };

  return (
    <div
      className="modal fade"
      id="updatemember"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Add New Member Details</h1>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Full Name"
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
            <div className="mb-3">
              <label htmlFor="mobile" className="form-label">
                Mobile Number
              </label>
              <input
                type="tel"
                className="form-control"
                id="mobile"
                placeholder="9999999999"
                value={mobile}
                onChange={handleMobileChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dob" className="form-label">
                Date of Birth
              </label>
              <input
                type="date"
                className="form-control"
                id="dob"
                placeholder="Date of Birth"
                value={dob}
                onChange={handleDobChange}
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
              onClick={handleUpdateClick}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateMemberModal;
