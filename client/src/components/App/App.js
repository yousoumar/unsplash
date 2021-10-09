import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Uploader from "../Uploader/Uploader";
import "./App.scss";

function App() {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  console.log(images);
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch("/api/");
      try {
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setImages(data.images);
        } else {
          throw new Error("bad response from the api");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetcher();
  }, []);

  const handleDelete = (id, name) => {
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
      .then((data) => setImages(data.images));
  };
  return (
    <div className="app">
      <Header setShowModal={setShowModal} showModal={showModal} />
      <main>
        {images.map((image) => (
          <div className="img" key={image.id}>
            <img src={image.url} alt="" />
            <button
              className="button delete"
              onClick={() => handleDelete(image.id, image.name)}
            >
              Delete
            </button>
            <p className="label">{image.label}</p>
          </div>
        ))}
      </main>
      {showModal && (
        <Uploader setImages={setImages} setShowModal={setShowModal} />
      )}
    </div>
  );
}

export default App;
