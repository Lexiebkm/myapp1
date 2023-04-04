import React from 'react';
import ReactDOM from 'react-dom';

function MyReactComponent() {
    return (
        <>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Try React Component</div>

                        <div className="card-body">A simple component!</div>
                    </div>
                </div>

            </div>
        </div>
        <button onClick={sendDataForLogout()}>Logout here</button>
        </>        
    );
}

function sendDataForLogout(e) {
    console.log("in sendDataForLogout");
    alert("in sendDataForLogout");
    const csrftoken = document.querySelector('meta[name="csrf-token"]').content
    //console.log("csrf-token : ", csrftoken)    
    
    const url = document.URL.replace("dashboard", "logout");
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
        location.assign(url.replace("logout", "login"));
    })
    .catch(error => {
        console.log(error)
    })
}

export default MyReactComponent;

if (document.getElementById('app')) {
    ReactDOM.render(<MyReactComponent />, document.getElementById('app'));
}
