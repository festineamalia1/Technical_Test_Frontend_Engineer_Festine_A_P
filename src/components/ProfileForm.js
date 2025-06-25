import React, { useState, useEffect } from "react";

import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";
import { Link, useNavigate  } from "react-router-dom";
import { API, setAuthToken } from "config/api";
import { connect } from "react-redux";
import { handleLogin } from "actions";
import axios from "axios";

const ProfileForm = ({dataProfile}) => {
  const navigate = useNavigate ();
   const [edit, setEdit] = useState(false);
 const TOKEN = localStorage.getItem('token')
  const [userEmail, setUserEmail] = useState(dataProfile?.data?.data?.email);
  const [firstName, setFirstName] = useState(dataProfile?.data?.data?.first_name);
  const [lastName, setLastName] = useState(dataProfile?.data?.data?.last_name);

  console.log("dataProfileEdit Email", userEmail);
  console.log("dataProfileEdit first", firstName);
  console.log("dataProfileEdit last", lastName);

const handleEditProfile = (e) => {
       e.preventDefault();
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      'Authorization': `Bearer ${TOKEN}`
    };
    axios
      .put(
        `${API}/profile/update`,
       {
         first_name: firstName,
          last_name: lastName
},
        {
          headers: headers,
        }
      )
      .then(function (response) {
        console.log(response);
        alert("Berhasil di bayar");
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
        alert(
          error.response.data.message
        );
      });
  };
  const StatusLog = window.localStorage.getItem("LogStatus");

  const handleLogout= () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
   <>
    {/* <div class="col d-flex align-items-center justify-content-center mx-8">Nama Profile</div> */}
   <div class="form-heading d-flex align-items-center justify-content-center mx-8">{lastName} {lastName}</div>
  <div className="row mt-5">
     <form className="px-5">
            <div className="mb-3">
              <input type="email" className="form-control" placeholder="Masukkan email anda"
              value={userEmail}
              onChange={(e) => {setUserEmail(e.target.value)}}
              />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Nama depan"
                 value={firstName}
              onChange={(e) => {setFirstName(e.target.value)}}
              />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Nama belakang"
              value={lastName}
              onChange={(e) => {setLastName(e.target.value)}}
              />
            </div>
          </form>
          </div>

            
              {
                edit == true ?
                 <div className="row px-5">
                  <button type="button" 
                  class="btn btn-outline-danger w-100"
                  onClick={(e) => {handleEditProfile(e)}}
                  >Simpan</button>
                  </div>
                  :
                  <>
                   <div className="row px-5">
                  <button type="button" 
                  class="btn btn-outline-danger w-100"
                  onClick={() => {setEdit(true)}}
                  >Edit Profile</button>
                  </div>
                    <div className="row mt-3 px-5">
           <button type="button" className="btn btn-danger w-100"
           onClick={() => handleLogout()}
           >Logout</button>
        </div>
                  </>
              }
           
             
      
       

   </>
    
          
  
  );
};

const mapStatetoProps = (state) => {
  return { statusLog: state.status };
};

const mapDispatchprops = (dispatch) => {
  return { onHandleLogin: () => dispatch(handleLogin()) };
};

export default connect(mapStatetoProps, mapDispatchprops)(ProfileForm);
