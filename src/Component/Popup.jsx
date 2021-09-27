import React from 'react'
import { useContext } from 'react'
import { drawingcontext } from './Drawing'
import './style.css'
import { TwitterPicker } from 'react-color'
import { useState } from 'react'

function Popup() {
    const { setshapetext, shapetext, setpopup, insertrect, insertcircle, insertPara, insertRhombus, setShapeSelected, shapeSelected, insertText, Boxbackground,setBackground,BoxTextColor,setBoxTextColor,BorderColor, setBorderColor } = useContext(drawingcontext);
    const helper = () => {
        switch (shapeSelected) {
            case 'rectangle': {
                setpopup(false);
                setshapetext('Text')
                insertrect();
            }
                break;
            case 'circle': {
                setpopup(false);
                setshapetext('Text')
                insertcircle();
            }
                break;
            case 'rhombus': {
                setpopup(false);
                setshapetext('Text')
                insertRhombus();
            }
                break;
            case 'parallelogram': {
                setpopup(false);
                setshapetext('Text')
                insertPara();
            }
                break;
            case 'textfield': {
                setpopup(false);
                setshapetext('Text')
                insertText();
            }
        }
        setpopup(false);
    }
    // Color Picker
    const [currentColor, setCurrentcolor] = useState('#fff');
    const handleChangeComplete = (color) => {
        setCurrentcolor(color.hex);
    }
    return (
        <div id="popup_message">
            <div className="take_input_popup">
                <button className="button1 crossButton" onClick={() => setpopup(false)}>x</button>
                <div className="input_field">
                    <h3>Node Input</h3>
                    <input type="text" value={shapetext} onChange={(e) => setshapetext(e.target.value)} style={{padding:'10px 15px'}} />
                </div>
                <button className="button1" onClick={helper}>Insert</button>
            </div>
        </div>
    )
}

export default Popup
