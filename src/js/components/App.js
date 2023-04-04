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

import {ThemeContext, themes} from "./theme-context";
import DataGrid from "./datagrid";
import VisChart from "./vischart";
import VisGauge from "./visgauges";
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

import "./../sidebars";

import "./../../css/sidebars.css";
import "bootstrap/dist/css/bootstrap.min.css"
import styles from './features/counter/Counter.module.css';
import "./../../css/mycustcolor.css";

// import bootstrap from 'bootstrap' will load all of Bootstrap’s plugins onto a bootstrap object. 
// The bootstrap module itself exports all of our plugins. 
// You can manually load Bootstrap’s plugins individually by loading the /js/dist/*.js files under the package’s top-level directory.

function App0() {
  const [theme, setTheme] = useState(themes.light)

  return <DataGrid />
}

function App() {
  const [theme, setTheme] = useState(themes.light)

  function toggleTheme () {
      setTheme(theme === themes.light ? themes.primary : themes.light);
      console.log("current theme :", theme);
  }

  return (
      <Router>
      <main>
          <h1 className="visually-hidden">Sidebars examples</h1>

          <div className="flex-shrink-0 p-3 bg-white" style={{width: "280px"}}>
              <Link to="/" className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">              
              <span className="fs-5 fw-semibold">My Application</span>
            </Link>
            <ul className="list-unstyled ps-0">
              <li className="mb-1">
                <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                  Component
                </button>
                <div className="collapse show" id="home-collapse">
                  <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    <li><Link to="/komponen/modals" className="link-dark rounded">Modals</Link></li>
                    <li><Link to="/komponen/carousel" className="link-dark rounded">Carousel</Link></li>
                    <li><Link to="/komponen/combo" className="link-dark rounded">Combination</Link></li>
                  </ul>
                </div>
              </li>
              <li className="mb-1">
                <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
                  Data Visualization
                </button>
                <div className="collapse" id="dashboard-collapse">
                  <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    <li><Link to="/datavis/datagrid" className="link-dark rounded">Data Grid</Link></li>
                    <li><Link to="/datavis/datacharts" className="link-dark rounded">Charts</Link></li>
                    <li><Link to="/datavis/datagauges" className="link-dark rounded">Gauges</Link></li>
                  </ul>
                </div>
              </li>
              <li className="mb-1">
                <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
                  Reports
                </button>
                <div className="collapse" id="orders-collapse">
                  <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    <li><Link to="/reports/reduxcounter" className="link-dark rounded">Reports</Link></li>
                    <li><Link to="/reports/reduxcounter" className="link-dark rounded">Counter</Link></li>
                  </ul>
                </div>
              </li>
              <li className="border-top my-3"></li>
              <li className="mb-1">
                <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
                  Utility
                </button>
                <div className="collapse" id="account-collapse">
                  <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    <li><Link to="/utility/profile" className="link-dark rounded">Profile</Link></li>
                    <li><Link to="/utility/settings" className="link-dark rounded">Settings</Link></li>
                    <li><Link to="/utility/logout" className="link-dark rounded">Log Out</Link></li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>

          <div className="b-example-divider"></div>

          <Switch>
            <Route path="/komponen/:komponenId">
              <Komponen theme={theme} changeTheme={toggleTheme} />
              {/*<Komponen prop1={theme} prop2={toggleTheme} prop3="this is prop 3"/>*/}
            </Route>      

            <Route path="/datavis/:datavisId">
              <DataVisualization theme={theme} changeTheme={toggleTheme} />
            </Route>      

            <Route path="/reports/:reportsId">
              <Reports theme={theme} changeTheme={toggleTheme} />
            </Route>

            <Route path="/user/:username" component={User} />
            <Route path="/logout" component={Logout} />
            
            <Route path="/">
              <UnderConstruction />
            </Route>
          </Switch>
      </main>
      </Router>
  );
}

