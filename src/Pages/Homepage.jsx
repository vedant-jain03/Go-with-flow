import React, { useContext } from 'react'
import '../styles/style.css'
import container_bg from "../images/container_bg.png"
import bg_line from "../images/bg_line.png"
import Header from '../Component/Header'
import demo_app_img from '../images/app_demo_img.png'
import demo_app_im2 from '../images/app_demo_img2.png'
import { LinkedIn, Twitter, GitHub, Email, ArrowForward } from '@material-ui/icons'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { UserContext } from '../App'

function Homepage() {
    const {user,setuser, setuserexist, userexist } = useContext(UserContext)
    return (
        <div className='homepage'>
            <div className='container'>
                <img src={container_bg} alt="" className='container_pg_img' />
                <div className="light_top"></div>
                <img src={bg_line} alt="" className="bg_line" />
            </div>
            <Header />
            <div className="hero">
                <div className="h-text">
                    <h1>Go With Flow</h1>
                    <h4>Go with Flow is a platform that allows users to make Algorithm’s flowchart online using Simulator. The users can create many projects and can download them in form of images.</h4>
                </div>
                <button className='p-btn'><Link to="/simulator" target="_blank">Simulator</Link> <ArrowForward /> </button>
            </div>
            <h1 className='heading'>Features</h1>
            <div className="app_demo">
                <div className="ap-wrapper">
                    <div className="aw-header">
                        <h1>Simulator</h1>
                        <h4>This is a demo flowchart for checking weather a number is even or odd.</h4>
                    </div>
                    <div>
                        <img src={demo_app_img} alt="" className='demo_app_img' />
                    </div>
                </div>
            </div>
            <div className="app_demo">
                <div className="ap-wrapper">
                    <div className="aw-header">
                        <h1>Dashboard</h1>
                        <h4>Create as many project you want to in the dashboard.</h4>
                    </div>
                    <div>
                        <img src={demo_app_im2} alt="" className='demo_app_img' />
                    </div>
                </div>
            </div>
            <div className="app_demo">
                <div className="ap-wrapper">
                    <div className="aw-header">
                        <h1>Technology Used</h1>
                    </div>
                    <div className='ts_wrapper'>
                        <div className='tech_stack'>Typescript</div>
                        <div className='tech_stack'>React</div>
                        <div className='tech_stack'>Node.js</div>
                        <div className='tech_stack'>Express.js</div>
                        <div className='tech_stack'>MongoDB</div>
                        <div className='tech_stack'>Javascript</div>
                        <div className='tech_stack'>react-flow-renderer</div>
                    </div>
                </div>
            </div>
            <div className="app_demo">
                <div className="ap-wrapper" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <div className="aw-header">
                        <h1>Connect with me</h1>
                    </div>
                    <div className='ts_wrapper'>
                        <div className="p-btn">GitHub  <GitHub /> </div>
                    </div>
                </div>
            </div>
            <footer className='app_demo'>
                <div className="f-wrapper">
                    <h3>GoWithFlow © 2023</h3>
                    <div className='icon'>
                        <a href="https://www.linkedin.com/in/vedant-jain-781006145/" target="_blank" rel="noopener noreferrer"><LinkedIn /></a>
                        <a href="https://twitter.com/vedantj_03" target="_blank" rel="noopener noreferrer"><Twitter /></a>
                        <a href="https://github.com/vedant-jain03" target="_blank" rel="noopener noreferrer"><GitHub /></a>
                        <a class="email-link" href="mailto:vedantjainben10@gmail.com" rel="noopener noreferrer" target="_blank"><Email /></a>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Homepage