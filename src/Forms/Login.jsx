import React,{useState,useContext} from 'react'
import "./style.css"
import {Link} from "react-router-dom"
import {useHistory} from "react-router-dom"
import axios from "axios"
import {UserContext} from "../App.js"
function Login() {
    const {user,setuser, setuserexist } = useContext(UserContext)
    const history = useHistory();
    const [error, seterror] = useState();
    const [email, setemail] = useState();
    const [password, setpassword] = useState();

    const [jwt,setjwt] = useState(null);
    const submit = async(e) =>{
        e.preventDefault();
        const user_login = await axios.post('https://go-with-flow.herokuapp.com/login',{email, password});
        const userdata = await user_login.data;
        if(user_login.status === 200){
            await setuser(userdata.user);
            localStorage.setItem('user', JSON.stringify(userdata.user));
            localStorage.setItem('userexist',true)
            await setuserexist(true);
            history.push('/');
        }
        else{
            seterror(user.message);
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
                        <h4>Username</h4>
                        <input type="text" autoComplete="true" value={email} onChange={e => setemail(e.target.value)} />
                    </div>
                    <div className="input-field">
                        <h4>Password</h4>
                        <input type="password" value={password} onChange={e => setpassword(e.target.value)} />
                    </div>
                    </div>
                    <button className="button-1" onClick={submit}>Login</button>
                    <span className="message-log">{error}</span>
                    <span className="message-log">Not Register? <Link to="/register">Register</Link></span>
                </div>
            </div>
        </div>
    )
}

export default Login
