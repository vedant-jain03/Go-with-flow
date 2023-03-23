import React from 'react'
import { useState, useContext } from 'react'
import "../Component/style.css"
import { drawingcontext } from './Drawing'
import axios from "axios";
import { UserContext } from "../App.js"
import { useStoreState, useStoreActions } from 'react-flow-renderer';

function Toolbar2() {
    const { canvastype, canvasBg, setcanvastype, setcanvasBg, downloadPng, elements, setElements } = useContext(drawingcontext);
    const { user, userexist, projectdata, setprojectdata, setloading } = useContext(UserContext)
    const nodes = useStoreState((store) => store.nodes);
    const edge = useStoreState((store) => store.edges)
    const save = async () => {
        setloading(true);
        const nodeelement = await nodes.map((item) => ({ ...item, position: { x: item.__rf.position.x.toFixed(2), y: item.__rf.position.y.toFixed(2) } }
        ))
        const edgeelement = await elements.map((item) => (item.type !== 'rectangle' && item.type !== 'circle' && item.type !== 'rhombus' && item.type !== 'parallelogram' && item.type !== 'textfield') ? (
            nodeelement.push(item)
        ) : {})
        const newelement = JSON.stringify(nodeelement);
        const output = await axios.patch(`${process.env.REACT_APP_API_KEY}/user/${user._id}/project/${localStorage.getItem('projectId')}`, { elements: newelement }, {
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`
            }
        });
        setloading(false);
    }
    return (
        <div className="toolbar_2">
            <div className="selection_board" style={!userexist ? { left: '90%' } : {}} >
                {(userexist) ? <button className="button1" style={{ marginRight: '1rem' }} onClick={save}>Save</button> : null}
                <button className="button1" onClick={downloadPng}>Download</button>
            </div>
        </div>
    )
}

export default Toolbar2
