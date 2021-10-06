import "./Header.scss";
import logo from "../../assets/logo.svg";
export default function Header() {
  return (
    <header className="header">
      <div className="log">
        <img src={logo} alt="" />
      </div>
      <input type="search" name="" placeholder="Serach by name" />
      <button>Add a photo</button>
    </header>
  );
}
