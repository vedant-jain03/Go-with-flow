import React, { useEffect, useState } from 'react'
import "./style.css"
import { Link, useHistory } from "react-router-dom"
import axios from "axios"
function Register() {
    const history = useHistory();

    const [error, seterror] = useState();
    const [name, setname] = useState();
    const [email, setemail] = useState();
    const [password, setpassword] = useState();
    const [active, setActive] = useState(false);
    // history.p
    useEffect(() => {
        if (name && email && password) setActive(true);
    }, [name, email, password])
    const submit = async (e) => {
        e.preventDefault();
        const result = await fetch(`${process.env.REACT_APP_API_KEY}/auth/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`
            },
            body: JSON.stringify({
                name, email, password
            })
        })
        if (result.status === 201) {
            history.push('/login');
            window.alert('Registered Succesfully!!!');
        }
        else {
            const res = await result.json();
            seterror(res.message);
            window.alert(res.message)
        }
    }
    return (
        <div className="login">
            <div className="container-lr">
                <div className="left">
                    <h3 className="heading">Go With Flow</h3>
                    <img src="https://cdn.dribbble.com/users/14268/screenshots/6410271/k.png?compress=1&resize=400x300" alt="" />
                    <p className="para">Make your algorithm, website or any flowchart, save it in a project and download!</p><br />
                    <p className="para">As Simple as that!</p><br />
                </div>
                <div className="right">
                    <h3>Welcome</h3>
                    <h4>Login to your account</h4>
                    <div className="input_container">
                        <div className="input-field">
                            <h4>Name</h4>
                            <input type="text" value={name} onChange={e => setname(e.target.value)} />
                        </div>
                        <div className="input-field">
                            <h4>Email</h4>
                            <input type="text" value={email} autoComplete="false" onChange={e => setemail(e.target.value)} />
                        </div>
                        <div className="input-field">
                            <h4>Password</h4>
                            <input type="password" value={password} autoComplete="false" onChange={e => setpassword(e.target.value)} />
                        </div>
                    </div>
                    {
                        active ? <button className="button-1" onClick={submit}>Signup</button> :
                        <button className="button-1" onClick={submit} style={{opacity: '0.5', cursor: 'not-allowed'}}>Signup</button>
                    }
                    <span className="message-log">{error}</span>
                    <span className="message-log">Already have account? <Link to="/login">Login</Link></span>
                </div>
            </div>
        </div>
    )
}

export default Register
