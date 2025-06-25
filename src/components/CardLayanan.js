import React, { useState, useRef, useContext } from "react";
import { connect } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

// import Profil from "assets/images/usernav.png";
// import Logout from "assets/images/logout.svg";
import { API } from "config/api";
const CardLayanan = ({fotoService, namaLayanan, idLayanan, tarifLayanan}) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const navigate = useNavigate();

  return (
    <>
      {/* isLoading || !chanels.chanels ? ( // <h1>Loading...</h1>
      ) : error ? ( // <h1>error {error.message} </h1>
       ) : */}
<div className="card border-0 card-layanan"
onClick={() => navigate(`/bayar/${idLayanan}`,{state:{tarif:tarifLayanan}})}
>
  <div className="row d-flex align-items-center justify-content-center">
  <img src={fotoService} alt="Logo"  style={{maxWidth: '80px'}}/> 

    <span className="text-layanan text-center pt-2">{namaLayanan}</span>
 
  </div>
</div>
    </>
  );
}

const mapStatetoProps = (state) => {
  return { statusLog: state.status };
};

export default connect(mapStatetoProps)(CardLayanan);