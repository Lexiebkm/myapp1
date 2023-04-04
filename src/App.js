import {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import logo from './logo.svg';
import './App.css';
import bootstrap from 'bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"

import MyAbout from "./myabout";
import {ThemeContext, themes} from "./theme-context";
import MyDataGrid from "./mydatagrid";
import MyAgGrid from "./myaggrid";
//import MouseTracker, {HOCMouseTracker} from "./mousetracker";
import FuncMouseTracker, {HOCMouseTracker} from "./funcmousetracker";

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
    {/*    
    <nav className="navbar navbar-expand-lg navbar-light sticky-top" style={{backgroundColor: "#e3f2fd"}}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><hr className="dropdown-divider"></hr></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled">Disabled</a>
            </li>
          </ul>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
    */}

    <nav className="navbar navbar-expand-lg navbar-light sticky-top" style={{backgroundColor: "#e3f2fd"}}>
    {/*<nav className="navbar navbar-expand-lg navbar-light bg-light">*/}
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Navbar scroll</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{bsScrollHeight: "100px"}}>                            
            <li className="nav-item">
              <Link to="/home" className="nav-link active" aria-current="page">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/topics" className="nav-link">Topics</Link>
            </li>
            <li>
              <Link to="/about" className="nav-link">About</Link>
            </li>
            <li className="nav-item dropdown">
              <Link to="" className="nav-link dropdown-toggle" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Other Link</Link>
              {/*<Link to="/other" className="nav-link">Other</Link>*/}
              <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">      
                <li>
                  <Link to="/other/action1" className="dropdown-item">Action 1</Link>
                </li>
                <li>
                  <Link to="/other/action2" className="dropdown-item">Action 2</Link>
                </li>
                <li><hr className="dropdown-divider"></hr></li>
                <li>
                  <Link to="/other/somethingelse" className="dropdown-item">Something else here</Link>
                </li>        
              </ul>              
            </li>
            <li className="nav-item">
              <a className="nav-link disabled">Link</a>
            </li>
          </ul>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>    

    <Switch>
      <Route path="/about">
        <h5>The following data is retrieved from API in the server using Laravel Sanctum</h5>
        <p />
        <MyAbout />
      </Route>
      <Route path="/topics">
        <Topics />
      </Route>
      <Route path="/other/:actionId">
        <Action theme={theme} changeTheme={toggleTheme} />
      </Route>      
      <Route path="/other">
        <Other2 />
      </Route>

      <Route path="/user/:username" component={User} />
      
      <Route path="/">
        <Home />
      </Route>
    </Switch>

    {/*
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  */}
    </Router>
  );
}

function User(props) {
  return <h1>Hello {props.match.params.username}!</h1>;
}

function Home() {
  return <h2>Home</h2>;
}

function Topics() {
  let match = useRouteMatch();
  console.log("match :", match)

  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let params = useParams();
  let { topicId } = useParams();
  console.log("params :", params)
  return <h3>Requested topic ID: {topicId}</h3>;
}

function Other2() {
  //return <h2>Children of other</h2>

  let match = useRouteMatch();
  console.log("match :", match)

  return (
    <div>
    {/*
      <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">      
        <li>
          <Link to={`${match.url}/action1`} className="dropdown-item">Action 1</Link>
        </li>
        <li>
          <Link to={`${match.url}/action2`} className="dropdown-item">Action 2</Link>
        </li>
        <li><hr className="dropdown-divider"></hr></li>
        <li>
          <Link to={`${match.url}/somethingelse`} className="dropdown-item">Something else here</Link>
        </li>        
      </ul>
    */}

      <ul>
        <li>
          <Link to={`${match.url}/action1`}>Act 1</Link>
        </li>
        <li>
          <Link to={`${match.url}/action2`}>Act 2</Link>
        </li>
      </ul>

      <Switch>
        <Route path={`${match.path}/:actionid`}>
          <Action />
        </Route>
        <Route path={match.path}>
          <h3>Please select an action.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Child() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();

  return (
    <div>
      <h3>ID: {id}</h3>
    </div>
  );
}

function Action(props) {
    let params = useParams();
    let { actionId } = useParams();
    console.log("params :", params)

    switch (actionId) {      
        case "action1":
            return (
                <ThemeContext.Provider value={props.theme}>
                  <MyDataGrid changeTheme={props.changeTheme} />
                </ThemeContext.Provider>
            )

        case "action2":
            //return <MouseTracker />;
            //return <FuncMouseTracker />;
            return <HOCMouseTracker />;

        case "somethingelse":
            return <MyAgGrid />

        default:
            return <h3>Action ID: {actionId}</h3>;
    }
}

export default App;
