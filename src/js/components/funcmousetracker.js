import React, { useState, useEffect, useRef, useContext } from 'react';

function Cat (props) {
    const mouse = props.mouse;
    return (
      <img src="./../public/logo512.png" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
}

function Mouse (props) {    
    const [state, setState] = useState({ x: 0, y: 0});

    function handleMouseMove(event) {
    setState({
      x: event.clientX,
      y: event.clientY
    });
    }

    return (
      <div style={{ height: '100vh' }} onMouseMove={handleMouseMove}>
        {props.render(state)}
      </div>
    );
}

function FuncMouseTracker () {
    return (
      <div>
        <h4>Implementation of Render Props using Hooks</h4>
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
}

function withMouse(Component) {
  return function(props) {
      return (
        <>
          <h4>Implementation of Render Props Using Hooks and HOC</h4>
          <Mouse render={mouse => (
            <Component {...props} mouse={mouse} />
          )}/>
        </>
      );
  }
}

export const HOCMouseTracker = withMouse(Cat);
export default FuncMouseTracker;