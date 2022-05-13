import React,{useState,useEffect} from 'react'
import{useHistory,useParams,Link} from "react-router-dom" // will be used when we are editing or updating
import "./AddEdit.css"
import axios from 'axios'
import {toast} from "react-toastify"



const initialState={
    name:"",
    city:"",
    email:"",
    phone:""


}


const AddEdit=()=> {
    const[state,setState]=useState(initialState);
    const{name,city,email,phone}=state;
    const history=useHistory();

    const {id}=useParams()

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/get/${id}`).then((resp)=>setState({...resp.data[0]})) //array of object and target the data
    },[id]) // run when there is ID

    const handleSubmit=(e)=>{
        e.preventDefault(); // to prevent the default behaviour of browser
        if(!name||!city||!email||phone){
            toast.error("Please Fill The Form Properly")

        } else{
            if(!id){
                axios.post("http://localhost:5000/api/post" ,{
                    name,
                    city,
                    email,
                    phone
                })
                .then(()=>{
                    setState({name:"",city:"", email:"", phone:""})
                })
                .catch((err)=>toast.error(err.response.data));
                toast.success("Added SuccessFully")

            }else{
                axios.put(`http://localhost:5000/api/update/${id}`,{
                    name,
                    city,
                    email,
                    phone
                })
                .then(()=>{
                    setState({name:"",city:"", email:"", phone:""})
                })
                .catch((err)=>toast.error(err.response.data));
                toast.success("Updated SuccessFully")
            }
           
            setTimeout(()=>history.push("/"),500)
        }
    }

    const handleInputChange=(e)=>{
        const{name,value}=e.target;
        setState({...state,[name]:value})

    }
  return (
    <div style ={{marginTop:"100px"}}>
        <form style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent:"center"
        }}
        onSubmit={handleSubmit}>
            <label htmlFor='name'>Name</label>
            <input
             type="text"
             id="name"
             name="name"
             placeholder="Customers name"
             value={name || ""}
             onChange={handleInputChange}/>

            <label htmlFor="city">City</label>
            <input
             type="text"
             id="city"
             name="city"
             placeholder="Your City"
             value={city||""}
             onChange={handleInputChange}/>

             


            <label htmlFor='email'>Email</label>
            <input
             type="email"
             id="email"
             name="email"
             placeholder="Your Email"
             value={email||""}
             onChange={handleInputChange}/>



            <label htmlFor="phone">Cell</label>
            <input
             type="number"
             id="phone"
             name="Phone"
             placeholder="Your Number"
             value={phone||""}
            
             onChange={handleInputChange}/>

            


             
            <input type="submit" value={id? "Update": 'Save'}/>
            <Link to="/">
                <input type= "button" value="Go Back"/>
                
                </Link>
            </form>
        
    </div>
  )
}

export default AddEdit