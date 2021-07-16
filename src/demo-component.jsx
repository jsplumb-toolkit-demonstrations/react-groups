import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { JsPlumbToolkitSurfaceComponent }  from 'jsplumbtoolkit-react';
import { jsPlumbToolkit, uuid } from 'jsplumbtoolkit';

import DragDropNodeSource from './drag-drop'
import NodeComponent from "./node-component.jsx";
import GroupComponent from "./group-component.jsx";

const randomColor = () => {
    let colors = ['#59bb59', '#c7a76c', '#8181b7', '#703a82', '#cc8080'];
    return colors[Math.floor(Math.random() * colors.length)];
};

export default function DemoComponent(props) {

    const surface = useRef(null);
    const toolkit = jsPlumbToolkit.newInstance();
    const [currentColor, setColor] = useState(randomColor());

    const view = {
        nodes: {
            "default":{
                jsx: (ctx) => { return <NodeComponent color={ctx.props.color} ctx={ctx}/> }
            }
        },
        groups: {
            "default":{
                jsx: (ctx) => { return <GroupComponent color={ctx.props.color} ctx={ctx}/> },
                endpoint:"Blank",
                anchor:"Continuous",
                revert:false,
                orphan:true,
                constrain:false,
                layout:{
                    type:"Circular"
                },
                events:{
                    click:function(){
                        console.log(arguments)
                    }
                }
            },
            constrained:{
                parent:"default",
                constrain:true
            }
        }
    };

    const renderParams = {
        layout:{
            type:"Spring",
            absoluteBacked:false
        },
        zoomToFit:true,
        consumeRightClick:false,
        jsPlumb: {
            Anchor:"Continuous",
            Endpoint: "Blank",
            Connector: [ "StateMachine", { cssClass: "connectorClass", hoverClass: "connectorHoverClass" } ],
            PaintStyle: { strokeWidth: 1, stroke: '#89bcde' },
            HoverPaintStyle: { stroke: "orange" },
            Overlays: [
                [ "Arrow", { fill: "#09098e", width: 10, length: 10, location: 1 } ]
            ]
        }
    };

    const changeColor = () => {
        let col;
        while (true) {
            col = randomColor();
            if (col !== currentColor) {
                break;
            }
        }
        setColor(col);
    };

    function dataGenerator(e) {
        return {
            type:"default",
            name:uuid().substring(0, 5)
        };
    }

    // load the dataset once the component has mounted.
    useEffect(() => {
        toolkit.load({url:"/data.json"});

        const nodePaletteElement = document.querySelector(".node-palette");
        ReactDOM.render(
            <DragDropNodeSource
                surface={surface.current.surface}
                selector={"div"}
                container={nodePaletteElement}
                dataGenerator={dataGenerator}
            />
            , nodePaletteElement);

    }, []);

    return <div style={{width:"100%",height:"100%",display:"flex"}}>
        <button onClick={() => changeColor()} style={{backgroundColor:currentColor}} className="colorButton">Change color</button>
        <JsPlumbToolkitSurfaceComponent childProps={{color:currentColor}} renderParams={renderParams} toolkit={toolkit} view={view} ref={surface} />
    </div>
}
