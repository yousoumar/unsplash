import "./Item.scss";
import { useState, useRef } from "react";
export default function Item({ image, setLoading, setImages, imagesRef }) {
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [error, setError] = useState("");
  const ref = useRef("");
  const handleDelete = (id, name, secretWord) => {
    if (
      secretWord.trim().toLowerCase() !== image.secretWord.trim().toLowerCase()
    ) {
      setError("The secret word is not correct");
      return;
    }
    setLoading(true);
    fetch("/api/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        name: name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        imagesRef.current = imagesRef.current.filter(
          (image) => image.id !== data.id
        );

        setImages(imagesRef.current);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="item">
      <img src={image.url} alt="" />
      <button className="button delete" onClick={(e) => setDeleteModal(true)}>
        Delete
      </button>
      <p className="label">{image.label}</p>
      {showDeleteModal && (
        <div className="modal">
          <div className="container">
            <h2>{error}</h2>
            <input
              type="text"
              name="secretWord"
              placeholder="Enter your serect word"
              ref={ref}
            />
            <button
              className="button delete"
              onClick={() =>
                handleDelete(image.id, image.name, ref.current.value)
              }
            >
              Delete
            </button>
            <button
              className="button gray"
              onClick={(e) => {
                setError("");
                setDeleteModal(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
