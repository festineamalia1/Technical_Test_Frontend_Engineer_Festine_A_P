import React, { useState, useRef, useContext } from "react";
import { connect } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode} from 'swiper/modules';
import { Link, useNavigate } from "react-router-dom";

// import Profil from "assets/images/usernav.png";
// import Logout from "assets/images/logout.svg";
import { API } from "config/api";
const FilterOrder = ({fotoService, namaLayanan, idLayanan, tarifLayanan}) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const navigate = useNavigate();

  return (
    <>
     <div className="row mt-5">
    <div className="col p-0">
          <div className="input-group">
         <span className="input-group-text bg-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#bcbcbc" class="bi bi-search-heart" viewBox="0 0 16 16">
            <path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018"/>
            <path d="M13 6.5a6.47 6.47 0 0 1-1.258 3.844q.06.044.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11"/>
          </svg>
         </span>
       
         <input type="text" className="form-control border-start-0" placeholder="Cari Goods Name" />
       </div>
    
    </div>
    <div className="col-md-auto  d-flex   justify-content-end">
        
      <button type="button" class="btn btn-primary"
                        >Cari</button>
                        
    </div>

    </div>

     <div className="row mt-2">
        <div class="card px-0">
           <div class="card-body ">
            <div className="row pt-3 px-4">
              <div className="col-sm-3">
                <div className="row">
                  <div  className="button button-filter-pop">Origin</div>
                </div>
                <div className="row">
                  <div  className="button button-filter-pop">Destination</div>
                </div>
              
                
              </div>
              <div className="col"></div>
            </div>
           </div>
             <div class="card-footer">
       <div className="row d-flex   justify-content-end" >
        <div className="col-sm-auto p-0">
          <button type="button" class="btn btn-secondary"
                        >Reset</button>
        </div>
        <div className="col-sm-auto">
          <button type="button" class="btn btn-info"
                        >Terapkan</button>
        </div>
                                 
 
                      
                           </div>
            </div>
        </div>
     </div>
    </>
  );
}

const mapStatetoProps = (state) => {
  return { statusLog: state.status };
};

export default connect(mapStatetoProps)(FilterOrder);