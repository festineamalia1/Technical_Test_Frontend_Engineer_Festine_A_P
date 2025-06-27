import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchData } from "actions";
import LoginForm from "components/LoginForm";

const LandingPage = (props) => {
  useEffect(() => {}, []);
  const [page, setPage] = useState("regis");
  return (
    <>
       
    <div class="container-fluid landing vh-100">
  <div class="row h-100">
     <div className="col-md-6 d-flex align-items-center justify-content-center">
      <div className="w-100">
        <div className="row">

        </div>
        
        <div class="logo mb-2 d-flex align-items-center justify-content-center"> 
          <img src={require(`../assets/images/order-icon.png`)} alt="Logo" className="logo-title w-80 px-2"/> 
          ORDERLIST
          </div>

          
               <LoginForm/>
            
             

   
</div>
</div>
     <div className="col-md-6 d-flex align-items-center justify-content-center">
        
      <img
                          src={require(`../assets/images/order-wall.jpg`)}
                          alt="Illustration"
                          className="vw-100 vh-100 img-fluid img-landing"
                        />
      </div>
  </div>
</div>

    </>
  );
};

const mapStatetoProps = (state) => {
  return { num: state.num, data: state.data, error: state.error };
};

const mapDispatchprops = (dispatch) => {
  return { onFetchData: () => dispatch(fetchData()) };
};

export default connect(mapStatetoProps, mapDispatchprops)(LandingPage);
