export default function NodeComponent({ color, ctx }) {

    const { vertex, surface, toolkit } = ctx;
    const data = vertex.data;

    function deleteMe() {
        toolkit.removeNode(vertex)
    }

    return (
        <>
            <h3 style={{color:color}}>{data.name}</h3>
            <div className="delete" title="Click to delete" onClick={() => deleteMe()}></div>
            <div className="connect"></div>
            <jtk-source filter=".connect"></jtk-source>
            <jtk-target></jtk-target>
        </>
    );
}
