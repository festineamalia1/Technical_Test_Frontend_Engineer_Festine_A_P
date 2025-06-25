import React, { useEffect, useContext, useState } from "react";
import NavBar from "../components/NavBar";
import CardLayanan from "../components/CardLayanan"
import ProfileSaldo from "../components/ProfileSaldo"
import moment from "moment";
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

export default function Transaksi() {
  const [userData, setUserData] = useState([]);
  const [dataBalance, setDataBalance] = useState([]);




        const [dataHistory, setDataHistory] = useState([]);

const TOKEN = localStorage.getItem('token')
console.log('TOKEN', TOKEN)
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

    const [count, setCount] = useState(1);
 const increment = () => {
    setCount(count + 1);
    fetchTransaksiHistory(count)
  };

  console.log("count", count)

  const fetchTransaksiHistory = (c=0) => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      'Authorization': `Bearer ${TOKEN}`
    };
    axios
      .get(
        `${API}/transaction/history?offset=0&limit=${5 + c}`,
        {
          headers: headers,
        }
      )
      .then(function (response) {
        console.log(response);
        
       setDataHistory(response)
      })
      .catch(function (error) {
        console.log(error);
        alert(
          error.response.data.message
        );
      });
  };


    

   const handleFormatUang = (uang) => {
      const formatUang = uang?.toLocaleString('id-ID', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

    return  formatUang;
  };

console.log('history', dataHistory)

  useEffect(() => {
    fetchDataProfile();
    fetchDataBalance();
    fetchTransaksiHistory();
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
         
       
        <div className="fw-bold fs-5"> 
        Semua Transaksi
          </div>
      </div>
    </div>
     

        </div>
           {dataHistory?.data?.data?.records &&
                      dataHistory?.data?.data?.records.map((data, i) => (
        <div className="row mt-3">
           
         <div class="card">
  <div class="card-body">
    <div className="row">
      <div className="col">
        <div className="row">
           <div className={`fw-bold fs-5 ${data.transaction_type == "TOPUP" ? `font-transaksi-plus` : data.transaction_type == "PAYMENT" ? `font-transaksi-min` : ''}`}> 
            {data.transaction_type == "TOPUP" ? "+ " : data.transaction_type == "PAYMENT" ? "- " : ''}
             RP. {handleFormatUang(data.total_amount)}
          </div>
        </div>
        <div className="row">
          <span>{moment(data.created_on).format('MMMM Do YYYY, h:mm:ss a')}</span>
          </div>
      </div>
      <div className="col d-flex  justify-content-end">
        <span>{data.description}</span>
      </div>
    </div>
  </div>
</div>

     
        </div>
        ))} 
        <div className="row mt-3 mb-5">
          <div className="col d-flex align-items-center justify-content-center">
              <div className="font-transaksi" onClick={increment} >Show More</div>
          </div>
        </div>
      </div>
    </section>
   
    </>
  );
}
