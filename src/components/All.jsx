import { BoxOrder } from "./BoxOrder";
import { DragList } from "./dragList/DragList";
// import { HeavyStateLoader } from "./HeavyStateLoader";
// import { JsonViewer } from "./JsonViewer";
import { StickyNotes } from "./stickyNotes/StickyNotes";

export function All() {
  console.log("All rendered");

  return (
    <div>
      {/* <HeavyStateLoader /> */}
      {/* <JsonViewer /> */}
      {/* <BoxOrder /> */}
      <DragList />
      <StickyNotes />
    </div>
  )
}