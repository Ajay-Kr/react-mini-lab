import { useState } from "react";

function DropButton({id, handleClick=()=>{}, value="⬇️"}) {
  return <button id={id} onClick={(e) => handleClick(e)}><span>{value}</span></button>
}

function Wrapper({children, nKey, style={}}) {
  console.log("Comp: Wrapper");

  return <div key={nKey} style={{...style}}>
    {children}
  </div>
}

export function JsonViewer() {
  function getJsonData() {
    console.log("fn: getJsonData");
    const json = {
      first_name: "Ajay", 
      last_name: "Kumar", 
      contact: {
        phone: "9876543210",
        address: {
          house_number: "123", 
          block: "A", 
          city: "Delhi", 
        },
      },
      hobbies: ["h1", "h2", "h3"],
      done: true, 
      not_done: false, 
      some: null
    }
    return { json };
  }
  function getDropdowns(json, dropdowns={}, parentKey="") {
    console.log("fn: getDropdowns");
    for(const [key, value] of Object.entries(json)) {
      const nKey = parentKey ? parentKey+"_"+key : key;

      if(value && typeof value === "object") {
        dropdowns[nKey] = false;
        getDropdowns(value, dropdowns, nKey);
      }
    }
    dropdowns["json"] = true;
    return dropdowns;
  }
  const [data] = useState(getJsonData);
  const [dropdowns, setDropdowns] = useState(() => getDropdowns(data));

  // function handleClick(e) {
  //   console.log("fn: handleClick");
  //   const key = e.currentTarget.id;
  //   setDropdowns(prev => ({
  //       ...prev, 
  //       [key]: !prev[key]
  //     })
  //   );
  // }
  function toggleDropdown(path) {
    console.log("fn: toggleDropdown");
    setDropdowns(prev => ({
      ...prev,
      [path] : !prev[path]
    }))
  }

  function formatValue(value) {
    if(value === null) return "null";
    else if(typeof value === "string") return `"${value}"`;
    else if(typeof value === "boolean") return String(value);
    return String(value);
  }

  function getObjectMeta(value) {
    if(Array.isArray(value)) return `[ len: ${value.length} ]`;
    return `{...}`
  }

  function printData(json, margin=20, parent="") {
    return Object.entries(json).map(([key, value]) => {
      const nKey = parent ? parent+"_"+key : key;
      const isObject = value !== null && typeof value === "object";
      const style = { marginLeft: margin };

      return isObject
            ? <Wrapper key={nKey} style={style}>
                <DropButton 
                  id={nKey} 
                  // handleClick={handleClick} 
                  handleClick={() => toggleDropdown(nKey)}
                  value={dropdowns[nKey] ? "⬇️" : "➡️"} 
                />
                <span>{key}: {getObjectMeta(value)}</span>
                { dropdowns[nKey] && 
                    printData(value, margin+20, nKey)
                }
              </Wrapper>
            : <Wrapper key={nKey} style={style}>
                <span>{key}: {formatValue(value)}</span>
              </Wrapper>
    })
  }

  return (
    <div>
      <h2>Json Viewer</h2>
      {printData(data)}
    </div>
  )
}

