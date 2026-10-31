import { useEffect } from "react";
import { useState } from "react"

export function DragList() {
  const [list, setList] = useState([]);
  const [input, setInput] = useState({title: "", value: ""});
  // addons
  const [dragOverId, setDragOverId] = useState(null);
  const [draggedId, setDraggedId] = useState(null);

  function handleInput(e) {
    const val = e.target.value;
    const key = e.target.id;

    setInput(prev => ({
        ...prev,
        [key]: val
    }));
  }

  function addItem() {
    if(!input.title) return;
    setList(prev => {
      const next = [...prev];
      next.push(input);
      return next;
    });
    setInput({
      title: "",
      value: ""
    });
  }

  function handleDragStart(e) {
    console.log("handleDragStart: ", e.currentTarget);
    e.dataTransfer.setData("draggedId", e.currentTarget.id);
    setDraggedId(e.currentTarget.id);
  }

  function handleDragOver(e) {
    e.preventDefault();
    // console.log("handleDragOver", e.currentTarget);
    const elmId = e.currentTarget.id;
    if(draggedId != elmId) 
      setDragOverId(elmId);
    else 
      setDragOverId(null);
  }
  function handleDragEnter(e) {
    e.preventDefault();
    console.log("handleDragEnter", e.currentTarget);
    const elmId = e.currentTarget.id;
    setDragOverId(elmId);
  }
  function handleDragEnd(e) {
    e.preventDefault();
    console.log("handleDragEnd: ", e.currentTarget);
    setDragOverId(null);
    setDraggedId(null);
  }
  function handleDragLeave(e) {
    e.preventDefault();
    console.log("handleDragLeave: ", e.currentTarget);
    setDragOverId(null);
  }

  function getItemIdx(id) {
    const currentTitle = id.replace("list_", "");
    return list.findIndex(elm => elm.title === currentTitle);
  }
  function shiftRight(arr, currentItemIdx, droppedItemIdx) {
    for(let i = droppedItemIdx; i > currentItemIdx; i--) {
      arr[i] = arr[i-1];
    }
  }
  function shiftLeft(arr, currentItemIdx, droppedItemIdx) {
    for(let i = droppedItemIdx; i < currentItemIdx; i++) {
      arr[i] = arr[i+1];
    }
  }
  function handleDrop(e) {
    e.preventDefault();
    console.log("handleDrop ", e.currentTarget);

    const currentId = e.currentTarget.id;
    const droppedId = e.dataTransfer.getData("draggedId");
    if(currentId === droppedId) return;

    setList(prev => {
      const currentItemIdx = getItemIdx(currentId);
      const droppedItemIdx = getItemIdx(droppedId);
      // const droppedItem = list[droppedItemIdx];

      const next = [...prev];
      // if(droppedItemIdx < currentItemIdx) shiftLeft(next, currentItemIdx, droppedItemIdx);
      // else shiftRight(next, currentItemIdx, droppedItemIdx);
      // next[currentItemIdx] = droppedItem;

      const [itemRemoved] = next.splice(droppedItemIdx, 1);
      next.splice(currentItemIdx, 0, itemRemoved);
      
      return next;
    })
  }

  return (
    <div>
      <h2>Drag List</h2>
      <div id={"list-container"}>
        <form action={addItem}>
          <div>
            <label htmlFor="title">Enter title</label>
            <input id="title" type="text" placeholder="Add title..." onChange={(e) => handleInput(e)} value={input.title || ""} />
          </div>

          <div>
            <label htmlFor="content">Enter title</label>
            <input id="content" type="text" placeholder="Add content..." onChange={(e) => handleInput(e)} value={input.content || ""} />
          </div>
          <button type="Submit">Add</button>
        </form>

        <hr />

        <style>
          {`
            #list {
              display: flex;
              flex-direction: column;
              gap: .5rem;
              position: relative;
              min-height: 100vh;
              min-width: 100%;
              border: 1px solid;
              padding: .5rem;
            }

            .list-item {
              border: 1px solid grey;
              background: rgb(216, 216, 216);
              min-width: 100px;
              min-height: 50px;
              position: absolute;
              left: 0;
            }
          `}
        </style>
        <div id="list" className="list" onDragLeave={handleDragLeave}>
          {
            list.map((elm, _idx) => {
              const id = `list_${elm.title}`;
              const top = 55 * _idx;
              
              return (
                <div 
                  key={id} id={id} 
                  className="list-item" 
                  style={{
                    top: `${top}px`, 
                    ...(dragOverId === id && {background: "red"} || ""),
                    ...(draggedId === id && {opacity: ".5"} || ""),
                    ...(draggedId && id !== dragOverId && id != draggedId && {border: "1px dashed teal"} || "")
                  }} 
                  draggable
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onDragEnd={handleDragEnd}
                >
                  <p>{elm.title || ""}</p>
                  <p>{elm.content || ""}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}