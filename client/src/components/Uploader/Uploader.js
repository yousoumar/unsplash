import "./Uploader.scss";
export default function Uploader({ setImages, setShowModal }) {
  const fileExtensions = ["image/jpeg", "image/jpg", "image/png", "image/svg"];
  async function sendFile(file, label) {
    console.log(file);
    if (!fileExtensions.includes(file.type)) {
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
    <div className="uploader">
      <form
        onSubmit={function (e) {
          e.preventDefault();
          sendFile(e.currentTarget.image.files[0], e.currentTarget.label.value);
        }}
      >
        <h2>Upload an image</h2>
        <input type="text" placeholder="Label" name="label" required />
        <input type="file" name="image" className="file" required />
        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
