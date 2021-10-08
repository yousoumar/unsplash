import "./Header.scss";
import logo from "../../assets/logo.svg";
export default function Header({ setShowModal, showModal }) {
  return (
    <header className="header">
      <div className="log">
        <img src={logo} alt="" />
      </div>
      <input type="text" name="" placeholder="Serach by name" />
      <button className="button" onClick={() => setShowModal(!showModal)}>
        Add a photo
      </button>
    </header>
  );
}
