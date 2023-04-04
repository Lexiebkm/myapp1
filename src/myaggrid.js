import React, { useState, useEffect, useRef, useContext } from 'react';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export default function MyAgGrid(props) {
    const [rowData, setRowData] = useState(null);

    /*
    const rowData = [
        {make: "Toyota", model: "Celica", price: 35000},
        {make: "Ford", model: "Mondeo", price: 32000},
        {make: "Porsche", model: "Boxter", price: 72000}
    ];
    */
    
    useEffect(() => {
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
            setRowData(data);
        })
        .catch(error => console.log("Error : " + error))
    }, []);

   return (
        /*
        {headerName: "ID", field: "pegawaiid", width: 70, hide: true},
        {headerName: "Nama Pegawai", field: "namapegawai", width: 260 , editable: false, sortable: true, filter: true},
        {headerName: "NIP", field: "nip", width: 200 , editable: false, sortable: true, filter: true},
        {headerName: "Pangkat/Golongan", field: "pangkat", width: 260 , editable: false, sortable: true, filter: true},
        {headerName: "Status", field: "status", width: 100 , editable: false, sortable: true, filter: true,
            valueFormatter: function(params) {
                let result
                switch (Number(params.value)) {
                    case 1: 
                        result = "PNS Aktif"
                        break
                    case 2: 
                        result = "CPNS"
                        break
                    default:
                        result = ""
                }
                return result
            },
            cellStyle: {textAlign: 'center'}
        },            
        {headerName: "File Foto", field: "foto", width: 240 , editable: false},
        {headerName: "E-mail", field: "email", width: 240 , editable: false},
        {headerName: "Tanggal Awal", field: "tglawal", width: 140 , editable: false, sortable: true, filter: true},
        {headerName: "Tanggal Akhir", field: "tglakhir", width: 140 , editable: false, sortable: true, filter: true}
        */

       <div className="ag-theme-alpine" style={{height: 400, width: 1000}}>
           <AgGridReact
               rowData={rowData}>
               {/*
               <AgGridColumn field="pegawaiid">ID</AgGridColumn>
               <AgGridColumn field="namapegawai">Nama Pegawai</AgGridColumn>
               <AgGridColumn field="nip">NIP</AgGridColumn>
               <AgGridColumn field="pangkat">Pangkat/Golongan</AgGridColumn>
               <AgGridColumn field="foto">File Foto</AgGridColumn>
               */}

               <AgGridColumn field="pegawaiid" hide={true}></AgGridColumn>
               <AgGridColumn field="namapegawai"></AgGridColumn>
               <AgGridColumn field="nip"></AgGridColumn>
               <AgGridColumn field="pangkat"></AgGridColumn>
               <AgGridColumn field="foto"></AgGridColumn>

                {/*
                <AgGridColumn field="make"></AgGridColumn>
                <AgGridColumn field="model"></AgGridColumn>
                <AgGridColumn field="price"></AgGridColumn>
                */}               
           </AgGridReact>
       </div>
   );
};