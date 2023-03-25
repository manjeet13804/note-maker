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
  const [render,setRender] =useState(false);
  const [filterData,setFilterData] = useState([]);
  const [searchValue, setSearchValue] = useState();
  const [noteid,setNoteid]=useState('')
  useEffect(()=>{
    axios.get("https://note-maker-backend.onrender.com/api/blogs",
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
   
  },[render])
     function deleteAll(){
      setRender(false)
      axios.delete("https://note-maker-backend.onrender.com/api/blogs",
      {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      .then(async function (response) {
        
        setRender(true)
        alert("All records deleted successfully")
      
      })
      .catch(function (error) {
        console.log(error);
      });
     }
     const searchData = () => {
      
        setFilterData(states.filter(note => note.title.includes(searchValue)))
    }
    const setNote = (noteid)=>{
setNoteid(noteid);
console.log(noteid)
    }

const deleteNote = ()=>{
  setRender(false)
  axios.delete(`https://note-maker-backend.onrender.com/api/blogs/${noteid}`,
  {
    headers: {
      Authorization: localStorage.getItem("token")
    }
  })
  .then(async function (response) {
    
    setRender(true)
    alert("records deleted successfully")
  
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
        <input type="search" className="search-text" value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} ></input>
       <button className="btn-2" onClick={() => searchData()}><BsSearch/></button>
        </div>
       
        {filterData.length ?
        filterData.map((note,index) => {
          const date= new Date(note.createdAt).toLocaleString()
          return <>
           <div  className="note" key={index}>
            <BsFillClockFill/> {date} <br/>
            <RiStickyNoteFill/><span>{note.title}</span><br />
          {note.description}
          {note._id ===noteid && <div>
            <button onClick={deleteNote}>delete</button>
            <button>update</button>
            </div>}
          </div>
          </>
         
        })
        :states.map((note,index) => {
          const date= new Date(note.createdAt).toLocaleString()
          return <div onClick={()=>setNote(note._id)} className="note" key={index}>
            <BsFillClockFill/> {date} <br/>
            <RiStickyNoteFill/><span>{note.title}</span><br />
          {note.description}
          {(noteid===note._id) && <div>
            <button className="btn btn-primary" onClick={deleteNote}>delete</button>
            <button className="btn btn-primary">update</button>
            </div>}
          </div>
        })}
      </div>
    </>

  )
}
export default Dashboard;