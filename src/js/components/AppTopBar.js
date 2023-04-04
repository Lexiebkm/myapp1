import {useState, useEffect, useCallback, useMemo} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  //useResolvedPath
} from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';

//import logo from './logo.svg';
import './App.css';
import bootstrap from 'bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"

import {ThemeContext, themes} from "./theme-context";
import FormPegawai from "./formpegawai";
import FormSupplier from "./formsupplier";
import DisplayUser from "./displayuser";
import AppCounter from "./appcounter";

import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from './features/counter/counterSlice';

import {
  changeName,
  selectCustomer
} from './features/customer/customerSlice';

import styles from './features/counter/Counter.module.css';

// import bootstrap from 'bootstrap' will load all of Bootstrap’s plugins onto a bootstrap object. 
// The bootstrap module itself exports all of our plugins. 
// You can manually load Bootstrap’s plugins individually by loading the /js/dist/*.js files under the package’s top-level directory.

function App() {
  const [theme, setTheme] = useState(themes.light)

  function toggleTheme () {
      setTheme(theme === themes.light ? themes.primary : themes.light);
      console.log("current theme :", theme);
  }

  return (
      <Router>
          {/*navbar-light style={{backgroundColor: "#e3f2fd"}}*/}
          <nav className="navbar navbar-expand-lg navbar-dark sticky-top bg-info">
          {/*<nav className="navbar navbar-expand-lg navbar-light bg-light">*/}
            <div className="container-fluid">
              <label className="bg-success text-white bg-opacity-75 mr-5 p-2" style={{borderRadius: "5em 3em"}}>Klinik-Apotik Laravel</label>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarScroll">
                <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{bsScrollHeight: "100px"}}>
                  <li className="nav-item dropdown">
                    <Link to="" className="nav-link dropdown-toggle active" id="masterdata" role="button" data-bs-toggle="dropdown" aria-expanded="false">Data Master</Link>
                    <ul className="dropdown-menu" aria-labelledby="masterdata">      
                      <li>
                        <Link to="/masterdata/pegawai" className="dropdown-item">Pegawai</Link>
                      </li>
                      <li>
                        <Link to="/masterdata/supplier" className="dropdown-item">Supplier</Link>
                      </li>                                              
                      <li>
                        <Link to="/masterdata/obat" className="dropdown-item">Obat</Link>
                      </li>                        
                      <li>
                        <Link to="/masterdata/baranglain" className="dropdown-item">Barang Lainnya</Link>
                      </li>
                      <li>
                        <Link to="/masterdata/penyakit" className="dropdown-item">Klasifikasi Penyakit (ICD)</Link>
                      </li>
                      <li>
                        <Link to="/masterdata/reduxcounter" className="dropdown-item">Redux Counter</Link>
                      </li>                      
                    </ul>              
                  </li>

                  <li className="nav-item dropdown">
                    <Link to="" className="nav-link dropdown-toggle active" id="layananpasien" role="button" data-bs-toggle="dropdown" aria-expanded="false">Pelayanan Pasien</Link>
                    <ul className="dropdown-menu" aria-labelledby="layananpasien">
                      <li>
                        <Link to="/layananpasien/pendaftaran" className="dropdown-item">Pendaftaran</Link>
                      </li>
                      <li>
                        <Link to="/layananpasien/rawat" className="dropdown-item">Rawat Inap-Jalan-Darurat</Link>
                      </li>                                                                          
                      <li>
                        <Link to="/layananpasien/rekammedis" className="dropdown-item">Rekam Medis</Link>
                      </li>
                      <li>
                        <Link to="/layananpasien/mcu" className="dropdown-item">Medical Checkup (MCU)</Link>
                      </li>                        
                      <li>
                        <Link to="/layananpasien/layananpasienlain" className="dropdown-item">Pelayanan Pasien Lainnya</Link>
                      </li>                                              
                    </ul>              
                  </li>

                  <li className="nav-item dropdown">
                    <Link to="" className="nav-link dropdown-toggle active" id="dokter" role="button" data-bs-toggle="dropdown" aria-expanded="false">Dokter</Link>
                    <ul className="dropdown-menu" aria-labelledby="dokter">
                      <li>
                        <Link to="/dokter/jadwal" className="dropdown-item">Jadwal Pelayanan</Link>
                      </li>
                      <li>
                        <Link to="/dokter/moduldokterlain" className="dropdown-item">Modul Dokter Lainnya</Link>
                      </li>                                                                          
                    </ul>              
                  </li>

                  <li className="nav-item dropdown">
                    <Link to="" className="nav-link dropdown-toggle active" id="transaksi" role="button" data-bs-toggle="dropdown" aria-expanded="false">Transaksi</Link>
                    <ul className="dropdown-menu" aria-labelledby="transaksi">      
                      <li>
                        <Link to="/transaksi/pembelian" className="dropdown-item">Pembelian</Link>
                      </li>
                      <li>
                        <Link to="/transaksi/penjualan" className="dropdown-item">Penjualan</Link>
                      </li>                        
                      <li>
                        <Link to="/transaksi/transaksilain" className="dropdown-item">Transaksi Lainnya</Link>
                      </li>                                              
                    </ul>              
                  </li>

                  <li className="nav-item">
                    <Link to="" className="nav-link active">Laporan</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="" className="nav-link active">Utilitas</Link>
                  </li>                  
                  <li className="nav-item">
                    <Link to="" className="nav-link active">Profile</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="" className="nav-link active">Setting-Konfigurasi</Link>
                  </li>

                  {/*
                  <li className="nav-item dropdown">
                    <Link to="" className="nav-link dropdown-toggle" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Other Link</Link>
                    <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">      
                      <li>
                        <Link to="/other/mousetracker" className="dropdown-item">Mouse Tracker</Link>
                      </li>
                      <li><hr className="dropdown-divider"></hr></li>
                      <li>
                        <Link to="/other/user" className="dropdown-item">Display User</Link>
                      </li>
                    </ul>              
                  </li>
                  */}
                </ul>

                <div className="d-flex bg-primary">
                  <Link to="/logout" className="nav-link active text-white">Logout</Link>
                </div>

                {/*
                <form className="d-flex">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                  <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                */}
              </div>
            </div>
          </nav>    

          <Switch>
            <Route path="/masterdata/:masterdataId">
              <MasterData theme={theme} changeTheme={toggleTheme} />
            </Route>      

            <Route path="/layananpasien/:layananpasienId">
              <LayananPasien theme={theme} changeTheme={toggleTheme} />
            </Route>      

            <Route path="/dokter/:moduldokterId">
              <ModulDokter theme={theme} changeTheme={toggleTheme} />
            </Route>

            <Route path="/user/:username" component={User} />
            <Route path="/logout" component={Logout} />
            
            <Route path="/">
              <Home />
            </Route>
          </Switch>
      </Router>
  );
}

