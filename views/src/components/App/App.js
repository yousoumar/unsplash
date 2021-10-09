import { useEffect, useRef, useState } from "react";
import Header from "../Header/Header";
import Item from "../Item/Item";
import Loader from "../Loader/Loader";
import Uploader from "../Uploader/Uploader";
import "./App.scss";

function App() {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const imagesRef = useRef([]);

  useEffect(() => {
    fetch("/api/")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("bad response from the api");
        }
      })
      .then((data) => {
        setImages(data.images);
        imagesRef.current = data.images.slice();
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="app">
      <Header
        setShowModal={setShowModal}
        showModal={showModal}
        setImages={setImages}
        imagesRef={imagesRef}
      />
      <main>
        {images.map((image) => (
          <Item
            image={image}
            key={image.url}
            setLoading={setLoading}
            setImages={setImages}
          />
        ))}
      </main>
      {showModal && (
        <Uploader setImages={setImages} setShowModal={setShowModal} />
      )}

      {loading && <Loader />}
    </div>
  );
}

export default App;