function Komponen(props) {
    const {theme, ...others} = props;
    console.log(theme);
    console.log(others);

    const count = useSelector(selectCount);
    const custname = useSelector(selectCustomer);
    const dispatch = useDispatch();
    const [customername, setCustomername] = useState(custname);

    //let resolvedpath = useResolvedPath();
    let matchedroute = useRouteMatch();
    let params = useParams();
    let { komponenId } = useParams();
    console.log("params :", params)

    switch (komponenId) {      
        case "carousel":
          return (
            <ThemeContext.Provider value={props.theme}>
              <MyCarousel changeTheme={props.changeTheme} />
            </ThemeContext.Provider>
          )

        case "modals":
        case "combo":
        case "reduxcounter":
        case "medicine":
        case "baranglain":
        case "penyakit":
        default:
            return <UnderConstruction />;

            /*
            return (
              <div>
                <h5>Master Data ID: {komponenId}</h5>
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
              </div>
            );
            */

            /*
            return (
              <ThemeContext.Provider value={props.theme}>
                <AppCounter changeTheme={props.changeTheme} />
              </ThemeContext.Provider>
            )
            */

            /*
            return (
                <ThemeContext.Provider value={props.theme}>
                  <GetGeneral changeTheme={props.changeTheme} 
                    matchedroute={matchedroute} 
                    routeid={komponenId}
                    custname={custname} />
                </ThemeContext.Provider>
            )*/
    }
}


function DataVisualization(props) {
    let params = useParams();
    let { datavisId } = useParams();
    console.log("params :", params)

    switch (datavisId) {      
      case "datagrid":
        return (
          <ThemeContext.Provider value={props.theme}>
            <DataGrid changeTheme={props.changeTheme} />
          </ThemeContext.Provider>
        )  

      case "datacharts":
          return <VisChart />;
          
      case "datagauges":
          return <VisGauge />
          
      default:
          return <UnderConstruction />;
          /*return <h4>Modul Dokter ID: {datavisId}</h4>;*/
  }
}

function Reports(props) {
    let params = useParams();
    let { reportsId } = useParams();
    console.log("params :", params)

    switch (reportsId) {      
        case "jadwal":
        default:
            return <UnderConstruction />;          
            /*return <h4>Modul Dokter ID: {reportsId}</h4>;*/
    }
}

function User(props) {
  return <h1>Hello {props.match.params.username}!</h1>;
}
function Home() {
  return <h4 className="text-info mt-2 ml-2">My Home</h4>;
}

function MyCarousel(props) {
  return (
    <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <h2>Slide 1</h2>
          <article>
            <h2>First article</h2>

            <p>Tacos actually microdosing, pour-over semiotics banjo chicharrones retro fanny pack portland everyday carry vinyl typewriter. Tacos PBR&B pork belly, everyday carry ennui pickled sriracha normcore hashtag polaroid single-origin coffee cold-pressed. PBR&B tattooed trust fund twee, leggings salvia iPhone photo booth health goth gastropub hammock.</p>
          </article>          
        </div>
        <div className="carousel-item">
          <h2>Slide 2</h2>
          <article>
            <h2>Second article</h2>

            <p>Tacos actually microdosing, pour-over semiotics banjo chicharrones retro fanny pack portland everyday carry vinyl typewriter. Tacos PBR&B pork belly, everyday carry ennui pickled sriracha normcore hashtag polaroid single-origin coffee cold-pressed. PBR&B tattooed trust fund twee, leggings salvia iPhone photo booth health goth gastropub hammock.</p>
          </article>
        </div>
        <div className="carousel-item">
          <h2>Slide 3</h2>
          <article>
            <h2>Third article</h2>

            <p>Tacos actually microdosing, pour-over semiotics banjo chicharrones retro fanny pack portland everyday carry vinyl typewriter. Tacos PBR&B pork belly, everyday carry ennui pickled sriracha normcore hashtag polaroid single-origin coffee cold-pressed. PBR&B tattooed trust fund twee, leggings salvia iPhone photo booth health goth gastropub hammock.</p>

            <p>Cray food truck brunch, XOXO +1 keffiyeh pickled chambray waistcoat ennui. Organic small batch paleo 8-bit. Intelligentsia umami wayfarers pickled, asymmetrical kombucha letterpress kitsch leggings cold-pressed squid chartreuse put a bird on it. Listicle pickled man bun cornhole heirloom art party.</p>
          </article>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
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
    });

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

function UnderConstruction() {
    return <label>This feature is under construction</label>
}

export default App;
