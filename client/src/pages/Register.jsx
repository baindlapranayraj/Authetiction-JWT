
import { useNavigate } from "react-router-dom"
import "../App.css"
import {useState} from 'react'

function Register() {
const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")

const navigate = useNavigate()

const btnHandle = async(e)=>{
  e.preventDefault();
  if(!name || !email || !password) return console.log("Enter all fields")
try {

  const res = await fetch("http://localhost:5643/api/register",{
    method:"POST",
    headers:{ 
      'Content-Type':'application/json',
    },
    body:JSON.stringify({
      name,
      email, 
      password
    })
  })

  const data = await res.json();
  if(data.status=="ok"){
    alert("User data i ssave in MongoDB")
    navigate("/")
  }

  console.log(name,email,password)

} catch (error) {
  console.log(error)
}
  
}

  return (
    <>

     <h1>Registration</h1>

     <form action="" onSubmit={btnHandle}>
      <label htmlFor="">Name:</label>
      <input 
      value={name}
      onChange={(e)=>setName(e.target.value)}
      type="text" 
      placeholder="Name" 
      /><br/>
      
      <label htmlFor="">Email:</label>
      <input 
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      type="text" 
      name="email" 
      placeholder="Email" 
      
      /><br/>
      
      <label htmlFor="">Password:</label>
      <input 
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      type="password" 
      name="password" 
      placeholder="Password" 
      
      /><br/>

      <button type='button' onClick={btnHandle}>Submit</button>
     </form>

    </>
  )
}

export default Register
