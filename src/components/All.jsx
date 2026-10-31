import { BoxOrder } from "./BoxOrder";
import { DragList } from "./dragList/DragList";
import { LinkedListVisual } from "./linkedListVisual/LinkedListVisual";
// import { HeavyStateLoader } from "./HeavyStateLoader";
// import { JsonViewer } from "./JsonViewer";
import { StickyShapes } from "./stickyShapes/StickyShapes";

export function All() {
  console.log("All rendered");

  return (
    <div>
      {/* <HeavyStateLoader /> */}
      {/* <JsonViewer /> */}
      {/* <BoxOrder /> */}
      {/* <DragList /> */}
      <StickyShapes />
      <LinkedListVisual />
    </div>
  )
}