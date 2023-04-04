import React, { useState, useEffect, useRef, useContext } from 'react';
import Tabulator from "tabulator-tables"; //import Tabulator library
import "tabulator-tables/dist/css/tabulator.min.css"; //import Tabulator stylesheet
import {ThemeContext} from "./theme-context";

export default function FormPegawai(props) {
    const [tableData, setTableData] = useState(null);
    const tableRef = useRef(null);    
    let tabulator = useRef(null);

    const theme = useContext(ThemeContext);

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

    function handleChange() {
        //console.log("state :", state);
    }

    return (
        <>
          <div className="row">        
            <label className="col-sm-2 mt-2 mb-2 ml-2">Data Pegawai</label>
          </div>
          <div ref={tableRef} className="ml-2"></div>
          {/*
          <button className="col-sm-1"
            style={{backgroundColor: theme.background, color: theme.foreground, borderRadius: "1em 1em"}}
            onClick={props.changeTheme}
          >
              Like
          </button>
          */}
        </>
    );
}