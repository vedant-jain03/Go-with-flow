import React, { useContext, useState } from 'react'
import "./style.css"
import axios from "axios";
import { UserContext } from "../App.js"
import { useHistory, Link } from 'react-router-dom';
function MainNavbar() {
    const [active, setactive] = useState('myCharts');
    const { user, projectname, userexist, setuserexist } = useContext(UserContext);
    const history = useHistory();
    const logout = async () => {
        try {
            history.push('/')
            localStorage.setItem('user', null);
            localStorage.setItem('projectId', null);
            localStorage.setItem('projectDetails', null);
            localStorage.setItem('projectName', null);
            localStorage.setItem('userexist', false);
            setuserexist(false);
        }
        catch (err) {
            history.push('/');
        }
    }
    return (
        <div className="main_navbar">
            <div className="middle">
                {
                    (userexist) ? <h3  ><Link to="/myflowcharts" style={{ color: 'white' }}>My Flowcharts</Link></h3> :
                        <h3><Link to="/" style={{ color: 'white' }}>Go With Flow</Link></h3>
                }

            </div>
            {
                (userexist) ? <div><h3><Link to="/" style={{ color: 'white' }}>Go With Flow</Link></h3></div> : null
            }
            {
                (userexist) ? (
                    <div className="right">
                        {(projectname === 'null') ? "" : (<h3>{user.name} | {projectname}</h3>)}
                        <button className="button1 color-secondary" onClick={logout}  >Logout</button>
                    </div>
                ) : null
            }
        </div>
    )
}

export default MainNavbar
