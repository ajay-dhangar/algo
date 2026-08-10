const fs = require("fs");
const path = require("path");

require("ts-node/register");

const {
  computeForceLayout,
} = require("../src/components/AlgorithmRelationshipMap/layout");
const {
  CATALOG_NODES,
  CATALOG_EDGES,
} = require("../src/data/algorithmRelationshipGraph");

const OUTPUT_DIR = path.join(
  __dirname,
  "../src/components/AlgorithmRelationshipMap/generated",
);
const OUTPUT_FILE = path.join(OUTPUT_DIR, "layoutPositions.json");
const LAYOUT_WIDTH = 1400;
const LAYOUT_HEIGHT = 900;

function main() {
  const positions = computeForceLayout(
    CATALOG_NODES,
    CATALOG_EDGES,
    LAYOUT_WIDTH,
    LAYOUT_HEIGHT,
  );
  const output = {};

  positions.forEach((pos, id) => {
    output[id] = { x: pos.x, y: pos.y };
  });

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2) + "\n", "utf8");

  console.log(
    `✅ Generated ${path.relative(process.cwd(), OUTPUT_FILE)} (${
      Object.keys(output).length
    } nodes)`,
  );
}

main();
