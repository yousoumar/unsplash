import { useRef, useState } from "react";
import "./Uploader.scss";
import Loader from "../Loader/Loader";
export default function Uploader({ setImages, setShowModal, imagesRef }) {
  const fileExtensions = ["image/jpeg", "image/jpg", "image/png", "image/svg"];
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef("");

  async function sendFile(file, label) {
    if (!label) {
      setError(true);
      setErrorMessage("Please fill the label field");
      return;
    }
    if (!file) {
      setError(true);
      setErrorMessage("Please chose an image ");
      return;
    }
    if (!fileExtensions.includes(file.type)) {
      setError(true);
      setErrorMessage("This file is not an image");
      return;
    }
    setError(false);
    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("label", label);
    const options = {
      method: "POST",
      body: formData,
    };
    fetch("/api/", options)
      .then((res) => res.json())
      .then((data) => {
        imagesRef.current.unshift(data);
        setImages(imagesRef.current);
        setShowModal(false);
      })
      .catch((error) => console.log(error));
  }
  return (
    <div className={error ? "uploader error" : "uploader"}>
      {loading ? (
        <Loader />
      ) : (
        <form
          onSubmit={function (e) {
            e.preventDefault();
            sendFile(
              e.currentTarget.image.files[0],
              e.currentTarget.label.value
            );
          }}
        >
          <h2>{!error ? "Upload an image" : errorMessage}</h2>
          <div className="fields">
            <input type="text" placeholder="Label" name="label" />
            <input
              type="file"
              name="image"
              className="file"
              ref={fileInputRef}
            />
            <button
              className="button gray"
              onClick={(e) => {
                e.preventDefault();
                fileInputRef.current.click();
              }}
            >
              Chose an image
            </button>
          </div>
          <div className="buttons">
            <button className="button gray" onClick={() => setShowModal(false)}>
              Cancel
            </button>
            <button className="button" type="submit">
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
