import * as joint from "jointjs";

export const roleShape = new joint.shapes.standard.Rectangle({
  position: { x: 50, y: 50 },
  size: { width: 100, height: 40 },
  attrs: {
    body: { fill: "#4caf50" },
    label: { text: "Role", fill: "white" },
  },
  ports: {
    groups: {
      a: { position: "top" },
    },
  },
});

export const databaseShape = new joint.shapes.standard.Rectangle({
  position: { x: 50, y: 200 },
  size: { width: 100, height: 40 },
  attrs: {
    body: { fill: "#2196f3" },
    label: { text: "Database", fill: "white" },
  },
  ports: {
    groups: {
      a: { position: "top" },
    },
  },
});

export const schemaShape = new joint.shapes.standard.Rectangle({
  position: { x: 50, y: 350 },
  size: { width: 100, height: 40 },
  attrs: {
    body: { fill: "#ff9800" },
    label: { text: "Schema", fill: "white" },
  },
  ports: {
    groups: {
      a: { position: "top" },
    },
  },
});
