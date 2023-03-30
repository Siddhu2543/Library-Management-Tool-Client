import axios from "axios";
import { useEffect, useState } from "react";

const getPublishers = async () => {
  const res = await axios.get("https://localhost:7279/api/Publishers");
  const publisherList = res.data;
  return publisherList;
};

const UpdateBookModal = ({ book, setBook }) => {
  const [name, setName] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [description, setDescription] = useState(book.description);
  const [price, setPrice] = useState(book.price);
  const [totalcopies, setTotalcopies] = useState(book.totalCopies);
  const [publisher, setPublisher] = useState(book.publisherId);
  const [imageurl, setImageurl] = useState(book.imageURL);
  const [publisherList, setPublisherList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const pubList = await getPublishers();
      setPublisherList(pubList);
    }
    fetchData();
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleTotalcopiesChange = (e) => {
    setTotalcopies(e.target.value);
  };

  const handlePublisherChange = (e) => {
    setPublisher(e.target.value);
  };

  const handleImageurlChange = (e) => {
    setImageurl(e.target.value);
  };

  const handleUpdateClick = () => {
    if (
      name === "" ||
      author === "" ||
      description === "" ||
      price <= 0 ||
      totalcopies <= 0 ||
      publisher === -1 ||
      totalcopies < book.totalCopies - book.availability
    ) {
      window.alert(
        "Please enter Book details properly!\nBook details not updated!"
      );
      return;
    }
    axios
      .put(`https://localhost:7279/api/Books/${book.id}`, {
        id: book.id,
        title: name,
        description: description,
        author: author,
        price: price,
        totalCopies: totalcopies,
        availability: totalcopies - (book.totalCopies - book.availability),
        publisherId: publisher,
        addedDate: book.addedDate,
        imageURL: imageurl,
      })
      .then((res) => {
        const updatedbook = res.data;
        console.log(updatedbook);

        window.alert("Book updated successfully");

        axios.get(`https://localhost:7279/api/Books/${book.id}`).then((res) => {
          const book = res.data;
          setBook(book);
        });
      });
  };

  const handleCancelClick = () => {
    setName(book.title);
    setAuthor(book.author);
    setDescription(book.description);
    setPrice(book.price);
    setTotalcopies(book.totalCopies);
    setPublisher(book.publisherId);
  };

  return (
    <div
      className="modal fade"
      id="updatebook"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="updatebook"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Update Book Details</h1>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Book Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Book Name"
                value={name}
                onChange={handleNameChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="author" className="form-label">
                Author Name
              </label>
              <input
                type="text"
                className="form-control"
                id="author"
                placeholder="Author Name"
                value={author}
                onChange={handleAuthorChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                placeholder="About Book..."
                value={description}
                onChange={handleDescriptionChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Book Price
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                placeholder="0"
                value={price}
                onChange={handlePriceChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="totalcopies" className="form-label">
                Total Copies
              </label>
              <input
                type="number"
                className="form-control"
                id="totalcopies"
                placeholder="5"
                onChange={handleTotalcopiesChange}
                value={totalcopies}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="publisher" className="form-label">
                Publisher
              </label>
              <select
                className="form-select"
                id="publisher"
                placeholder="Publisher"
                onChange={handlePublisherChange}
                value={publisher}
                required
              >
                <option value={-1}>Select Publisher</option>
                {publisherList.map((p) => (
                  <option value={p.id} key={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Cover Image URL
              </label>
              <input
                type="url"
                className="form-control"
                id="imageurl"
                placeholder="https://image-link.com"
                value={imageurl}
                onChange={handleImageurlChange}
                required
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-secondary"
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

export default UpdateBookModal;
