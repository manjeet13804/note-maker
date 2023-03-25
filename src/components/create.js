import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./create.css"
const Create = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    })
    const addNote = (e) => {
        e.preventDefault();

        axios.post('https://note-maker-backend.onrender.com/api/blogs', formData,
            {
                headers: {
                    authorization: localStorage.getItem('token')
                }

            })
            .then(function (response) {
                console.log(response)
                console.log(response.data);
                alert(response.data.message);
                setFormData({
                    title: "",
                    description: "",
                })
                if (response.data.message === "success") {
                    navigate('/dashboard')
                }
            })
            .catch(function (error) {
                alert(error)
            });
    }
    return <>
        <div className="main-create">
            <form action="#">
                <label htmlFor="title">Title</label><br />
                <input required className="input-data" placeholder="Title" value={formData.title} onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value })
                }} /><br />
                <label required htmlFor="decription">Description</label><br />
                <textarea className="input-data" id="input-data" placeholder="What is on your mind" value={formData.description} onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value })
                }} /><br />
                <button className="btn1" onClick={addNote}>Add Notes</button>
            </form>
        </div>
    </>
}
export default Create;