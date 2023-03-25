import "./dashboard.css";
import {AiOutlineHome} from "react-icons/ai"
import {AiOutlinePlus} from "react-icons/ai"
import {RxCross2} from "react-icons/rx"
import {BsSearch} from  "react-icons/bs"
import {BsFillClockFill} from "react-icons/bs"
import {RiStickyNoteFill} from 'react-icons/ri'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const Dashboard = () => {
  const userId = localStorage.getItem("userId");
  const [states, setStates] = useState([]);
  const [render,setRender] =useState(false)
  useEffect(()=>{
    axios.get("http://localhost:5000/api/blogs",
    {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
    .then(async function (response) {
      setStates(response.data.reverse());
    })
    .catch(function (error) {
      console.log(error);
    });
   
  },[])
     function deleteAll(){
      axios.delete("http://localhost:5000/api/blogs",
      {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      .then(async function (response) {
        alert("All records deleted successfully")
      setRender(!render)
      })
      .catch(function (error) {
        console.log(error);
      });
     }


    if(!userId){
          return<>
          <div>
            you need to login to access this page<Link to="/">login now</Link>
          </div>
          </>
            }
  return (


    <>
        <nav className="headercontainer">
        <div className="nav-menu">
          
          <Link to="/dashboard"><AiOutlineHome/>Home</Link>
        </div>
        <div className="nav-menu">
        
          <Link to="/create"><AiOutlinePlus/>AddNote</Link>
        </div>
        <div className="nav-menu">
        <button onClick={deleteAll}><RxCross2/>DeleteAll</button>
        </div>
        </nav>
      <div className="notescontainer">
        {/* {console.log((states))} */}
        <div className="search-details">
        <input type="search" className="search-text"></input>
       <button className="btn-2"><BsSearch/></button>
        </div>
       
        {states.map((note,index) => {
          const date= new Date(note.createdAt).toLocaleString()
          console.log(date)
          return <div className="note" key={index}>
            <BsFillClockFill/> {date} <br/>
            <RiStickyNoteFill/><span>{note.title}</span><br />
          {note.description}
          </div>
        })}
      </div>
    </>

  )
}
export default Dashboard;