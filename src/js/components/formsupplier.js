import React, { useState, useEffect, useRef, useContext } from 'react';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export default function FormSupplier(props) {
    const [rowData, setRowData] = useState(null);
    
    useEffect(() => {
        /*let url = window.homepathname.replace("dashboard", "");
        url += "supplier";
        console.log("url :", url);*/
        return;

        /*
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
            setRowData(data);
        })
        .catch(error => console.log("Error : " + error))
        */
    }, []);

    return (
        <>
            <div className="row mt-2 mb-2 ml-5">
                <label className="col-sm">Data Supplier</label>
            </div>                        

            <div className="ag-theme-alpine ml-5" style={{height: 400, width: 1000}}>
               <AgGridReact
                   rowData={rowData}>
                   <AgGridColumn field="supplierid" hide={false}></AgGridColumn>
                   <AgGridColumn field="namasupplier"></AgGridColumn>
                   <AgGridColumn field="status"></AgGridColumn>
               </AgGridReact>
            </div>
        </>
    );
};