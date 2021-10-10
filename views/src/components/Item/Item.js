import "./Item.scss";

export default function Item({ image, setLoading, setImages, imagesRef }) {
  const handleDelete = (id, name) => {
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
      <button
        className="button delete"
        onClick={() => handleDelete(image.id, image.name)}
      >
        Delete
      </button>
      <p className="label">{image.label}</p>
    </div>
  );
}
