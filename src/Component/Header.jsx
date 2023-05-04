import React, { useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { UserContext } from '../App'
import { useRef } from 'react';
import { gsap } from 'gsap';

function Header() {
    const headerRef = useRef(null);
    const { user, setuser, setuserexist, userexist } = useContext(UserContext);
    const history = useHistory();
    const logout = async () => {
        try {
            history.push('/')
            localStorage.setItem('user', null);
            localStorage.setItem('projectId', null);
            localStorage.setItem('projectDetails', null);
            localStorage.setItem('projectName', null);
            localStorage.setItem('userexist', false);
            await setuserexist(false);
        }
        catch (err) {
            history.push('/');
        }
    }
    useEffect(() => {
        gsap.fromTo(headerRef.current, 1.5, {opacity: 0, y: -30}, {opacity:1, delay: 0.2, y: 0, ease: 'elastic'});
    }, [])
    useEffect(() => {
        if (localStorage.getItem('userexist') === "true") {
            setuserexist(true);
        }
        if (localStorage.getItem('user') !== "null") {
            setuser(JSON.parse(localStorage.getItem('user')));
        }
    }, [userexist])
    return (
        <div className='header' ref={headerRef}>
            <div className="navigation">
                <div className="logo">Go With Flow</div>
                <div className="menu">
                    <Link to="/">Home</Link>
                    <span className='slash'>/</span>
                    {
                        userexist ? (
                            <Link to="/myflowcharts">Dashboard</Link>
                        ) : <Link to="/simulator">Simulator</Link>
                    }
                    <span className='slash'>/</span>
                    <a href="https://github.com/vedant-jain03/Go-with-flow" target="_blank" rel="noopener noreferrer">Contribute</a>
                </div>
                <div className="btn">
                    {
                        userexist ? (
                            <h4 onClick={() => logout()} style={{ cursor: 'pointer' }}>Logout</h4>
                        ) : <Link to="/login">Login</Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header