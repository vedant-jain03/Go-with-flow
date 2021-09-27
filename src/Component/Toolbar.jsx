import React, { useContext } from 'react'
import "../Component/style.css"
import { drawingcontext } from './Drawing'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useState } from 'react';

function Toolbar() {
    //Toolbar State
    const { toolbar, settoolbar,setshapetext, shapetext, setpopup, insertrect, insertcircle, insertPara, insertRhombus, setShapeSelected, shapeSelected, addedgeStyles, Boxbackground, setBackground, BoxTextColor, setBoxTextColor, BorderColor, setBorderColor, edgeColor, setedgeColor, canvastype, canvasBg, setcanvastype, setcanvasBg, } = useContext(drawingcontext);
    const insertrectHelper = async () => {
        await setShapeSelected('rectangle');
        setpopup(true);
    }
    const insertcircleHelper = async () => {
        await setShapeSelected('circle');
        setpopup(true);
    }
    const insertRhombusHelper = async () => {
        await setShapeSelected('rhombus');
        setpopup(true);
    }
    const insertParaHelper = async () => {
        await setShapeSelected('parallelogram');
        setpopup(true);
    }
    const insertTextHelper = async () => {
        await setShapeSelected('textfield')
        setpopup(true);
    }
    return (
        <>
            <button className="arrow_inside_button" onClick={() => settoolbar(!toolbar)} > <ArrowBackIosIcon /> </button>
            <div className={toolbar === true ? 'toolbar' : 'd_none'}>
                <h6 className="shape_heading">Shapes</h6>
                <div className="selection_board">

                    <div className="shapes">
                        <div className="shape rectangle" onClick={insertrectHelper}></div>
                        <div className="shape ellipse" onClick={insertcircleHelper}></div>
                        <div className="shape rhombus" onClick={insertRhombusHelper}></div>
                        <div className="shape parallelogram" onClick={insertParaHelper}></div>
                        <div className="shape text" onClick={insertTextHelper}>Text</div>
                    </div>
                </div>
                <h6 className="shape_heading">Customize the Color</h6>
                <div className="selection_board">
                    <div className="color_options">
                        <h4>Node Background</h4>
                        <input type="color" id="head" name="head" value={Boxbackground} onChange={(e) => { setBackground(e.target.value) }}></input>
                    </div>
                    <div className="color_options">
                        <h4>Node Text</h4>
                        <input type="color" id="head" name="head" value={BoxTextColor} onChange={(e) => { setBoxTextColor(e.target.value) }}></input>
                    </div>
                    <div className="color_options">
                        <h4>Node Border</h4>
                        <input type="color" id="head" name="head" value={BorderColor} onChange={(e) => { setBorderColor(e.target.value) }}></input>

                    </div>
                    <div className="color_options">
                        <h4>Edge Color</h4>
                        <input type="color" id="head" name="head" value={edgeColor} onChange={(e) => { setedgeColor(e.target.value) }}></input>
                    </div>
                </div>
                <h6 className="shape_heading">Customize the Canvas</h6>
                <div className="selection_board">
                    <div className="color_options">
                        <h4>Background</h4>
                        <input type="color" id="head" name="head" value={canvasBg} onChange={e => setcanvasBg(e.target.value)} ></input>
                    </div>
                    <div className="color_options">
                        <h4>Variant</h4>
                        <select name="" value={canvastype} onChange={e => setcanvastype(e.target.value)} >
                            <option value="lines">Line</option>
                            <option value="dots">dots</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Toolbar
