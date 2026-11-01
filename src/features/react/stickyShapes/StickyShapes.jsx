import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

export function StickyShapes() {
  const [shapes, setShapes] = useState([
    { _id: 1, x: 50, y: 50, title: "one" },
    { _id: 2, x: 200, y: 100, title: "two" },
    { _id: 3, x: 100, y: 250, title: "three" }
  ]);
  const [input, setInput] = useState("");
  const dragInfoRef = useRef({
    offsetX: 0,
    offsetY: 0,
    shapeId: null
  })

  const cavasContainerRef = useRef();
  useEffect(() => console.log({h: cavasContainerRef.height}), []);

  function handleInputChange(e) {
    const val = e.target.value;
    setInput(val);
  }

  function handleAddShape() {
    if(!input) return;
    const canvasContainerDimension = {
      maxH: cavasContainerRef.current.getBoundingClientRect().height - 50 - 6,
      maxW: cavasContainerRef.current.getBoundingClientRect().width - 100 - 6
    }

    setShapes((prev) => ([
      ...prev,
      {
        _id: Date.now()+input,
        x: Math.floor(Math.random()*canvasContainerDimension.maxW),
        y: Math.floor(Math.random()*canvasContainerDimension.maxH),
        title: input
      }
    ]));
    setInput("");
  }

  // function getNewCoords(diff, currentClientCoords) {
  //   const newX = currentClientCoords.cX - diff.x;
  //   const newY = currentClientCoords.cY - diff.y;
  // }

  function handlePointerDown(e) {
    const elm = e.currentTarget;
    const {top, left} = elm.getBoundingClientRect();
    const cX = e.clientX;
    const cY = e.clientY;

    dragInfoRef.current = {
      offsetX: cX - left,
      offsetY: cY - top,
      shapeId: elm.id
    };
  }

  const getItemIdFromTagId = tagId => tagId.replace("canvas-item_", "");

  function handlePointerMove(e) {
    const elm = e.currentTarget;
    console.log({target: e.target});
    // 1. Get the pointer coordinates
    const cX = e.clientX;
    const cY = e.clientY;

    // 2. Check whether a shape is being dragged
    if(!dragInfoRef.current.shapeId) return;
    // 3. Get canvas coordinates
    const {top, left} = elm.getBoundingClientRect();

    setShapes(prev => {
      // 4. Copy Array
      const next = [...prev];
      // 5. Find the dragged element respective item
      const dragElmIdx = next.findIndex(item => item._id == getItemIdFromTagId(dragInfoRef.current.shapeId));
      // 6. return prev is shape isn't found
      if(dragElmIdx < 0) return prev;
      // 7. Calculate new X and Y
      next[dragElmIdx] = {
        ...next[dragElmIdx],
        x : cX - dragInfoRef.current.offsetX - left  - 3,
        y : cY - dragInfoRef.current.offsetY - top - 3
      }
      
      return next;
    })
  }

  // function handlePointerUp() {

  //   dragInfoRef.current = {
  //     offsetX: 0, 
  //     offsetY: 0, 
  //     shapeId: null
  //   }
  // }

  useEffect(() => console.log({shapes}), [shapes]);

  return (
    <div>
      <h2>Sticky Shapes</h2>
      
      <div>
        <form action={handleAddShape}>
          <div>
            <label htmlFor="input-title">Enter title</label>
            <input id={"input-title"} name={"input-title"} type="text" placeholder="Enter title..." value={input} onChange={handleInputChange} />
          </div>

          <button type="submit">Add</button>
        </form>
      </div>
      <style>
        {`
          .canvas-container {
            position: relative;
            width: 100%;
            height: 50vh;
            border: 3px solid;
            background: rgb(82 70 61);
            overflow: hidden;
          }
          .canvas-item {
            min-width: 100px;
            min-height: 50px;
            border: 2px solid rgb(241, 112, 13);
            background: rgb(58, 45, 35);
            position: absolute;
            color: rgb(229 113 22);
            padding: 2px;
          }
        `}
      </style>
      <div 
        id="canvas-container" 
        className="canvas-container" 
        ref={cavasContainerRef}
        onPointerMove={handlePointerMove}
      >
        {
          shapes.map(item => {
            return (
              <div 
                key={`canvas-item_${item._id}`} 
                id={`canvas-item_${item._id}`} 
                style={{
                  top: `${item.y}px`,
                  left: `${item.x}px`,
                }}
                className="canvas-item"
                onPointerDown={handlePointerDown}
              >
                {item.title}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}