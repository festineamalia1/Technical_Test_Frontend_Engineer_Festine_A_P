import React, { useState, useRef, useContext } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { API, BASE_URL } from "config/api";
const NavBar = (props) => {
  const [active, setActive] = useState(false);
  const target = useRef(null);
  const navigate = useNavigate();

  const handleMenu = (link) => {
    navigate(`/${link}`)
    setActive(true)
  }

  return (
    <>
     
<nav class="navbar navbar-expand-lg bg-white border-bottom">
    <div class="container">
      <a class="navbar-brand d-flex align-items-center">
         <div class="logo d-flex align-items-center justify-content-center"  onClick={() => navigate(`/home`)}> 
         
         <img src={require(`../assets/images/order-icon.png`)} alt="Logo" className="logo-title w-80 px-2"/> 
          ORDERLIST
          </div>

      </a>

      <div class="ms-auto">
        <ul class="navbar-nav flex-row gap-3">
      
          <li className="nav-item nav-link-nonactive">
            <div class="nav-link " 
            onClick={() => {navigate('/')}}>Logout</div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
    </>
  );
}

const mapStatetoProps = (state) => {
  return { statusLog: state.status };
};

export default connect(mapStatetoProps)(NavBar);