function MasterData(props) {
    const count = useSelector(selectCount);
    const custname = useSelector(selectCustomer);
    const dispatch = useDispatch();
    const [customername, setCustomername] = useState(custname);

    //let resolvedpath = useResolvedPath();
    let matchedroute = useRouteMatch();
    let params = useParams();
    let { masterdataId } = useParams();
    console.log("params :", params)

    switch (masterdataId) {      
        case "pegawai":
            return (
                <ThemeContext.Provider value={props.theme}>
                  <FormPegawai changeTheme={props.changeTheme} />
                </ThemeContext.Provider>
            )

        case "supplier":
            return <FormSupplier />
        case "reduxcounter":
            return (
                <ThemeContext.Provider value={props.theme}>
                  <AppCounter changeTheme={props.changeTheme} />
                </ThemeContext.Provider>
            )
        case "obat":
        case "baranglain":
            /*
            return (
                <ThemeContext.Provider value={props.theme}>
                  <GetGeneral changeTheme={props.changeTheme} 
                    matchedroute={matchedroute} 
                    routeid={masterdataId}
                    custname={custname} />
                </ThemeContext.Provider>
            )*/

        case "penyakit":
        default:
            return (
              <>
                <h4>Master Data ID: {masterdataId}</h4>
                <h6>Customer : {custname}</h6>
                <span className={styles.value}>{count}</span>
                <div className={styles.row}>
                  <input
                    value={customername}
                    onChange={e => setCustomername(e.target.value)}
                  />
                  <button
                    onClick={() => dispatch(changeName(customername))}
                  >
                  Change Customer Name
                </button>
                </div>            
              </>
            );
    }
}


function LayananPasien(props) {
    let params = useParams();
    let { layananpasienId } = useParams();
    console.log("params :", params)

    switch (layananpasienId) {      
        case "pendaftaran":
        case "rawat":
        case "rekammedis":
        case "mcu":
        default:
            return <h4>Pelayanan Pasien ID: {layananpasienId}</h4>;
    }
}

function ModulDokter(props) {
    let params = useParams();
    let { moduldokterId } = useParams();
    console.log("params :", params)

    switch (moduldokterId) {      
        case "jadwal":
        default:
            return <h4>Modul Dokter ID: {moduldokterId}</h4>;
    }
}

function User(props) {
  return <h1>Hello {props.match.params.username}!</h1>;
}

