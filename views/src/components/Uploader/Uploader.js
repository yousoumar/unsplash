import { useRef, useState } from "react";
import "./Uploader.scss";
import Loader from "../Loader/Loader";
export default function Uploader({ setImages, setShowModal, imagesRef }) {
  const supportedFiles = ["image/jpeg", "image/jpg", "image/png", "image/svg"];
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef("");
  const fileButtonRef = useRef("");

  const validateFile = (file) => {
    if (file && supportedFiles.includes(file.type)) {
      fileButtonRef.current.textContent = "Photo chosen";
      fileButtonRef.current.style.borderColor = "#bdbdbd";
    } else {
      fileButtonRef.current.style.borderColor = "#eb5757";
      fileButtonRef.current.textContent = "This is not an image";
      fileInputRef.current.value = "";
    }
  };

  async function sendFile(file, label, secretWord) {
    if (!file || !supportedFiles.includes(file.type) || !label || !secretWord) {
      setError(true);
      setErrorMessage("Please fill all the fields");
      return;
    }

    setError(false);
    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("label", label);
    formData.append("secretWord", secretWord);
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
              e.currentTarget.label.value,
              e.currentTarget.secretWord.value
            );
          }}
        >
          <h2>{errorMessage}</h2>
          <div className="fields">
            <button
              className="button gray"
              onClick={(e) => {
                e.preventDefault();
                fileInputRef.current.click();
              }}
              ref={fileButtonRef}
            >
              Chose a photo
            </button>
            <input type="text" placeholder="Give it a label" name="label" />
            <input
              type="file"
              name="image"
              className="file"
              ref={fileInputRef}
              onChange={(e) => {
                validateFile(e.currentTarget.files[0]);
              }}
            />
            <input
              type="text"
              name="secretWord"
              placeholder="Give it a secret word"
            />
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
