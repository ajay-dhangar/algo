import React, { useMemo, useState, useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  MarkerType,
  useReactFlow,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import Link from "@docusaurus/Link";
import {
  CATALOG_NODES,
  CATALOG_EDGES,
  CATEGORY_META,
  NodeCategory,
} from "../../data/algorithmRelationshipGraph";
import { computeForceLayout } from "./layout";
import MapNode, { MapNodeData } from "./MapNode";
import styles from "./styles.module.css";

const nodeTypes = { algoNode: MapNode };

const LAYOUT_WIDTH = 1400;
const LAYOUT_HEIGHT = 900;

const ALL_CATEGORIES = Object.keys(CATEGORY_META) as NodeCategory[];

function AlgorithmRelationshipMapInner() {
  const [query, setQuery] = useState("");
  const [activeCategories, setActiveCategories] = useState<Set<NodeCategory>>(
    new Set(ALL_CATEGORIES)
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { fitView } = useReactFlow();

  // Layout is computed once — the graph shape never changes at runtime,
  // so there's no need to re-run the force simulation on every render.
  const positions = useMemo(
    () => computeForceLayout(CATALOG_NODES, CATALOG_EDGES, LAYOUT_WIDTH, LAYOUT_HEIGHT),
    []
  );

  const nodeById = useMemo(() => new Map(CATALOG_NODES.map((n) => [n.id, n])), []);

  // Which nodes are directly connected to the current selection, used to
  // highlight a neighborhood and dim everything else.
  const neighborIds = useMemo(() => {
    if (!selectedId) return null;
    const set = new Set<string>([selectedId]);
    for (const e of CATALOG_EDGES) {
      if (e.source === selectedId) set.add(e.target);
      if (e.target === selectedId) set.add(e.source);
    }
    return set;
  }, [selectedId]);

  const matchesSearch = useCallback(
    (label: string) => query.trim() === "" || label.toLowerCase().includes(query.trim().toLowerCase()),
    [query]
  );

  const nodes: Node<MapNodeData>[] = useMemo(() => {
    return CATALOG_NODES.map((n) => {
      const pos = positions.get(n.id) ?? { x: 0, y: 0 };
      const categoryActive = activeCategories.has(n.category);
      const searchActive = matchesSearch(n.label);
      const inNeighborhood = !neighborIds || neighborIds.has(n.id);
      const dimmed = !categoryActive || !searchActive || !inNeighborhood;

      return {
        id: n.id,
        type: "algoNode",
        position: pos,
        data: {
          label: n.label,
          category: n.category,
          hasUrl: Boolean(n.url),
          dimmed,
          selected: selectedId === n.id,
        },
      };
    });
  }, [positions, activeCategories, matchesSearch, neighborIds, selectedId]);

  const edges: Edge[] = useMemo(() => {
    return CATALOG_EDGES.map((e, i) => {
      const inNeighborhood = !selectedId || (e.source === selectedId || e.target === selectedId);
      return {
        id: `${e.source}-${e.target}-${i}`,
        source: e.source,
        target: e.target,
        label: selectedId && inNeighborhood ? e.relation : undefined,
        animated: Boolean(selectedId && inNeighborhood),
        style: {
          stroke: "var(--ifm-color-emphasis-400, #94a3b8)",
          opacity: selectedId ? (inNeighborhood ? 0.9 : 0.06) : 0.35,
        },
        labelStyle: { fontSize: 10, fontWeight: 700 },
        labelBgStyle: { fill: "var(--ifm-background-color, #fff)", fillOpacity: 0.9 },
        markerEnd: { type: MarkerType.ArrowClosed, width: 14, height: 14 },
      };
    });
  }, [selectedId]);

  const toggleCategory = (category: NodeCategory) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  };

  const selectedNode = selectedId ? nodeById.get(selectedId) : null;
  const relatedEdgesForPanel = selectedId
    ? CATALOG_EDGES.filter((e) => e.source === selectedId || e.target === selectedId)
    : [];

  return (
    <div className={styles.wrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={(_, node) => setSelectedId((cur) => (cur === node.id ? null : node.id))}
        onPaneClick={() => setSelectedId(null)}
        fitView
        minZoom={0.2}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={20} size={1} color="var(--ifm-color-emphasis-300, #cbd5e1)" />
        <Controls showInteractive={false} />
        <MiniMap
          pannable
          zoomable
          nodeColor={(n) => CATEGORY_META[(n.data as MapNodeData).category].color}
          maskColor="rgba(0,0,0,0.06)"
        />
      </ReactFlow>

      {/* Search + reset */}
      <div className={styles.toolbar}>
        <input
          type="text"
          className={styles.searchBox}
          placeholder="Search algorithms…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search the relationship map"
        />
        <button
          type="button"
          className={styles.searchBox}
          onClick={() => {
            setQuery("");
            setSelectedId(null);
            setActiveCategories(new Set(ALL_CATEGORIES));
            fitView();
          }}
        >
          Reset view
        </button>
      </div>

      {/* Category legend / filter */}
      <div className={styles.legend}>
        {ALL_CATEGORIES.map((cat) => {
          const meta = CATEGORY_META[cat];
          const active = activeCategories.has(cat);
          return (
            <button
              key={cat}
              type="button"
              className={styles.legendChip}
              data-active={active}
              onClick={() => toggleCategory(cat)}
              style={{ borderColor: active ? meta.color : "transparent" }}
            >
              <span className={styles.legendDot} style={{ background: meta.color }} />
              {meta.label}
            </button>
          );
        })}
      </div>

      {/* Selected node info panel */}
      {selectedNode && (
        <div className={styles.infoPanel}>
          <h4 className={styles.infoPanelTitle}>{selectedNode.label}</h4>
          <p className={styles.infoPanelBlurb}>{selectedNode.blurb}</p>
          {relatedEdgesForPanel.length > 0 && (
            <ul className={styles.infoPanelRelations}>
              {relatedEdgesForPanel.map((e, i) => {
                const isSource = e.source === selectedId;
                const otherId = isSource ? e.target : e.source;
                const otherLabel = nodeById.get(otherId)?.label ?? otherId;
                return (
                  <li key={i}>
                    {isSource ? `${e.relation} → ${otherLabel}` : `← ${e.relation} ${otherLabel}`}
                  </li>
                );
              })}
            </ul>
          )}
          {selectedNode.url && (
            <Link to={selectedNode.url} className={styles.infoPanelLink}>
              Read the doc →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * React Flow needs the ReactFlowProvider context for hooks like
 * useReactFlow to work (used here for the "Reset view" fitView call).
 */
const AlgorithmRelationshipMap: React.FC = () => (
  <ReactFlowProvider>
    <AlgorithmRelationshipMapInner />
  </ReactFlowProvider>
);

export default AlgorithmRelationshipMap;
