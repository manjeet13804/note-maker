import "./logout.css"
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
