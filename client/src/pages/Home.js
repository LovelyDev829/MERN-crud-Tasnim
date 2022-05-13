import React,{useState,useEffect}from 'react'
import {Link} from "react-router-dom";
import "./Home.css"
import { toast } from 'react-toastify';
import axios, { Axios } from "axios"

const Home=()=> {
    const[data,setData]=useState([]);
    const loadData =async()=>{
        const response = await axios.get("http://localhost:5000/api/get")
        setData(response.data);
    }
    useEffect(()=>{
        loadData(); //it will fetch data on initial load
      },[]);

    const deleteContact= (id) =>{
        if(
            window.confirm("Are you Sure you want to Delete?")
            ){
            axios.delete(`http://localhost:5000/api/remove/${id}`)
            toast.success("Contact Deleted")
            setTimeout(()=>loadData(),500)

        }

    }



    return (
        <div style={{marginTop: "150px"}}>
            
            <Link to="/addContact">
            <button className='btn btn-contact'>Add Customer</button>
                
                </Link>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}>No.</th>
                        <th style={{textAlign: "center"}}>Name</th>
                        <th style={{textAlign: "center"}}>City</th>
                        <th style={{textAlign: "center"}}>Email</th>
                        <th style={{textAlign: "center"}}>Contact</th>
                        <th style={{textAlign: "center"}}>Action</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {data.map((item,index)=>{
                        return(
                            <tr key={item.id}>
                                <th scope='row'>{index+1}</th>
                                <td>{item.name}</td>
                                <td>{item.city}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                               
                                <td>
                                    <Link to ={`/update/${item.id}`}>
                                    <button className="btn btn-edit">Edit</button>
                                    </Link>
                                    {/* <Link to ={`/delete/${item.id}`}> */}
                                    <button className="btn btn-delete" onClick={()=>deleteContact(item.id)}>Delete</button>
                                    {/* </Link> */}
                                    <Link to ={`/view/${item.id}`}>
                                    <button className="btn btn-view">View</button>
                                    </Link>
                                </td>
                                
                                </tr>
                        )

                    })}
                </tbody>
                
                
            </table>
            
        </div>
  )
}

export default Home