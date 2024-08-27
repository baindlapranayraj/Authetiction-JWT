

import {useState} from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const navigate = useNavigate()

const loginHandle = async(e)=>{
  e.preventDefault();

  if(!email || !password) return console.log("Enter all fields")

try {

  const res = await fetch("http://localhost:5643/api/login",{
    method:"POST",
    headers:{ 
      'Content-Type':'application/json',
    },
    body:JSON.stringify({
      email, 
      password
    })
  })

  const data = await res.json();

  if(data.userData){
    localStorage.setItem("token",data.userData)
    alert("You have logged in")
    navigate("/")
  }else{
    alert("Soem error occuerd write valid input")
  }
  
  console.log(data)

} catch (error) {
  console.log(error)
}
  
}

  return (
    <>

     <h1>Login Page</h1>

     <form action="" onSubmit={loginHandle}>
      
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

      <button type='button' onClick={loginHandle}>Submit</button>
     </form>
    </>
  )
}

export default Login
