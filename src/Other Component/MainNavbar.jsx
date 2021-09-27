import React, { useContext, useState } from 'react'
import "./style.css"
import axios from "axios";
import {UserContext} from "../App.js"
import { useHistory , Link} from 'react-router-dom';
function MainNavbar() {
    const [active,setactive] = useState('myCharts');
    const {user,projectname} = useContext(UserContext);
    const history = useHistory();
    const logout = async () => {
        try {
            history.push('/login')
            localStorage.setItem('user',null);
            localStorage.setItem('projectId',null);
            localStorage.setItem('projectDetails',null);
            localStorage.setItem('projectName',null);
           
        }
        catch (err) {
            console.log(err);
            history.push('/login');
        }
    }
    return (
        <div className="main_navbar">
            <div className="middle">
                    <h3  ><Link to="/myflowcharts" style={{color: 'white'}}>My Flowcharts</Link></h3>
            </div>
            <div className="left">
                <center><h3> Go With Flow</h3></center>
            </div>
            
            <div className="right">
                <h3>{user.name} | {projectname}</h3>
                <button className="button1 color-secondary" onClick={logout}  >Logout</button>
            </div>
        </div>
    )
}

export default MainNavbar
