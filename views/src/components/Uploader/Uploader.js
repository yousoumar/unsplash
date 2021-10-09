import { useRef, useState } from "react";
import "./Uploader.scss";
export default function Uploader({ setImages, setShowModal }) {
  const fileExtensions = ["image/jpeg", "image/jpg", "image/png", "image/svg"];
  const [error, SetError] = useState(false);
  const [errorMessage, SetErrorMessage] = useState("");

  const fileInputRef = useRef("");

  async function sendFile(file, label) {
    console.log(file);
    if (!label) {
      SetError(true);
      SetErrorMessage("Please fill the label field");
      return;
    }
    if (!file) {
      SetError(true);
      SetErrorMessage("Please chose an image ");
      return;
    }
    if (!fileExtensions.includes(file.type)) {
      SetError(true);
      SetErrorMessage("This file is not an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("label", label);
    const options = {
      method: "POST",
      body: formData,
    };

    try {
      const res = await fetch("/api/", options);
      const data = await res.json();
      setShowModal(false);
      setImages(data.images);
    } catch (error) {}
  }
  return (
    <div className={error ? "uploader error" : "uploader"}>
      <form
        onSubmit={function (e) {
          e.preventDefault();
          sendFile(e.currentTarget.image.files[0], e.currentTarget.label.value);
        }}
      >
        <h2>{!error ? "Upload an image" : errorMessage}</h2>

        <div className="fields">
          <input type="text" placeholder="Label" name="label" />
          <input type="file" name="image" className="file" ref={fileInputRef} />
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
    </div>
  );
}
