import "./logout.css"
import { Link } from "react-router-dom";
const Logout = () => {
  const logoutHandle = ()=>{
    localStorage.clear();
  }
  return (
    <Link to="/">
    <button className="logout" onClick={logoutHandle}>Logout</button>
   </Link>
  );
  
};
export default Logout;
