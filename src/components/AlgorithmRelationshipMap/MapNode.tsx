import React, { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import styles from "./styles.module.css";
import { CATEGORY_META, NodeCategory } from "../../data/algorithmRelationshipGraph";

export interface MapNodeData {
  label: string;
  category: NodeCategory;
  hasUrl: boolean;
  dimmed: boolean;
  selected: boolean;
}

const MapNode: React.FC<NodeProps<MapNodeData>> = ({ data }) => {
  const color = CATEGORY_META[data.category].color;

  return (
    <div
      className={styles.node}
      data-dimmed={data.dimmed}
      data-selected={data.selected}
      data-linked={data.hasUrl}
      style={{
        background: `${color}1a`,
        color,
        borderColor: data.selected ? color : "transparent",
      }}
    >
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      {data.label}
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </div>
  );
};

export default memo(MapNode);
