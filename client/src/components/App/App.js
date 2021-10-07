import { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./App.scss";

function App() {
  const [images, setImages] = useState([]);
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

  const handleClick = (id, name) => {
    fetch("/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: "delete",
        id: id,
        name: name,
      }),
    })
      .then((res) => res.json())
      .then((data) => setImages(data.images));
  };
  return (
    <div className="app">
      <Header />
      <main>
        {images.map((image) => (
          <div className="img" key={image.id}>
            <img src={image.url} alt="" />
            <button onClick={() => handleClick(image.id, image.name)}>
              Delete
            </button>
            <p className="label">{image.label}</p>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
