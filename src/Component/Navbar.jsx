import React,{useState , useContext} from 'react'
import { navbarContext } from './Drawing';

function Navbar() {
    const [fontstyle,setfontstyle] = useState();
    const {Boxbackground,setBackground,BoxTextColor,setBoxTextColor,BorderColor, setBorderColor, edgeColor, setedgeColor} = useContext(navbarContext);
    return (
        <div className="navbar">
            <select name="" value={fontstyle} onChange={e => setfontstyle(e.target.value)} >
                <option style={{ fontFamily: 'Indie Flower,cursive' }} value="Indie Flower,cursive">Indie Flower</option>
                <option style={{ fontFamily: 'Caveat, cursive' }} value="Caveat, cursive">Caveat</option>
                <option style={{ fontFamily: 'Shadows Into Light, cursive' }} value="Shadows Into Light">Shadows Into Light</option>
                <option style={{ fontFamily: 'Homemade Apple' }} value="Homemade Apple">Homemade Apple</option>
                <option style={{ fontFamily: 'Nanum Pen Script' }} value="Nanum Pen Script">Nanum Pen Script</option>
                <option style={{ fontFamily: 'Kalam' }} value="Kalam">Kalam</option>
            </select>
            
            <h4>Background Color:</h4>
            <input type="color" id="head" name="head" value={Boxbackground} onChange={(e)=>{setBackground(e.target.value)}}></input>
            <h4>Text Color:</h4>
            <input type="color" id="head" name="head" value={BoxTextColor} onChange={(e)=>{setBoxTextColor(e.target.value)}}></input>
            <h4>Border Color:</h4>
            <input type="color" id="head" name="head" value={BorderColor} onChange={(e)=>{setBorderColor(e.target.value)}}></input>
            <h4>Edge Color:</h4>
            <input type="color" id="head" name="head" value={edgeColor} onChange={(e)=>{setedgeColor(e.target.value)}}></input>
        </div>

    )
}

export default Navbar
