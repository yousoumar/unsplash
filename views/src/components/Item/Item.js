import "./Item.scss";

export default function Item({ image, setLoading, setImages }) {
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
        setImages(data.images);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  };
  return (
    <div className="item" key={image.id}>
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
