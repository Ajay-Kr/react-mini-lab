import { useState } from "react";

import { BoxOrder } from "./features/react/box-order/BoxOrder";
import { DragList } from "./features/react/dragList/DragList";
import { StickyShapes } from "./features/react/stickyShapes/StickyShapes";
import { HeavyStateLoader } from "./features/react/heavy-state-loader/HeavyStateLoader";
import { JsonViewer } from "./features/react/json-viewer/JsonViewer";
import { LinkedListVisual } from "./features/data-structures/linked-list/visualizer/LinkedListVisual";

const experiments = {
  heavyStateLoader: HeavyStateLoader,
  jsonViewer: JsonViewer,
  boxOrder: BoxOrder,
  dragList: DragList,
  stickyShapes: StickyShapes,
  linkedList: LinkedListVisual,
};

export function ExperimentPlayground() {
  const [selected, setSelected] = useState("linkedList");

  const SelectedExperiment = experiments[selected];

  return (
    <div>
      <select
        value={selected}
        onChange={(event) => setSelected(event.target.value)}
      >
        <option value="linkedList">Linked List</option>
        <option value="dragList">Drag List</option>
        <option value="stickyShapes">Sticky Shapes</option>
        <option value="heavyStateLoader">Heavy State Loader</option>
        <option value="jsonViewer">JSON Viewer</option>
        <option value="boxOrder">Box Order</option>
      </select>

      <SelectedExperiment />
    </div>
  );
}