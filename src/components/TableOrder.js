import React, { useState, useRef, useContext } from "react";
import { connect } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
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
  Badge
} from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

// import Profil from "assets/images/usernav.png";
// import Logout from "assets/images/logout.svg";
import { API } from "config/api";
const TableOrder = ({dataShipment, dataTransporter, dataVehicle}) => {


  const [idTransporter, setIdTransporter] = useState();
    const [asal, setAsal] = useState();
     const [idEdit, setIdEdit] = useState();
     const [idHapus, setIdHapus] = useState();
      const [tujuan, setTujuan] = useState();
       const [vehicle, setVehicle] = useState();
         const [smShow, setSmShow] = useState(false);
  const target = useRef(null);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
   const [show2, setShow2] = useState(false);
   const handleClose = () => setShow(false);
      const handleClose2 = () => setShow2(false);
  const handleEdit = (data) => {
    setShow(true)
    setIdEdit(data?.id_shipment)
    setAsal(data?.loc_asal)
    setTujuan(data?.loc_tujuan)
    setVehicle(data?.id_vehicle)
     setIdTransporter(data?.id_transporter)
  };

  const popover = (
  <Popover id="popover-basic">
    <Popover.Header as="h3">Hapus Data</Popover.Header>
    <Popover.Body>
      <div className="row px-3">
    
          Apakah anda yakin menghapus data ini ?
          
      </div>
    <div className="row d-flex   justify-content-end px-3">
      {/* <span className="badge badge-secondary">cancel</span>&nbsp;/&nbsp;<span className="badge badge-secondary">yes</span> */}
    <div  className="col-auto">
    <h5 > 
      <Badge bg="primary" trigger="click">
      cancel
    </Badge>
    </h5>
    </div>
       <div  className="col-auto p-0">
   <h5>
      <Badge bg="secondary">
      Yes
    </Badge>
   </h5>
   </div>
    
      
      </div>
      
    </Popover.Body>
  </Popover>
);


const handleEditData = ( e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    axios
      .post(
        `${API}/shipments/edit/${idEdit}`,
        {

             loc_asal: asal,
      loc_tujuan: tujuan,
      id_transporter: idTransporter,
      id_vehicle: vehicle,
      create_time: "2025-06-17 19:12:50",
        id_user : 1
        }
      )
      .then(function (response) {
     
        alert("Edit Data Berhasil");
         window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
        alert(
          "tambah Data Gagal, Nama Barang Pastikan berbeda, untuk harga beli, harga jual dan stok hanya dapat di isi angka"
        );
      });
  };
  const handleOpenHapus = (id) => {
    setSmShow(true)
    setIdHapus(id)
  }

  const handleHapus = () => {
   
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    axios
      .post(
        `${API}/shipments/delete/${idHapus}`
      )
      .then(function (response) {
     
        alert("Hapus Data Berhasil");
         window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
        alert(
          "Hapus Data Gagal, Nama Barang Pastikan berbeda, untuk harga beli, harga jual dan stok hanya dapat di isi angka"
        );
      });
  };
 
 
  return (
    <>
      <Table striped bordered hover >
      <thead>
        <tr>
          <th>#</th>
          <th>Do / No</th>
          <th>Goods</th>
          <th>Origin</th>
          <th>Destination</th>
          <th>Address</th>
        
        </tr>
      </thead>
      <tbody>
         {/* {dataShipment?.data?.data &&
                      dataShipment?.data?.data?.map((data, i) => ( */}
        <tr>
          <td>..</td>
              <td>
                <div className="row px-2">
  <div className="col d-flex align-items-center ">
    <div className="row ">
                  sas
                  </div>
                </div>
                            <div className="col">
                                <div className="row d-flex   justify-content-end" >
                                   <OverlayTrigger trigger="click" placement="right" overlay={popover}>
 <button type="button" class="btn btn-warning"
                        >Kelola</button>
                        </OverlayTrigger>
                           </div>
                            </div>
                </div>
              
                        
                          
                         {" "}
                             
                          </td>
          <td>..</td>
          <td>..</td>
          <td>..</td>
           <td>..</td>
         
       
        </tr>
        {/* ))} */}
        
      </tbody>
    </Table>

       
     
          </>
  );
}

const mapStatetoProps = (state) => {
  return { statusLog: state.status };
};

export default connect(mapStatetoProps)(TableOrder);