function Home() {
  //return <h4 className="text-info mt-2 ml-2">Aplikasi Klinik-Apotik</h4>;
  return (
    <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <h2>Slide 1</h2>
          <article>
            <h2>First article</h2>

            <p>Tacos actually microdosing, pour-over semiotics banjo chicharrones retro fanny pack portland everyday carry vinyl typewriter. Tacos PBR&B pork belly, everyday carry ennui pickled sriracha normcore hashtag polaroid single-origin coffee cold-pressed. PBR&B tattooed trust fund twee, leggings salvia iPhone photo booth health goth gastropub hammock.</p>
          </article>          
        </div>
        <div class="carousel-item">
          <h2>Slide 2</h2>
          <article>
            <h2>Second article</h2>

            <p>Tacos actually microdosing, pour-over semiotics banjo chicharrones retro fanny pack portland everyday carry vinyl typewriter. Tacos PBR&B pork belly, everyday carry ennui pickled sriracha normcore hashtag polaroid single-origin coffee cold-pressed. PBR&B tattooed trust fund twee, leggings salvia iPhone photo booth health goth gastropub hammock.</p>
          </article>
        </div>
        <div class="carousel-item">
          <h2>Slide 3</h2>
          <article>
            <h2>Third article</h2>

            <p>Tacos actually microdosing, pour-over semiotics banjo chicharrones retro fanny pack portland everyday carry vinyl typewriter. Tacos PBR&B pork belly, everyday carry ennui pickled sriracha normcore hashtag polaroid single-origin coffee cold-pressed. PBR&B tattooed trust fund twee, leggings salvia iPhone photo booth health goth gastropub hammock.</p>

            <p>Cray food truck brunch, XOXO +1 keffiyeh pickled chambray waistcoat ennui. Organic small batch paleo 8-bit. Intelligentsia umami wayfarers pickled, asymmetrical kombucha letterpress kitsch leggings cold-pressed squid chartreuse put a bird on it. Listicle pickled man bun cornhole heirloom art party.</p>
          </article>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  );  
}


function GetGeneral(props) {
    const [rowData, setRowData] = useState(null);
    //const [obj, setObj] = useState(null);
    console.log("props.matchedroute :", props.matchedroute)
    console.log("props.routeid :", props.routeid);

    //setObj("Alexander"); // this caused rerender infinitely

    /*
    const memoizedCallback = useCallback(
      () => {
        doSomething(props.custname);
      },
      [props.custname],
    );
    memoizedCallback();
    */

    /*
    useEffect(() => {
        console.log("running useEffect");      
        function doSomething() {
           const msg = "Here in useEffect, you are calling me because of " + props.custname
           console.log(msg)
           alert(msg);
        }

        doSomething();
     }, [props.custname]);
     */

    useEffect(() => {
        let url = window.homepathname.replace("dashboard", "");
        let method = "GET";
        if (props.routeid == "obat") {
          url += "api/tokens/create";
          method = "POST";
        } else {
          url += props.routeid;
          method = "POST";
        }
        //url += props.matchedroute.url;
        console.log("matchedroute :", props.matchedroute, " url :", url);

        const myHeaders = new Headers();
        //myHeaders.append('Accept', 'application/json');
        myHeaders.append('Content-Type', 'application/json');

        const myInit = {
          method: method,
          headers: myHeaders,
          //mode: 'cors',
          //cache: 'default',
        };
        //if (props.routeid == "obat") {
            myInit.body = JSON.stringify({token_name: "Alexander"});
        //}
        console.log("init :", myInit)

        fetch(url, myInit)
          .then(result => result.json())
          .then(data => {
              console.log("data :", data);
              setRowData(data);
        })
        .catch(error => console.log("Error : " + error))
    }, []);

    return (
        <>
            <div className="row">
                <label className="col-sm-2 mt-2 mb-2 ml-2">For Client HTTP purpose only</label>
                <label className="col-sm-2 mt-2 mb-2 ml-2">Data : {rowData}</label>
            </div>
        </>
    );
};
function Logout(props) {
    sendDataForLogout();
}

function sendDataForLogout(e) {
    const info = "in sendDataForLogout, window.homepathname : " + window.homepathname
    console.log(info);
    //alert(info);
    const csrftoken = document.querySelector('meta[name="csrf-token"]').content
    //console.log("csrf-token : ", csrftoken)    
    
    const url = window.homepathname.replace("dashboard", "logout");
    fetch(url, {
        method: 'POST',
        headers:{
            //Not setting Content-Type at all works as expected. Halleluyah !
            //'Content-Type': ['multipart/form-data', 'boundary=boundary']
            //'Content-Type': 'multipart/form-data'
            //'Content-Type': 'application/x-www-form-urlencoded'
            //'Origin':'http://localhost'
            'X-CSRF-TOKEN': csrftoken
        },
        //mode: "cors",
        //cache: "no-cache",
        //credentials: "include"
        //body: formdata
    })
    //.then(result => result.json())
    .then(result => result.text())
    .then(data => {
        if (data != 0) {
            const msg ="Logout tidak berhasil"
        } else {
        }
        console.log(data)
        //location.assign(window.homepathname.replace("dashboard", "login"));
    })
    .catch(error => {
        console.log(error)
    })
}

export default App;
