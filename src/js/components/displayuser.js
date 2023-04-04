import React, { useState, useEffect, useRef, useContext } from 'react';

export default function DisplayUser(props) {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const url = window.homepathname.replace("dashboard", "user");

        fetch(url, {
            method: 'GET',
            headers:{
                'Content-Type': ['application/json','charset=UTF-8'],
                //'Origin':'http://localhost'
            },
            mode: "cors",
            //cache: "no-cache",
            //credentials: "include"
        })
        .then(result => result.json())
        .then(data => {
            console.log("data :", data);
            setUser(data);
        })
        .catch(error => console.log("Error : " + error))
    }, []);

    if (user) {
       return (
           <div>
                <label className="col-sm-1">ID : {user.id}</label>
                <label className="col-sm-1">Name : {user.name}</label>
                <label className="col-sm">Email : {user.email}</label>
           </div>
       );
    } else {
        return <label className="col-sm-1 loading">Loading...</label>
    }
};