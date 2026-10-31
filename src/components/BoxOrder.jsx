import { useEffect } from "react";
import { useState } from "react";

function Box({num, handleClick, isClicked=false}) {
  return <button style={{
    border: "1px solid", 
    aspectRatio: 1, 
    height: "100%", 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center",
    background: isClicked ? "teal" : ""
  }}
  onClick={handleClick}
  id={num}
  disabled={isClicked}
  >{num}</button>
}

export function BoxOrder() {
  console.log("Comp: BoxOrder");

  const [clicked, setClicked] = useState(() => []);
  const [popping, setPopping] = useState(false);

  function handleClick(path) {
    console.log("fn: handleClick");

    if(popping) return;
    if(clicked.includes(path)) return;

    if(clicked.length === 8) setPopping(true);
    setClicked(prev => {
      const next = [...prev];
      next.push(path)
      return next
    })
  }

  useEffect(() => {
    if(!popping) return;
    let popped = 0;
    const interval = setInterval(() => {
      setClicked(prev => {
        const next = [...prev];
        next.pop();
        return next;
      });
      popped++;
      if(popped === 9) {
        clearInterval(interval);
        setPopping(false);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
      console.log("interval cleared");
    }
  }, [popping]);

  useEffect(() => {
    console.log({clicked});
  }, [clicked]);
  

  return (
    <div>
      <h2>Box Order</h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: ".5rem",
        border: "1px solid",
        padding: ".5rem",
        maxWidth: "320px",
      }}>
        {
          Array.from({length: 9}).map((elm, _idx) => (
            <Box 
              key={_idx} 
              num={_idx} 
              handleClick={() => handleClick(_idx)} 
              isClicked={clicked.includes(_idx)} 
            />
          ))
        }
      </div>
      {
        clicked.size === 9 &&
        <div>
          <hr />
          <b>Order : </b> [
            {clicked.join(" ")}
          ]
        </div>
      }
    </div>
  )
}