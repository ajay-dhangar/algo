import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
  forceX,
  forceY,
  SimulationNodeDatum,
} from "d3-force";
import {
  CatalogEdge,
  CatalogNode,
} from "../../data/algorithmRelationshipGraph";

export const LAYOUT_WIDTH = 1400;
export const LAYOUT_HEIGHT = 900;

/** Radius of the node pill for collision avoidance. */
const COLLISION_RADIUS = 56;

/** Vertical band (from bottom) where isolated nodes are anchored. */
const ISOLATED_STRIP_Y_FRACTION = 0.88;

export interface PositionedNode extends SimulationNodeDatum {
  id: string;
  x: number;
  y: number;
  /** True when the node has no edges in the supplied edge list. */
  isolated?: boolean;
}

/**
 * Runs a d3-force simulation synchronously (no animation — we just want a
 * settled layout) and returns each node's final (x, y) plus a Set of IDs
 * that are isolated (have no edges referencing them).
 *
 * ### Why isolated nodes were stacking
 * All nodes previously initialised at (0, 0).  Connected nodes get pushed
 * apart immediately by forceLink + forceManyBody.  Isolated nodes have NO
 * link force acting on them, so forceCenter pulls every one of them toward
 * the canvas centre.  forceCollide needs a direction vector to push nodes
 * apart, but that vector is (0, 0) when two nodes occupy the exact same
 * position — so the collision force is a no-op and the nodes stack.
 *
 * ### Fix
 * 1. Compute degree for every node from the edge list.
 * 2. Pre-position isolated nodes on a deterministic ring so the collision
 *    force always has a non-zero direction vector to work with.
 * 3. Apply forceX / forceY to pull isolated nodes toward a dedicated bottom
 *    strip, keeping them away from the main connected cluster.
 * 4. Use a per-node charge-strength function that gives isolated nodes a
 *    stronger mutual repulsion so they spread apart rather than converging.
 */
export function computeForceLayout(
  nodes: CatalogNode[],
  edges: CatalogEdge[],
  width: number,
  height: number,
): Map<string, { x: number; y: number; isolated: boolean }> {
  // ── 1. Classify nodes by degree ──────────────────────────────────────────
  const degree = new Map<string, number>(nodes.map((n) => [n.id, 0]));
  for (const e of edges) {
    degree.set(e.source, (degree.get(e.source) ?? 0) + 1);
    degree.set(e.target, (degree.get(e.target) ?? 0) + 1);
  }
  const isolatedIds = new Set(
    Array.from(degree.entries())
      .filter(([, d]) => d === 0)
      .map(([id]) => id),
  );

  const isolatedList = nodes.filter((n) => isolatedIds.has(n.id));

  // ── 2. Pre-position isolated nodes on a ring so collision has direction ───
  //
  // Place them evenly around a circle that sits in the bottom strip.
  // Even if only one isolated node exists we give it a non-zero offset so it
  // never coincides with the cluster centre.
  const isolatedCx = width / 2;
  const isolatedCy = height * ISOLATED_STRIP_Y_FRACTION;
  const isolatedRingR = Math.max(
    COLLISION_RADIUS * 1.5,
    (isolatedList.length * COLLISION_RADIUS * 2.2) / (2 * Math.PI),
  );

  const simNodes: PositionedNode[] = nodes.map((n, globalIdx) => {
    if (isolatedIds.has(n.id)) {
      const isolatedIdx = isolatedList.findIndex((il) => il.id === n.id);
      const angle = (2 * Math.PI * isolatedIdx) / Math.max(isolatedList.length, 1);
      return {
        id: n.id,
        x: isolatedCx + isolatedRingR * Math.cos(angle),
        y: isolatedCy + isolatedRingR * Math.sin(angle),
        isolated: true,
      };
    }
    // Spread connected nodes in a jittered grid so forceManyBody has direction
    const col = globalIdx % 8;
    const row = Math.floor(globalIdx / 8);
    return {
      id: n.id,
      x: (width / 9) * (col + 1) + (Math.random() - 0.5) * 40,
      y: (height * 0.65 / 8) * (row + 1) + (Math.random() - 0.5) * 40,
      isolated: false,
    };
  });

  // ── 3. Build simulation ───────────────────────────────────────────────────
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
    // Per-node charge: isolated nodes repel each other harder so they spread
    .force(
      "charge",
      forceManyBody<PositionedNode>().strength((d) =>
        d.isolated ? -600 : -320,
      ),
    )
    // Main cluster anchored toward the upper-centre; isolated strip is below
    .force("center", forceCenter(width / 2, height * 0.42))
    .force("collide", forceCollide(COLLISION_RADIUS))
    // Gently push isolated nodes toward their dedicated Y strip
    .force(
      "isolatedY",
      forceY<PositionedNode>(isolatedCy).strength((d) =>
        d.isolated ? 0.25 : 0,
      ),
    )
    // Keep isolated nodes horizontally centred (prevents drifting far left/right)
    .force(
      "isolatedX",
      forceX<PositionedNode>(isolatedCx).strength((d) =>
        d.isolated ? 0.04 : 0,
      ),
    )
    .stop();

  const TICKS = 400; // extra ticks to let the isolated strip settle cleanly
  for (let i = 0; i < TICKS; i++) {
    simulation.tick();
  }

  // ── 4. Collect results ────────────────────────────────────────────────────
  const positions = new Map<string, { x: number; y: number; isolated: boolean }>();
  for (const n of simNodes) {
    positions.set(n.id, {
      x: n.x ?? 0,
      y: n.y ?? 0,
      isolated: n.isolated ?? false,
    });
  }
  return positions;
}
