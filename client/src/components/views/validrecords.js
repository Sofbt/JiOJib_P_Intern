import React, { Component, useEffect, useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Paper from "@mui/material/Paper";
import './validrecords.css';

import IconButton from "@mui/material/IconButton";
import { AddCircleOutline } from "@mui/icons-material";
import Navbar from './Navbar';

const Validrecords = () => {

    const [records, setData] = useState([])

    useEffect(() => {
        const fetchdata = async () => {
            const data = await fetch('http://localhost:8080/api/valide')
            const json = await data.json()

            if (data.ok) {
                setData(json)
                console.log(json);
            }
        }
        fetchdata()
        
        },[])

        const columns = [
            { field: "location", headerName: "Localisation", width: 150 },
            { field: "productName", headerName: "Nom du Produit", width: 150 },
            { field: "description", headerName: "Description", width: 150 }
        ]

        const rows = useMemo(
            () => records.map((row, index) => ({...row, id: row._id})),
            [records]
        )
    
        return (
            <div>
                <div className='sidebar-admin'>
                <Navbar/>
                </div>
                <div className='main-page table-container'>
  <DataGrid
    component={Paper}
    rows={rows}
    columns={columns}
    pageSize={5}
    rowsPerPageOptions={[5]}
    className="datagrid"
  />
</div>
            </div>
        );
    
}

export default Validrecords;