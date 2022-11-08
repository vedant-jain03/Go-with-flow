//Imports
import React, { useState, useContext } from 'react';
import ReactFlow, { ReactFlowProvider, addEdge, removeElements, Controls } from 'react-flow-renderer';
import { Background, Handle } from 'react-flow-renderer';
import Toolbar from './Toolbar';
import "../Component/style.css"
import { createContext } from 'react';
import CustomEdge from './CustomEdge';
import Popup from './Popup';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Toolbar2 from './Toolbar2';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import axios from "axios"
import { useHistory } from 'react-router';
import MainNavbar from '../Other Component/MainNavbar';
import { UserContext } from '../App'
// Drawing context
const drawingcontext = createContext(null);
export { drawingcontext };

// Navbar Context
const navbarContext = createContext(null);
export { navbarContext }

// elements
//functional Code

export default () => {
    // States
    const { user, projectname, projectdata, setloading, setprojectdata, projectId,setprojectId } = useContext(UserContext)
    const history = useHistory()
    const [elements, setElements] = useState([]);
    const [popup, setpopup] = useState(false);
    const [shapetext, setshapetext] = useState('Text');
    const [shapeSelected, setShapeSelected] = useState('');
    const [currSelected, setcurrSelected] = useState(null);
    const onElementsRemove = (elementsToRemove) =>
        setElements((els) => removeElements(elementsToRemove, els));
    const onConnect = (params) => setElements((els) => addEdge(params, els));

    // Navbar Properties
    const [Boxbackground, setBackground] = useState('rgb(156, 168, 179)');
    const [BoxTextColor, setBoxTextColor] = useState('rgb(255, 255, 255)');
    const [BorderColor, setBorderColor] = useState('black');
    const [edgeColor, setedgeColor] = useState('black');
    const [toolbar, settoolbar] = useState(true);
    const [canvastype, setcanvastype] = useState('dots');
    const [canvasBg, setcanvasBg] = useState("white");

    async function downloadPng() {
        setloading(true)
        document.getElementsByClassName('handle_button').className = "handle_none";
        const download = await htmlToImage.toJpeg(document.getElementById('flow_chart'), { quality: 1 })
            .then(function (dataUrl) {
                var link = document.createElement('a');
                link.download = `${projectname}_flowchart.jpeg`;
                link.href = dataUrl;
                link.click();
            });
        setloading(false);
    }
    // UseEffects
    const loadMyProject = async () => {
        console.log(projectId);
        const newdata = await axios.get(`${process.env.REACT_APP_API_KEY}/flowchart/${localStorage.getItem('projectId')}`);
        const data = await newdata.data;
        await setElements(JSON.parse(data.projectData[0].elements));
        const newelements = JSON.parse(data.projectData[0].elements);
        if(newelements.length === 0 )return;
        setBackground(newelements[0].data.bgcolor);
        setBorderColor(newelements[0].data.brcolor);
        setBoxTextColor(newelements[0].data.txtcolor);
    }
    useEffect(() => {
        loadMyProject();
    }, [])
    useEffect(() => {
        const newelements = elements.map((item) => (
            { ...item, data: { ...item.data, txtcolor: BoxTextColor, bgcolor: Boxbackground, brcolor: BorderColor } }
        ))
        setElements(newelements);
    }, [BoxTextColor, Boxbackground, BorderColor])
    useEffect(() => {
        const newelements = elements.map((item) => ((item.type !== 'rectangle' && item.type !== 'circle' && item.type !== 'rhombus' && item.type !== 'parallelogram' && item.type !== 'textfield')
            ? { ...item, style: { ...item.style, stroke: edgeColor } }
            : { ...item }
        ))
        setElements(newelements);
    }, [edgeColor])
    const addedgeStyles = async () => {
        const newelements = await elements.map((item) => ((item.type !== 'rectangle' && item.type !== 'circle' && item.type !== 'rhombus' && item.type !== 'parallelogram' && item.type !== 'textfield')
            ? { ...item, arrowHeadType: 'arrowclosed', type: 'smoothstep', animated: true, style: { ...item.style, stroke: edgeColor } }
            : { ...item }
        ))
        setElements(newelements);
    }
    useEffect(() => {
        addedgeStyles();
    }, [elements.length])

    // making text field start
    const CustomNodeComponentTextField = ({ data }) => {
        const customNodeStylesTextField = {
            background: 'transparent',
            color: data.txtcolor,
            padding: '1rem',
            borderRadius: '2px'
        };
        return (
            <div style={customNodeStylesTextField} onClick={() => setcurrSelected(data.id)}>
                <div>{data.text}</div>
            </div>
        )
    }
    // making text field ends
    // making rectangle shape starts    

    const CustomNodeComponentRectangle = ({ data, isConnectable }) => {
        const customNodeStylesRectangle = {
            background: data.bgcolor,
            color: data.txtcolor,
            padding: '1rem',
            borderRadius: '2px',
            border: `1px solid ${data.brcolor}`
        };
        return (
            <div style={customNodeStylesRectangle} onClick={() => setcurrSelected(data.id)}  >
                <Handle type="target" position="top" style={{ borderRadius: 0 }} isConnectable={isConnectable} />
                <Handle type="source" id="a" position="left" style={{ borderRadius: 0 }} isConnectable={isConnectable} />
                <div>{data.text}</div>
                <Handle type="source" id="b" position="right" style={{ borderRadius: 0 }} isConnectable={isConnectable} />
                <Handle type="source" id="c" position="bottom" style={{ borderRadius: 0 }} isConnectable={isConnectable} />
            </div>
        );
    };
    // making rectangle shape ends
    // making circle shape start

    const CustomNodeComponentCircle = ({ data }) => {
        const customNodeStylesCircle = {
            background: data.bgcolor,
            color: data.txtcolor,
            padding: '1rem',
            borderRadius: '50%',
            border: `1px solid ${data.brcolor}`
        };
        return (
            <div style={customNodeStylesCircle} onClick={() => setcurrSelected(data.id)}>
                <Handle type="target" position="top" style={{ borderRadius: 0 }} />
                <div>{data.text}</div>
                <Handle
                    type="source"
                    position="bottom"
                    id="a"
                />
            </div>
        );
    };
    //end circle type shape
    // rhombus shape making start

    const CustomNodeComponentRhombus = ({ data, isConnectable }) => {
        const textRhombus = {
            transform: 'rotate(-45deg)'
        }
        const customNodeStylesRhombus = {
            background: data.bgcolor,
            color: data.txtcolor,
            textAlign: 'center',
            height: '5rem',
            width: '5rem',
            display: 'flex',
            alignItems: 'center',
            transform: 'rotate(45deg)',
            justifyContent: 'center',
            border: `1px solid ${data.brcolor}`
        }
        return (
            <div style={customNodeStylesRhombus} onClick={() => setcurrSelected(data.id)}>
                <Handle type="target" position="top" style={{ borderRadius: 0, position: 'absolute', left: '0' }} isConnectable={isConnectable} />
                <Handle type="source" id="a" position="left" style={{ borderRadius: 0, borderRadius: 0, position: 'absolute', top: '100%' }} isConnectable={isConnectable} />
                <div style={textRhombus}>{data.text}</div>
                <Handle type="source" id="b" position="right" style={{ borderRadius: 0, borderRadius: 0, position: 'absolute', top: '0%' }} isConnectable={isConnectable} />
                <Handle type="source" id="c" position="bottom" style={{ borderRadius: 0, borderRadius: 0, position: 'absolute', left: '100%' }} isConnectable={isConnectable} />
            </div>
        );
    };
    // rhombus shape making ends
    // parallelogram shape making start
    const CustomNodeComponentParallelogram = ({ data, isConnectable }) => {
        const textparallelogram = {
            transform: 'skew(-20deg)'
        }
        const customNodeStylesParallelogram = {
            background: data.bgcolor,
            color: data.txtcolor,
            padding: '10px 30px',
            borderRadius: '2px',
            transform: 'skew(20deg)',
            border: `1px solid ${data.brcolor}`
        }
        return (
            <div style={customNodeStylesParallelogram} onClick={() => setcurrSelected(data.id)}>
                <Handle type="target" className="handle_button" position="top" style={{ borderRadius: 0, transform: 'skew(-20deg)' }} isConnectable={isConnectable} />
                <Handle type="source" className="handle_button" id="a" position="left" style={{ borderRadius: 0, transform: 'skew(-20deg)' }} isConnectable={isConnectable} />
                <div style={textparallelogram}>{data.text}</div>
                <Handle type="source" id="b" position="right" className="handle_button" style={{ borderRadius: 0, transform: 'skew(-20deg)' }} isConnectable={isConnectable} />
                <Handle type="source" id="c" position="bottom" className="handle_button" style={{ borderRadius: 0, transform: 'skew(-20deg)' }} isConnectable={isConnectable} />
            </div>
        );
    };
    // parallelogram shape making ends
    // Custom Nodes
    const nodeTypes = {
        rectangle: CustomNodeComponentRectangle,
        circle: CustomNodeComponentCircle,
        parallelogram: CustomNodeComponentParallelogram,
        rhombus: CustomNodeComponentRhombus,
        textfield: CustomNodeComponentTextField
    };
    // Shape Making Functions
    // text field
    const insertText = () => {
        const idnumber = elements.length;
        const newelement = elements.concat(
            {
                id: `${idnumber + 1}`,
                type: 'textfield',
                data: { text: shapetext, id: `${idnumber + 1}`, txtcolor: BoxTextColor },
                position: { x: 450, y: 300 }
            }
        )
        setElements(newelement);
    }
    // Rectangle
    const insertrect = () => {
        const idnumber = elements.length;
        const newelement = elements.concat(
            {
                id: `${idnumber + 1}`,
                type: 'rectangle',
                data: { text: shapetext, id: `${idnumber + 1}`, bgcolor: Boxbackground, txtcolor: BoxTextColor, brcolor: BorderColor },
                position: { x: 450, y: 300 },
                arrowHeadType: 'arrowclosed'
            }
        );
        setElements(newelement);
    }
    // Circle
    const insertcircle = () => {
        setpopup(true);
        const idnumber = elements.length;
        const newelement = elements.concat(
            {
                id: `${idnumber + 1}`,
                type: 'circle',
                data: { text: shapetext, id: `${idnumber + 1}`, bgcolor: Boxbackground, txtcolor: BoxTextColor, brcolor: BorderColor },
                position: { x: 450, y: 300 },
                arrowHeadType: 'arrowclosed'
            }
        );
        setElements(newelement);
    }
    // Parallelogram
    const insertPara = () => {
        setpopup(true);
        const idnumber = elements.length;
        const newelement = elements.concat(
            {
                id: `${idnumber + 1}`,
                type: 'parallelogram',
                data: { text: shapetext, id: `${idnumber + 1}`, bgcolor: Boxbackground, txtcolor: BoxTextColor, brcolor: BorderColor },
                position: { x: 450, y: 300 },
                arrowHeadType: 'arrowclosed'
            }
        )
        setElements(newelement);
    }
    // Rhombus
    const insertRhombus = async () => {
        const idnumber = await elements.length;
        const newelement = await elements.concat(
            {
                id: `${idnumber + 1}`,
                type: 'rhombus',
                data: { text: shapetext, id: `${idnumber + 1}`, bgcolor: Boxbackground, txtcolor: BoxTextColor, brcolor: BorderColor },
                position: { x: 450, y: 300 },
                arrowHeadType: 'arrowclosed'
            }
        )
        setElements(newelement);
    }
    const edgeTypes = {
        custom: CustomEdge,
    };
    return (
        <>
            <MainNavbar active="Simulator" />
            <drawingcontext.Provider value={{ insertrect, insertcircle, insertPara, insertRhombus, setpopup, setshapetext, setShapeSelected, shapeSelected, addedgeStyles, insertText, setBackground, Boxbackground, setBackground, BoxTextColor, setBoxTextColor, BorderColor, setBorderColor, edgeColor, setedgeColor, canvastype, canvasBg, setcanvastype, setcanvasBg, downloadPng, toolbar, settoolbar, elements, setElements }} >
                {
                    popup === false ? null :
                        <Popup />
                }
                <div className="main_container">
                    <Toolbar />
                    <ReactFlowProvider>
                        <div className="flow_chart_canvas" style={{ background: `${canvasBg}` }} id="flow_chart" >
                            <ReactFlow
                                elements={elements}
                                onElementsRemove={onElementsRemove}
                                onConnect={onConnect}
                                deleteKeyCode={46}
                                nodeTypes={nodeTypes}
                                edgeTypes={edgeTypes}
                            >
                                <Background
                                    variant={canvastype}
                                    gap={25}
                                    size={1}
                                    color="gray"

                                >
                                    <Controls />
                                </Background>
                            </ReactFlow>
                        </div>
                        <Toolbar2 />
                    </ReactFlowProvider>
                    
                </div>
            </drawingcontext.Provider>
        </>
    );
};