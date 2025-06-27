import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import {useNavigate} from "react-router-dom";
import { API } from "config/api";
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination, Autoplay} from 'swiper/modules';
import TableOrder from "../components/TableOrder";

export default function Home() {


  const [dataOrder, setDataOrder] = useState([]);
const [show, setShow] = useState(false);

const [keyword, setKeyword] = useState('');
const [orderType, setOrderType] = useState('');
const [orderName, setOrderName] = useState('');
const [createAt, setCreateAt] = useState('');
const [updateAt, setUpdateAt] = useState('');
const [filterActive, setFilterActive] = useState(0);
const [origin, setOrigin] = useState([]);
const [destination, setDestination] = useState([]);
const TOKEN = localStorage.getItem('token')
const [loading, setLoading] = useState(false);
const [hasMore, setHasMore] = useState(true);
const [page, setPage] = useState(1);
const [checkUpdate, setCheckUpdate] = useState(false);
const [checkCreate, setCheckCreate] = useState(false);


const handleCheckCreate = () => {
  setCheckCreate(true)
  setCheckUpdate(false)
  setUpdateAt('')
}

const handleCheckUpdate = () => {
  setCheckUpdate(true)
  setCheckCreate(false)
  setCreateAt('')
}

     const fetchDataOder = () => {
      setLoading(true)
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
    page: page
}
      )
      .then(function (response) {
         setLoading(false)
        console.log(response);
         setPage(prev => prev + 1);
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
      setPage(prev => prev + 1);
        // e.preventDefault();
        setFilterActive(status)
         setLoading(true)
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    axios
      .post(
        `${API}/orders`,
       {
    keyword: keyword,
    filter: {
        order_status: [status],
        origin_code: origin,
        destination_code: destination,
        order_type:[orderType],
        order_type_name:[orderName],
        created_at:[createAt],
        updated_at:[updateAt]

    },
    page: page
}
      )
      .then(function (response) {
         setLoading(false)
        console.log(response);
        setDataOrder(response)
      setPage(page + 1);
      })
      .catch(function (error) {
        console.log(error);
        alert(
          error.response.data.message
        );
      });
  };



  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 100 >= document.documentElement.offsetHeight && !loading) {
      handleDataOder(filterActive)
    }
  };

     const handleReset = () => {
          setKeyword('')
          setOrderType('')
          setOrderName('')
          setCreateAt('')
          setUpdateAt('')
     }

    const handleOrigin = () => {
           setOrigin(['BDG', 'JKT', 'SBY', 'DPS', 'MLG'])
           setDestination([])
     }

       const handleDestination = () => {
           setDestination(['MDN', 'BJM', 'PKU', 'PLB', 'BPN'])
           setOrigin([])
     }



  const handleCari = () => {
     setOrigin(['BDG', 'JKT', 'SBY', 'DPS', 'MLG'])
     setShow(true)
  }


  useEffect(() => {
    fetchDataOder();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
breakpoints={{
         560: {
          slidesPerView: 1.3,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 2.3,
          spaceBetween: 10,
        },
      
        768: {
          slidesPerView: 3.3,
          spaceBetween: 10,
        },
         790: {
          slidesPerView: 3.8,
          spaceBetween: 10,
        },
         900: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
         980: {
          slidesPerView: 4.3,
          spaceBetween: 10,
        },
         990: {
          slidesPerView: 4.8,
          spaceBetween: 10,
        }
      }}
       pagination={{ clickable: true }} 
                  
                    modules={[FreeMode, Pagination]}
                    className="mySwiper"
                  >
                    {dataOrder?.data?.summary_do && dataOrder?.data?.summary_do.map((data, i) => ( 
                    <SwiperSlide> 
                     
                        {
                          data?.status == 0 ?
                          <div  className={`button button-filter py-2 
                            ${
                            filterActive === 0?
                              `button-filter-active`
                              :``}
                          `}
                          onClick={() => {handleDataOder(data?.status)}
                          }
                          >
                          <div className="my-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check2-all" viewBox="0 0 16 16">
                                <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0"/>
                                <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708"/>
                              </svg>
                              &nbsp;Semua&nbsp;Do&nbsp;{'('+ data.total + ')'}
                        </div>
                        </div>
                          : data?.status == 1 ?
                           <div  className={`button button-filter py-2
                             ${
                            filterActive === 1?
                              `button-filter-active`
                              :``}
                            `}
                           onClick={() => {handleDataOder(data?.status)}}
                           >
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-earmark-spreadsheet" viewBox="0 0 16 16">
                                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V9H3V2a1 1 0 0 1 1-1h5.5zM3 12v-2h2v2zm0 1h2v2H4a1 1 0 0 1-1-1zm3 2v-2h3v2zm4 0v-2h3v1a1 1 0 0 1-1 1zm3-3h-3v-2h3zm-7 0v-2h3v2z"/>
                              </svg>&nbsp;Sedang&nbsp;Dijadwalkan&nbsp;{'('+ data.total + ')'}

                              </div>
                             
                          : data?.status == 2 ?
                           <div className={`button button-filter py-2
                             ${
                            filterActive === 2?
                              `button-filter-active`
                              :``}
                            `}  
                           onClick={() => {handleDataOder(data?.status)}}
                           >
                               <div className="my-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-earmark-spreadsheet-fill" viewBox="0 0 16 16">
                                <path d="M6 12v-2h3v2z"/>
                                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M3 9h10v1h-3v2h3v1h-3v2H9v-2H6v2H5v-2H3v-1h2v-2H3z"/>
                              </svg>
                               &nbsp;Terjadwal&nbsp;{'('+ data.total + ')'}
                              </div>
                              </div>
                          : data?.status == 3 ?
                            <div className={`button button-filter py-2
                               ${
                            filterActive === 3?
                              `button-filter-active`
                              :``}
                              `} 
                            onClick={() => {handleDataOder(data?.status)}}
                            >
                            <div className="">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                              </svg>&nbsp;Dalam Pengiriman&nbsp;{'('+ data.total + ')'}
                              </div>
                              </div>
                          : data?.status == 4 ?
                           <div className={`button button-filter py-2
                             ${
                            filterActive === 4?
                              `button-filter-active`
                              :``}
                            `}  
                         onClick={() => {handleDataOder(data?.status)}}
                           >
                               <div className="my-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-send-check-fill" viewBox="0 0 16 16">
                                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 1.59 2.498C8 14 8 13 8 12.5a4.5 4.5 0 0 1 5.026-4.47zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
                                <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686"/>
                              </svg>
                                &nbsp;Tiba Dimuat&nbsp;{'('+ data.total + ')'}
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
      
            {
  show === true ?
  <div className="row mt-5">
        <div class="card px-0">
           <div class="card-body ">
            <div className="row pt-3 px-4">
              <div className="col-sm-2">
                <div className="row">
                  <div  className={`button button-filter-pop ${
                    origin.length === 0 ?
                    ``
                    :`button-filter-pop-active`
                  }`}
                    onClick={()=> handleOrigin()}
                  >Origin</div>
                </div>
                <div className="row">
                  <div  className={`button button-filter-pop ${
                    destination.length === 0?
                    ``
                    :`button-filter-pop-active`
                  }`}
                    onClick={()=> handleDestination()}

                  >Destination</div>
                </div>
              </div>
              <div className="col ">
             <div className="row ">
    <div className="col">
          <div className="input-group">
         <span className="input-group-text bg-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#bcbcbc" class="bi bi-search-heart" viewBox="0 0 16 16">
            <path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018"/>
            <path d="M13 6.5a6.47 6.47 0 0 1-1.258 3.844q.06.044.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11"/>
          </svg>
         </span>
       
         <input type="text" className="form-control border-start-0" placeholder="Cari Goods Name" 
          value={keyword}
         onChange={(e) => setKeyword(e.target.value)}
         />
       </div>
    
    </div>
    <div className="col-md-auto  d-flex   justify-content-end">
        
      <button type="button" class="btn btn-outline-secondary"
      onClick={() => setKeyword('')}
      >X</button>
                        
    </div>

    </div>
    <div className="row mt-3">
      <div className="col">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="SINGLE" id="defaultCheck1"
          checked={
            orderType === "SINGLE" ?
            true : false
          }
          onChange={(e) => setOrderType(e.target.value)}
          />
          <label className="form-check-label" for="defaultCheck1">
            <span className="text-secondary" > <small>Single</small></span>
          </label>
        </div>


        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="MULTI" id="defaultCheck1"
          checked={
            orderType === "MULTI" ?
            true : false
          }
            onChange={(e) => setOrderType(e.target.value)}
          />
          <label className="form-check-label" for="defaultCheck1">
            <span className="text-secondary"> <small>Multiple</small></span>
          </label>
        </div>
        <div className="form-check">
         
         
            <div className="row">
              <div className="col-sm-auto d-flex align-items-center">
                 <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"
                 checked={
                  checkCreate === true?
                  true : false 
                 }
                 onChange={() => handleCheckCreate()}
                 />
                 &nbsp;
                 <label className="form-check-label" for="defaultCheck1">
                <span className="text-secondary"> <small>Created At:</small></span>
                </label>
               
                </div>
              <div className="col-sm-5 p-0">
                <input type="date" className="form-control date-form" placeholder="Masukan tanggal"
                value={createAt} 
                onChange={(e) => setCreateAt(e.target.value)}
                disabled={
                checkCreate === true?
                  false : true 
                }
                /></div>
          
              
              </div>
         
        
        </div>
      </div>
      <div className="col">
         <div className="form-check">
          <input className="form-check-input" type="checkbox" value="Kontrak" id="defaultCheck1"
            checked={
            orderName === "Kontrak" ?
            true : false
          }
          onChange={(e) => setOrderName(e.target.value)}
          />
          <label className="form-check-label" for="defaultCheck1"
          >
            <span className="text-secondary"> <small>Kontrak </small></span>
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="Non-Kontrak" id="defaultCheck1"
             checked={
            orderName === "Non-Kontrak" ?
            true : false
          }
          onChange={(e) => setOrderName(e.target.value)}/>
          <label className="form-check-label" for="defaultCheck1">
            <span className="text-secondary"> <small>Non Kontrak</small></span>
          </label>
        </div>
          <div className="form-check">
            <div className="row">
              <div className="col-sm-auto d-flex align-items-center">
                 <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"
                  checked={
                  checkUpdate === true?
                  true : false 
                 }
                  onChange={() => handleCheckUpdate()}
                 />
                 &nbsp;
                 <label className="form-check-label" for="defaultCheck1">
                <span className="text-secondary"> <small>Updated At:</small></span>
                </label>
                </div>
              <div className="col-sm-5 p-0">
                <input type="date" className="form-control date-form" placeholder="Masukan tanggal" 
                value={updateAt}
                onChange={(e) => setUpdateAt(e.target.value)}
                disabled={checkUpdate === true?
                  false : true }
                
                /></div>
              </div>
        </div>
      </div>
    </div>
              </div>
            </div>
            
           </div>
             <div class="card-footer">
       <div className="row d-flex   justify-content-end" >
        
         <div className="col-sm-auto">
          <button type="button" class="btn btn-light"
           onClick={() => {setShow(false)}}>Close</button>
        </div>
        <div className="col-sm-auto p-0">
          <button type="button" class="btn btn-secondary"
          onClick={() => handleReset()}
          >Reset</button>
        </div>
        <div className="col-sm-auto">
          <button type="button" class="btn btn-info"
           onClick={() => {handleDataOder(filterActive)}}
          >Terapkan</button>
        </div>
              </div>
            </div>
        </div>
     </div>
     :
      <div className="row mt-5">
    <div className="col p-0">
          <div className="input-group">
         <span className="input-group-text bg-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#bcbcbc" class="bi bi-search-heart" viewBox="0 0 16 16">
            <path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018"/>
            <path d="M13 6.5a6.47 6.47 0 0 1-1.258 3.844q.06.044.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11"/>
          </svg>
         </span>
       
         <input type="text" className="form-control border-start-0" placeholder="Cari Goods Name" 
         value={keyword}
         onChange={(e) => setKeyword(e.target.value)}
         />
       </div>
    
    </div>
    <div className="col-md-auto  d-flex   justify-content-end">
      <button type="button" class="btn btn-primary"
      onClick={() => {handleCari()}}
                        >Cari</button>
                        
    </div>

    </div>
}
        

        <div className="row mt-3">
       
         <TableOrder dataOrder={dataOrder}/>

        </div>
      </div>
    </section>
   
    </>
  );
}