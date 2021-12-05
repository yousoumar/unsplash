import loader from "../../assets/loader.svg";
import "./Loader.scss";
export default function Loader() {
  return (
    <p className="loader">
      <img src={loader} alt="" />
    </p>
  );
}
