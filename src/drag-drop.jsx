import React from 'react';

import {SurfaceDropComponent} from 'jsplumbtoolkit-react-drop';

class DragDropNodeSource extends SurfaceDropComponent {
    render() {
        return [
            <div title="Drag Node to canvas" data-node-type="node" className="sidebar-item">
                <i className="icon-tablet"></i>Drag Node
            </div>,
            <div title="Drag Group to canvas" jtk-is-group="true" data-node-type="group" className="sidebar-item" >
                <i className="icon-tablet"></i>Drag Group
            </div>
        ];
    }
}

export default DragDropNodeSource;
