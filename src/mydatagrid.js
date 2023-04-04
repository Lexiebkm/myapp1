import React, { useState, useEffect, useRef, useContext } from 'react';
import Tabulator from "tabulator-tables"; //import Tabulator library
import "tabulator-tables/dist/css/tabulator.min.css"; //import Tabulator stylesheet
import {ThemeContext} from "./theme-context";

export default function MyDataGrid(props) {
    const initialData = [
        {id:1, name:"Oli Bob", progress:12, gender:"male", rating:1, col:"red", dob:"19/02/1984", car:1},
        {id:2, name:"Mary May", progress:1, gender:"female", rating:2, col:"blue", dob:"14/05/1982", car:true},
        {id:3, name:"Christine Lobowski", progress:42, gender:"female", rating:0, col:"green", dob:"22/05/1982", car:"true"},
        {id:4, name:"Brendon Philips", progress:100, gender:"male", rating:1, col:"orange", dob:"01/08/1980"},
        {id:5, name:"Margret Marmajuke", progress:16, gender:"female", rating:5, col:"yellow", dob:"31/01/1999"},
        {id:6, name:"Frank Harbours", progress:38, gender:"male", rating:4, col:"red", dob:"12/05/1966", car:1},
    ];

    const columns = [
        {title:"Name", field:"name", editor:"input"},
        {title:"Task Progress", field:"progress", hozAlign:"left", formatter:"progress", editor:true},
        {title:"Gender", field:"gender", width:95, editor:"select", editorParams:{values:["male", "female"]}},
        {title:"Rating", field:"rating", formatter:"star", hozAlign:"center", width:100, editor:true},
        {title:"Color", field:"col", width:130, editor:"input"},
        {title:"Date Of Birth", field:"dob", width:130, sorter:"date", hozAlign:"center"},
        {title:"Driver", field:"car", width:90,  hozAlign:"center", formatter:"tickCross", sorter:"boolean", editor:true},
    ];

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
            
        //https://www.ag-grid.com/example-assets/row-data.json
        const url = "http://localhost/myreact/myapp1/backend/myapi1.php"; //"http://localhost:5000/table";

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
    }, [])

    function handleChange() {
        //console.log("state :", state);
    }

    return (
        <>
          <h4>A Simple Tabulator Grid</h4>
          <div ref={tableRef}></div>
          <button className="col-sm-1"
            style={{backgroundColor: theme.background, color: theme.foreground, borderRadius: "1em 1em"}}
            onClick={props.changeTheme}
          >
              Like
          </button>
        </>
    );
}