import React from 'react'
import { useState, useContext } from 'react'
import "../Component/style.css"
import { drawingcontext } from './Drawing'
import axios from "axios";
import { UserContext } from "../App.js"
import { useStoreState, useStoreActions } from 'react-flow-renderer';

function Toolbar2() {
    const { canvastype, canvasBg, setcanvastype, setcanvasBg, downloadPng, elements, setElements } = useContext(drawingcontext);
    const { projectdata, setprojectdata, setloading } = useContext(UserContext)
    const nodes = useStoreState((store) => store.nodes);
    const edge = useStoreState((store)=> store.edges )
    const save = async () => {
        setloading(true);
        const nodeelement = await nodes.map((item) => ({ ...item, position: { x: item.__rf.position.x.toFixed(2), y: item.__rf.position.y.toFixed(2) } }
        ))
        const edgeelement = await elements.map((item)=>(item.type !== 'rectangle' && item.type !== 'circle' && item.type !== 'rhombus' && item.type !== 'parallelogram' && item.type !== 'textfield')?(
            nodeelement.push(item)
        ):{})
        console.log(nodeelement);
        console.log(nodeelement);
        const newelement = JSON.stringify(nodeelement);
        const output = await axios.patch(`https://go-with-flow.herokuapp.com/saveMyProject/${projectdata[0]._id}`, { elements: newelement });
        setloading(false);
    }
    return (
        <div className="toolbar_2">
            <div className="selection_board">
                <button className="button1" style={{ marginRight: '1rem' }} onClick={save}>Save</button>
                <button className="button1" onClick={downloadPng}>Download</button>
            </div>
        </div>
    )
}

export default Toolbar2
