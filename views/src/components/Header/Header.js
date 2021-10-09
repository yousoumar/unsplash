import "./Header.scss";
import logo from "../../assets/logo.svg";
export default function Header({
  setShowModal,
  showModal,
  setImages,
  imagesRef,
}) {
  return (
    <header className="header">
      <div className="content">
        <a href="/" className="logo">
          <img src={logo} alt="" />
          <span>Unsplash</span>
        </a>
      </div>
      <input
        type="text"
        name=""
        placeholder="Serach by name"
        onInput={(e) => {
          const value = e.currentTarget.value.trim();
          if (value === "") {
            setImages(imagesRef.current);
            return;
          }
          setImages(
            imagesRef.current.filter((image) => image.label.includes(value))
          );
        }}
      />
      <button className="button" onClick={() => setShowModal(!showModal)}>
        Add a photo
      </button>
    </header>
  );
}
