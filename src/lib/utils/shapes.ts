import joint from "jointjs";

export const roleShape = joint.shapes.standard.Rectangle.define(
  "namespace.Role",
  {
    position: { x: 50, y: 50 },
    size: { width: 100, height: 40 },
    attrs: {
      body: { fill: "#4caf50" },
      label: { text: "Role", fill: "white" },
    },
    props: {
      type: "role",
    },
  }
);

export const databaseShape = joint.shapes.standard.Rectangle.define(
  "namespace.Database",
  {
    position: { x: 50, y: 200 },
    size: { width: 100, height: 40 },
    attrs: {
      body: { fill: "#2196f3" },
      label: { text: "Database", fill: "white" },
    },
    props: {
      type: "database",
    },
  }
);

export const schemaShape = joint.shapes.standard.Rectangle.define(
  "namespace.Schema",
  {
    position: { x: 50, y: 350 },
    size: { width: 100, height: 40 },
    attrs: {
      body: { fill: "#ff9800" },
      label: { text: "Schema", fill: "white" },
    },
    props: {
      type: "schema",
    },
  }
);
