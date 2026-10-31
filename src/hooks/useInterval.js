import { useEffect, useRef } from "react";

export function useInterval(callback = () => {}, delay = 1000, cur = 0) {
  console.log("useInterval");
  const ref = useRef(1);

  const savedCallback = useRef(callback);
  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    console.log("Started Interval");
    // const interval = setInterval(()=> {
    //   // callback(cur + 1);
    //   callback();
    //   console.log(`Ref: ${ref.current} | cur : ${cur}`);
    //   ref.current = ref.current+1;
    // }, delay);

    // return () => {
    //   clearInterval(interval);
    //   console.log("Cleared Interval")
    // }

    const tick = () => {
      savedCallback.current();
    };

    if(delay != null) {
      const interval = setInterval(tick, delay);

      return () => {
        clearInterval(interval);
        console.log("Cleared Interval")
      }
    }
  }, [delay]);
}