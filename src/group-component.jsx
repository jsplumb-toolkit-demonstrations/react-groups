import React  from 'react'

export default function GroupComponent({ color, ctx }) {

    const { vertex, surface, toolkit } = ctx;
    const data = vertex.data;

    function deleteMe() {
        toolkit.removeGroup(vertex)
    }

    function toggleMe() {
        surface.toggleGroup(vertex)
    }

    return (
        <>
            <div className="group-title" style={{backgroundColor:color}}>
                {data.name}
                <button className="expand" onClick={()=>toggleMe()}></button>
                <button className="group-delete" onClick={() => deleteMe()}></button>
            </div>
            <div jtk-group-content="true"></div>
            <div className="group-connect connect">
                <i className="fa fa-chain"></i>
            </div>
            <jtk-source filter=".group-connect, .group-connect *"></jtk-source>
            <jtk-target></jtk-target>
        </>
    );
}
