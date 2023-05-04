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
import { useEffect } from 'react'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'

function Homepage() {
    const { user, setuser, setuserexist, userexist } = useContext(UserContext);
    const titleRef = useRef(null);
    const pararef = useRef(null);
    const buttonRef = useRef(null);
    const techref = useRef(null);
    const featureRef = useRef(null);
    useEffect(() => {
        gsap.fromTo(titleRef.current, 0.4, { y: 10, opacity: 0 }, { y: 0, delay: 0.6, opacity: 1 })
        gsap.fromTo(pararef.current, 0.4, { y: 10, opacity: 0 }, { y: 0, delay: 1, opacity: 1 })
        gsap.fromTo(buttonRef.current, 0.4, { y: 10, opacity: 0 }, { y: 0, delay: 1.2, opacity: 1 })
        gsap.fromTo(featureRef.current, 0.4, { y: 10, opacity: 0 }, { y: 0, delay: 1.2, opacity: 1, scrollTrigger: featureRef.current })
        gsap.from(document.querySelector(".connect-section"), 0.4, { y: 0, delay: 1.2, opacity: 1, scrollTrigger: document.querySelector('.connect-section') })
        gsap.registerPlugin(ScrollTrigger)
        const container = document.querySelector('.feature-wrapper')
        const sections = gsap.utils.toArray('.feature-wrapper .app_demo')
        const texts = gsap.utils.toArray('.anim-text')
        let scrollTween = gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: '.feature-container',
                pin: true,
                scrub: 1,
                end: "+=2000"
            }
        })
        gsap.from(techref.current, {
            y: -130,
            opacity: 0,
            duration: 2,
            ease: 'elastic',
            scrollTrigger: techref.current
        })
        sections.forEach(section => {
            let text = section.querySelectorAll('.anim-text')
            let image = section.querySelectorAll('.demo_app_img')
            gsap.from(text, {
                y: -130,
                opacity: 0,
                duration: 2,
                ease: 'elastic',
                stagger: 0.1,
                scrollTrigger: {
                    trigger: section,
                    containerAnimation: scrollTween,
                    start: "left center"
                }
            })
            gsap.from(image, {
                y: -130,
                opacity: 0,
                duration: 2,
                ease: 'elastic',
                stagger: 0.1,
                scrollTrigger: {
                    trigger: section,
                    containerAnimation: scrollTween,
                    start: "left center"
                }
            })
        })
    }, [])
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
                    <h1 ref={titleRef}>Go With Flow</h1>
                    <h4 ref={pararef}>Go with Flow is a platform that allows users to make Algorithm’s flowchart online using Simulator. The users can create many projects and can download them in form of images.</h4>
                </div>
                <button className='p-btn' ref={buttonRef}><Link to="/simulator" target="_blank">Simulator</Link> <ArrowForward /> </button>
            </div>
            <div className='feature-container'>
                <h1 className='heading' id='feature-heading' ref={featureRef}>Features</h1>
                <div className='feature-wrapper'>
                    <div className="app_demo">
                        <div className="ap-wrapper">
                            <div className="aw-header">
                                <h1 className='anim-text'>Simulator</h1>
                                <h4 className='anim-text'>This is a demo flowchart for checking weather a number is even or odd.</h4>
                            </div>
                            <div>
                                <img src={demo_app_img} alt="" className='demo_app_img' />
                            </div>
                        </div>
                    </div>
                    <div className="app_demo">
                        <div className="ap-wrapper">
                            <div className="aw-header">
                                <h1 className='anim-text'>Dashboard</h1>
                                <h4 className='anim-text'>Create as many project you want to in the dashboard.</h4>
                            </div>
                            <div>
                                <img src={demo_app_im2} alt="" className='demo_app_img' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="app_demo" ref={techref}>
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
            <div className="app_demo connect-section">
                <div className="ap-wrapper" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <div className="aw-header">
                        <h1>Connect with me</h1>
                    </div>
                    <div className='ts_wrapper'>
                        <div className="p-btn">GitHub  <GitHub /> </div>
                    </div>
                </div>
            </div>
            <footer className='app_demo footer'>
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