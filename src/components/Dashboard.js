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
  const [noteid,setNoteid]=useState('');
  const [update,setUpdate] =useState("");
  const [titleUpdate,setTitleUpdate] = useState("");
  const [descriptionUpdate,setDescriptionUpdate] = useState("");

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
const updateNote = (note)=>{
  if(update===noteid){
    const DATA ={
      title :titleUpdate,
      description:descriptionUpdate
    }
    setRender(false)
    axios.put(`https://note-maker-backend.onrender.com/api/blogs/${noteid}`,DATA,
    {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
    .then(async function (response) {
      
      setRender(true)
      setDescriptionUpdate("")
      setTitleUpdate("")
      setUpdate("")
      alert("records updated successfully")
    
    })
    .catch(function (error) {
      console.log(error);
    });
   
  }
  else setUpdate(note);
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
           <div onClick={()=>setNote(note._id)} className="note" key={index}>
            <BsFillClockFill/> {date} <br/>
            <RiStickyNoteFill/>
            {update ===note._id ? <input onChange={(e)=>setTitleUpdate(e.target.value)} value={titleUpdate|| note.title}></input>:<span>{note.title}</span>} <br/>
           {update ===note._id ? <input onChange={(e)=>setDescriptionUpdate(e.target.value)}value={descriptionUpdate || note.description} ></input>:<span>{note.description}</span>} <br/>
          {(noteid===note._id) && <div>
            <button className="btn btn-primary" onClick={deleteNote}>delete</button>
            <button className="btn btn-primary" onClick={()=>updateNote(noteid)}>update</button>
            </div>}
          </div>
          </>
         
        })
        :states.map((note,index) => {
          const date= new Date(note.createdAt).toLocaleString()
          return <div onClick={()=>setNote(note._id)} className="note" key={index}>
            <BsFillClockFill/> {date} <br/>
            <RiStickyNoteFill/>
           {update ===note._id ? <input onChange={(e)=>setTitleUpdate(e.target.value)} value={titleUpdate|| note.title}></input>:<span>{note.title}</span>} <br/>
           {update ===note._id ? <input onChange={(e)=>setDescriptionUpdate(e.target.value)}value={descriptionUpdate || note.description} ></input>:<span>{note.description}</span>} <br/>
          {(noteid===note._id) && <div>
            <button className="btn btn-primary" onClick={deleteNote}>delete</button>
            <button className="btn btn-primary" onClick={()=>updateNote(noteid)}>update</button>
            </div>}
          </div>
        })}
      </div>
    </>

  )
}
export default Dashboard;
