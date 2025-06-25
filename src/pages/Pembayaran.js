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

export default function Pembayaran() {
  const idLayanan = useParams()
const location = useLocation();
  console.log("location", location)
  const [userData, setUserData] = useState([]);
  const [dataBalance, setDataBalance] = useState([]);
const TOKEN = localStorage.getItem('token')
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

   const handleTransaksi = (e) => {
       e.preventDefault();
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      'Authorization': `Bearer ${TOKEN}`
    };
    axios
      .post(
        `${API}/transaction`,
       {
        service_code: idLayanan.id
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
         
        <div>Pembayaran</div>
        <div className="fw-bold fs-5"> 
          <img src={require(`../assets/images/Listrik.png`)} alt="Logo"  style={{maxWidth: '40px'}}/>  
          &nbsp;Nominal Top Up
          </div>
      </div>
    </div>
     

        </div>
        <div className="row mt-5">
          <div className="col ">
      <form className="">
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Masukkan Nominal Anda"
                value={location?.state?.tarif}
              />
            </div>
            <button type="submit" className="btn btn-danger w-100"
            onClick={(e) => handleTransaksi(e)}
            >Bayar</button>
          
          </form>
     </div>
     
        </div>
      </div>
    </section>
   
    </>
  );
}
