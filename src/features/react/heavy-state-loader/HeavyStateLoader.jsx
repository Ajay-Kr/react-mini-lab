import { 
  useState, 
  useEffect, 
  useCallback 
} from "react";
import { useInterval } from "../../../shared/hooks/useInterval";

export function HeavyStateLoader() {
  function generateHeavyData() {
    console.log("generateHeavyData")
    let arr = new Array();
    for(let i = 0; i < 1000; i++) {
      arr.push(i);
    }
    return arr.length;
  }

  const [len] = useState(generateHeavyData);
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  // useEffect(() => {
  //   generateHeavyData();
  // }, []);
  
  const handleIncrement = useCallback(() => {
    setCount((prev) => prev+1);
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(()=> {
  //     setCount(prev => prev+1);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);
  // function incr() {
  //   setCount(prev => prev+1);
  // }
  // const incr = useCallback(() => setCount(prev => prev+1), []);
  // useInterval(incr, 1000);

  function handleStepIncrement() {
    setStep(prev => prev+1);
  }
  function incr() {
    setCount(prev => prev + step);
  }
  useInterval(incr, 2000);



  console.log(`${count} Rerendered`);

  return (
    <div>
      <h2>Heavy State Loader</h2>
      <p><b>Heavy Length</b>: <span>{len}</span></p>
      <p><b>Ctr</b>: <span>{count}</span></p>
      <button onClick={handleIncrement}>Increment</button>
      <p><b>Step</b>: <span>{step}</span></p>
      <button onClick={handleStepIncrement}>Increment Step</button>
    </div>
  )
}