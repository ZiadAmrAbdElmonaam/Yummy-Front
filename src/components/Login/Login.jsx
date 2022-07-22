import axios from 'axios'
import React from 'react'



export default function Login() {
    function signIn(event)
     {
        
        axios 
        .post('http://localhost:8080/login', {
            email: event.target.email.value,
            password: event.target.password.value,
            role: event.target.role.value
        })
        .then(res => {
            console.log(res.data)
        }
    )
    }
    return(
<div>
    <form method='post'
    style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#f5f5f5',
        padding: '20px',
        borderRadius: '10px'
    }}>  
        <label htmlFor="email">Email</label>
        <input  id="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        <label htmlFor="role">role</label>
        <input type="text"
        name='role'
        id='role'
         />
        <button type="submit"      
                onClick={signIn} 
        >Login</button>

    </form>
    

</div>
    )

}
