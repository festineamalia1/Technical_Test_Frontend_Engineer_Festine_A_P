import React, { useEffect, useState, useRef } from "react";
import NavBar from "../components/NavBar";
import ProfileForm from "../components/ProfileForm"
import {
  Container,
  Row,
  Col,
  Image,
  Jumbotron,
  Button,
  Form,
  Table,
  Modal,
  Spinner,
} from "react-bootstrap";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { API } from "config/api";
import axios from "axios";
  import 'bootstrap-icons/font/bootstrap-icons.css';

// import Barang from "../assets/images/barang1.jpg";

export default function AkunPage() {
 const TOKEN = localStorage.getItem('token')
const navigate = useNavigate();
 const hiddenFileInput = useRef(null);
  const [fileName, setFileName] = useState("");
  // const handleFile = (file) => {
  //   setFileName(file.name);
  // };

  console.log("fileName", fileName)

  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const handleChange = (e) => {


        e.preventDefault();
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      'Authorization': `Bearer ${TOKEN}`
    };
    axios
      .put(
        `${API}/profile/image`,
       {
         file: e.target.files[0],
},
        {
          headers: headers,
        }
      )
      .then(function (response) {
        console.log(response);
        alert("Berhasil Upload");
         window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
        alert(
          error.response.data.message
        );
      });
  };

  const [userData, setUserData] = useState([]);
 const [files, setFiles] = useState();
 const [loading, setIsLoading] = useState([]);
 
  const fetchDataAkun = () => {
    setIsLoading(true);
    axios
      .get(`${API}/profile`, 
        {
    headers: {
        'Authorization': `Bearer ${TOKEN}`
    }
}
)
      .then(function (response) {
       setIsLoading(false);
       setUserData(response)
      })
      .catch(function (error) {
        console.log(error);
      });
  };
 
console.log("userData", userData)
 

 

 
  useEffect(() => {
 fetchDataAkun()
  }, []);



  return (
    <>
    <div className="container-fluid">
 <NavBar />
    </div>
    

    <section id="profile">
      <div className="container">
        <div className="row  mt-5">
          <div className="col d-flex align-items-center justify-content-center">
               
          <div className="avatar-container" onClick={handleClick} >
  <img src={userData?.data?.data?.profile_image} alt="Avatar" className="avatar-img"/>
  <div className="edit-icon">
 
    <i className="bi bi-pencil-fill"></i>
  
  </div>
</div>
      <input
        type="file"
        onChange={(e) => {handleChange(e)}}
        ref={hiddenFileInput}
        style={{ display: "none" }}
      />
</div>
        </div>
      {
        loading == true ?
        <div className="row mt-5">
            <div className="col d-flex align-items-center justify-content-center">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        </div>
        </div>
   
        :
      <ProfileForm dataProfile={userData}/>
      }
     
      </div>
    </section>
   
    </>
  );
}
