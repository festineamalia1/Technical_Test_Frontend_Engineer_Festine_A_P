import React, { useEffect, useContext, useState } from "react";
import NavBar from "../components/NavBar";
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
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination, Autoplay} from 'swiper/modules';
import TableOrder from "../components/TableOrder"
import FilterOrder from "../components/FilterOrder"

// import Barang from "../assets/images/barang1.jpg";

export default function Home() {

const navigate = useNavigate();

  const [dataOrder, setDataOrder] = useState([]);

const TOKEN = localStorage.getItem('token')
console.log('TOKEN', TOKEN)



     const fetchDataOder = () => {
      //  e.preventDefault();
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    axios
      .post(
        `${API}/orders`,
       {
    keyword: "",
    filter: {
        order_status: [
            1
        ],
        origin_code: [],
        destination_code: []
    },
    page: 1
}
      )
      .then(function (response) {
        console.log(response);
        // alert("tambah Data Berhasil");
        // window.location.reload();
        setDataOrder(response)
      })
      .catch(function (error) {
        console.log(error);
        alert(
          error.response.data.message
        );
      });
  };

   const handleDataOder = (status) => {
        // e.preventDefault();
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    axios
      .post(
        `${API}/orders`,
       {
    keyword: "",
    filter: {
        order_status: [
            status
        ],
        origin_code: [],
        destination_code: []
    },
    page: 1
}
      )
      .then(function (response) {
        console.log(response);
        // alert("tambah Data Berhasil");
        // window.location.reload();
        setDataOrder(response)
      })
      .catch(function (error) {
        console.log(error);
        alert(
          error.response.data.message
        );
      });
  };




  

console.log("dataOrder", dataOrder?.data?.summary_do)



  useEffect(() => {
    fetchDataOder();
  }, []);

  
 

  return (
    <>
    <div className="container-fluid">
 <NavBar />
    </div>

    <section id="layanan">
      <div className="container">
        <div className="row mt-5">
           
              <div class="card text-center py-3">
            
              <div class="card-body">
                 <Swiper
                    slidesPerView={5}
                    spaceBetween={5}
                    freeMode={true}
                  
                    modules={[FreeMode]}
                    className="mySwiper"
                  >
                    {dataOrder?.data?.summary_do && dataOrder?.data?.summary_do.map((data, i) => ( 
                    <SwiperSlide> 
                     
                        {
                          data?.status == 0 ?
                          <div  className="button button-filter py-2"
                          onClick={() => {handleDataOder(data?.status)}}
                          >
                          <div className="my-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check2-all" viewBox="0 0 16 16">
                                <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0"/>
                                <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708"/>
                              </svg>
                              &nbsp;Semua Do
                        </div>
                        </div>
                          : data?.status == 1 ?
                           <div  className="button button-filter py-2"  onClick={() => {handleDataOder(data?.status)}}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-earmark-spreadsheet" viewBox="0 0 16 16">
                                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V9H3V2a1 1 0 0 1 1-1h5.5zM3 12v-2h2v2zm0 1h2v2H4a1 1 0 0 1-1-1zm3 2v-2h3v2zm4 0v-2h3v1a1 1 0 0 1-1 1zm3-3h-3v-2h3zm-7 0v-2h3v2z"/>
                              </svg>&nbsp;Sedang&nbsp;Dijadwalkan

                              </div>
                             
                          : data?.status == 2 ?
                           <div className="button button-filter py-2"  onClick={() => {handleDataOder(data?.status)}}>
                               <div className="my-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-earmark-spreadsheet-fill" viewBox="0 0 16 16">
                                <path d="M6 12v-2h3v2z"/>
                                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M3 9h10v1h-3v2h3v1h-3v2H9v-2H6v2H5v-2H3v-1h2v-2H3z"/>
                              </svg>
                               &nbsp;Terjadwal
                              </div>
                              </div>
                          : data?.status == 3 ?
                            <div className="button button-filter py-2"  onClick={() => {handleDataOder(data?.status)}}>
                            <div className="my-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                              </svg>
                               &nbsp;Dalam Pengiriman
                              </div>
                              </div>
                          : data?.status == 4 ?
                           <div className="button button-filter py-2"  onClick={() => {handleDataOder(data?.status)}}>
                               <div className="my-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-send-check-fill" viewBox="0 0 16 16">
                                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 1.59 2.498C8 14 8 13 8 12.5a4.5 4.5 0 0 1 5.026-4.47zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
                                <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686"/>
                              </svg>
                                &nbsp;Tiba Dimuat
                              </div>
                              </div>
                          :''
                        }
                         
                       
                       
                      </SwiperSlide>
                      ))}
                      
                  </Swiper>
            
               
              </div>
              
            </div>
        </div>
      
            <FilterOrder/>
        

        <div className="row mt-3">
         <TableOrder dataOrder={dataOrder}/>
        </div>
      </div>
    </section>
   
    </>
  );
}
