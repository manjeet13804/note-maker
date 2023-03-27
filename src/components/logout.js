import "./logout.css"
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const logoutHandle = ()=>{
     const navigate =useNavigate()
    localStorage.clear();
        navigate("/")
  }
  return (
    <button className="logout" onClick={logoutHandle}>Logout</button>
  );
  
};
export default Logout;
