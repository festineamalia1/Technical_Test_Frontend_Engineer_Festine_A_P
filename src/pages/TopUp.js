import React, { useEffect, useContext, useState } from "react";
import NavBar from "../components/NavBar";
import CardLayanan from "../components/CardLayanan"
import ProfileSaldo from "../components/ProfileSaldo"
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

// import Barang from "../assets/images/barang1.jpg";

export default function TopUp() {

    const [userData, setUserData] = useState([]);
    const [dataBalance, setDataBalance] = useState([]);
    const [nominalTopup, setNominalTopup] = useState();
  
  
  const TOKEN = localStorage.getItem('token')
 
const navigate = useNavigate();

const fetchDataProfile = () => {
    // setIsLoading(true);
    axios
      .get(`${API}/profile`, 
        {
    headers: {
        'Authorization': `Bearer ${TOKEN}`
    }
}
)
      .then(function (response) {
        // setIsLoading(false);
       setUserData(response)
      })
      .catch(function (error) {
        console.log(error);
      });
  };



  const fetchDataBalance = () => {
    // setIsLoading(true);
    axios
      .get(`${API}/balance`, 
        {
    headers: {
        'Authorization': `Bearer ${TOKEN}`
    }
}
)
      .then(function (response) {
        // setIsLoading(false);
       setDataBalance(response)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

    const handleToUp = (e) => {
      e.preventDefault();
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      'Authorization': `Bearer ${TOKEN}`
    };
    axios
      .post(
        `${API}/Topup`,
        {
          
          top_up_amount: nominalTopup
        },
        {
          headers: headers,
        }
      )
      .then(function (response) {
        console.log(response);
        alert("Dana Berhasil di Top UP");
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
        alert(
          "Dana Gagal di Top UP"
        );
      });
  };

   useEffect(() => {
      fetchDataProfile();
      fetchDataBalance();
    }, []);

 
  return (
    <>
    <div className="container-fluid">
 <NavBar />
    </div>
    <section id="profile-saldo">
        <ProfileSaldo
              firstName={userData?.data?.data?.first_name}
              lastName={userData?.data?.data?.last_name}
              foto={userData?.data?.data?.profile_image}
              balance={dataBalance?.data?.data?.balance}
              />
    </section>

    <section id="layanan">
      <div className="container">
        <div className="row mt-5">
            <div className="col-md-4 d-flex align-items-center mb-3 mb-md-0">
     
      <div>
         
        <div>Silahkan Masukan,</div>
        <div className="fw-bold fs-5">Nominal Top Up</div>
      </div>
    </div>
     

        </div>
        <div className="row mt-5">
          <div className="col-md-7 ">
      <form className="">
            <div className="mb-3">
              <input type="text" className="form-control" 
              placeholder="Masukkan Nominal To up"
              value={nominalTopup}
              onChange={(e) => setNominalTopup(e.target.value)}
              />
            </div>
           
            
            <button type="submit" className="btn btn-danger w-100"
            onClick={(e) => handleToUp(e)}
            >Top Up</button>
          
          </form>
     </div>
     <div className="col-md-5 ">
      <div className="row mb-3">
        <div className="col">
          <button type="button" className="btn btn-outline-secondary w-100"
          onClick={() => setNominalTopup(10000)}
          >Rp. 10.000</button>
        </div>
        <div className="col">
          <button type="button" className="btn btn-outline-secondary w-100"
          onClick={() => setNominalTopup(20000)}
          >Rp. 20.000</button>
          </div>
        <div className="col">
          <button type="button" className="btn btn-outline-secondary w-100"  onClick={() => setNominalTopup(30000)}>Rp. 30.000</button>
        </div>

      </div>
       <div className="row">
       <div className="col">
          <button type="button" className="btn btn-outline-secondary w-100" onClick={() => setNominalTopup(100000)}>Rp. 100.000</button>
        </div>
        <div className="col">
          <button type="button" className="btn btn-outline-secondary w-100"
          onClick={() => setNominalTopup(250000)}>Rp. 250.000</button>
          </div>
        <div className="col">
          <button type="button" className="btn btn-outline-secondary w-100"onClick={() => setNominalTopup(500000)}>Rp. 500.000</button>
        </div>
      </div>
     </div>
        </div>
      </div>
    </section>
   
    </>
  );
}
