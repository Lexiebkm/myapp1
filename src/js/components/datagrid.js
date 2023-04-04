import React, { useState, useEffect, useRef, useContext } from 'react';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import Tabulator from "tabulator-tables"; //import Tabulator library
import {ThemeContext} from "./theme-context";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import "tabulator-tables/dist/css/tabulator.min.css"; //import Tabulator stylesheet

export default function DataGrid(props) {
    const [rowData, setRowData] = useState(null);
    const [tableData, setTableData] = useState(null);
    const tableRef = useRef(null);    
    let tabulator = useRef(null);

    const theme = useContext(ThemeContext);
    
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

    useEffect(() => {
        function createTable(data) {
            tabulator = new Tabulator(tableRef.current, {
              data: data,           //load row data from array
              layout: "fitColumns",      //fit columns to width of table
              responsiveLayout: "hide",  //hide columns that dont fit on the table
              reactiveData: true, //enable data reactivity          
              tooltips: true,            //show tool tips on cells
              addRowPos: "top",          //when adding a new row, add it to the top of the table
              history: true,             //allow undo and redo actions on the table
              pagination: "local",       //paginate the data
              paginationSize: 7,         //allow 7 rows per page of data
              movableColumns: true,      //allow column order to be changed
              resizableRows: true,       //allow row order to be changed
              /*initialSort: [             //set the initial sort order of the data
                  {column:"name", dir:"asc"},
              ],*/
              //columns: columns,
              autoColumns: true
          });
        }

        /*let url = window.homepathname.replace("dashboard", "");
        url += "pegawai/tahun/98445373546168325";
        */

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
            setTableData(data);
            createTable(data);
            //tabulator.setData(data);
        })
        .catch(error => console.log("Error : " + error))

        //console.log("MyDataGrid :", MyDataGrid);
        console.log("tableRef.current :", tableRef.current);
        */        
    }, [])

    return (
        <div className="divblock">
            <div className="row mt-3 mb-3">
                <label className="col-sm ml-5">Data Grid Using Various 3rd Party Libraries</label>
            </div>

            <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#myaggrid" type="button" role="tab" aria-controls="myaggrid" aria-selected="true">ag-Grid</button>
            </li>
            <li className="nav-item" role="presentation">
                <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#mytabulator" type="button" role="tab" aria-controls="mytabulator" aria-selected="false">Tabulator</button>
            </li>
            {/*
            <li className="nav-item" role="presentation">
                <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#mycontact" type="button" role="tab" aria-controls="mycontact" aria-selected="false">Contact</button>
            </li>
            <li className="nav-item" role="presentation">
                <button className="nav-link" id="disabled-tab" data-bs-toggle="tab" data-bs-target="#mydisabled" type="button" role="tab" aria-controls="mydisabled" aria-selected="false" disabled>Disabled</button>
            </li>
            */}
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="myaggrid" role="tabpanel" aria-labelledby="myaggrid" tabIndex="0">
                    <div className="row mt-2 mb-2 ml-5">
                        <label className="col-sm">Supplier Data</label>
                    </div>
                    <div className="ag-theme-alpine ml-5" style={{height: 400, width: 1000}}>
                        <AgGridReact
                            rowData={rowData}>
                            <AgGridColumn field="supplierid" hide={false}></AgGridColumn>
                            <AgGridColumn field="namasupplier"></AgGridColumn>
                            <AgGridColumn field="status"></AgGridColumn>
                        </AgGridReact>
                    </div>
                </div>
                <div className="tab-pane fade" id="mytabulator" role="tabpanel" aria-labelledby="mytabulator" tabIndex="1">
                    <div className="row mt-2 mb-2 ml-5">
                        <label className="col-sm ml-5">Data Pegawai</label>
                    </div>
                    <div ref={tableRef} className="ml-2"></div>
                </div>
                <div className="tab-pane fade" id="mycontact" role="tabpanel" aria-labelledby="mycontact" tabIndex="2">
                    <label>This is for contact data</label>
                </div>
                <div className="tab-pane fade" id="mydisabled" role="tabpanel" aria-labelledby="mydisabled" tabIndex="3">
                    <label>This is disabled</label>
                </div>
            </div>
        </div>
    );
};