import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
  SimulationNodeDatum,
} from "d3-force";
import {
  CatalogEdge,
  CatalogNode,
} from "../../data/algorithmRelationshipGraph";

export const LAYOUT_WIDTH = 1400;
export const LAYOUT_HEIGHT = 900;

export interface PositionedNode extends SimulationNodeDatum {
  id: string;
  x: number;
  y: number;
}

/**
 * Runs a d3-force simulation synchronously (no animation — we just want a
 * settled layout) and returns each node's final (x, y). Ticking manually
 * a fixed number of times is the standard way to use d3-force outside of
 * d3's own render loop.
 */
export function computeForceLayout(
  nodes: CatalogNode[],
  edges: CatalogEdge[],
  width: number,
  height: number,
): Map<string, { x: number; y: number }> {
  const simNodes: PositionedNode[] = nodes.map((n) => ({
    id: n.id,
    x: 0,
    y: 0,
  }));

  const simulation = forceSimulation(simNodes)
    .force(
      "link",
      forceLink<PositionedNode, { source: string; target: string }>(
        edges.map((e) => ({ source: e.source, target: e.target })),
      )
        .id((d) => d.id)
        .distance(110)
        .strength(0.35),
    )
    .force("charge", forceManyBody().strength(-320))
    .force("center", forceCenter(width / 2, height / 2))
    .force("collide", forceCollide(56))
    .stop();

  const TICKS = 300;
  for (let i = 0; i < TICKS; i++) {
    simulation.tick();
  }

  const positions = new Map<string, { x: number; y: number }>();
  for (const n of simNodes) {
    positions.set(n.id, { x: n.x ?? 0, y: n.y ?? 0 });
  }
  return positions;
}
