import { parseDiagram } from "../src/lib/utils/parseDiagram";
import { dia } from "jointjs";

describe("parseDiagram", () => {
  const graph = new dia.Graph();
  const element1 = new dia.Element({
    id: "element1",
    type: "role",
    attrs: {
      label: {
        text: "Role 1",
      },
    },
    props: {
      type: "role",
    },
  });
  const element2 = new dia.Element({
    id: "element2",
    type: "schema",
    attrs: {
      label: {
        text: "Schema 1",
      },
    },
    props: {
      type: "schema",
    },
  });
  const element3 = new dia.Element({
    id: "element3",
    type: "database",
    attrs: {
      label: {
        text: "Database 1",
      },
    },
    props: {
      type: "database",
    },
  });
  const link1 = new dia.Link({
    id: "link1",
    source: { id: element1.id },
    target: { id: element2.id },
  });
  const link2 = new dia.Link({
    id: "link2",
    source: { id: element2.id },
    target: { id: element3.id },
  });
  graph.addCells([element1, element2, element3, link1, link2]);

  test("parses elements correctly", () => {
    const { elements } = parseDiagram(graph);
    expect(elements).toEqual([
      {
        id: "element1",
        type: "role",
        name: "Role 1",
      },
      {
        id: "element2",
        type: "schema",
        name: "Schema 1",
      },
      {
        id: "element3",
        type: "database",
        name: "Database 1",
      },
    ]);
  });

  test("parses links correctly", () => {
    const { links } = parseDiagram(graph);
    expect(links).toEqual([
      {
        id: "link1",
        sourceId: "element1",
        targetId: "element2",
        sourceName: "Role 1",
        targetName: "Schema 1",
        sourceType: "role",
        targetType: "schema",
        relationship: "grant_usage",
      },
      {
        id: "link2",
        sourceId: "element2",
        targetId: "element3",
        sourceName: "Schema 1",
        targetName: "Database 1",
        sourceType: "schema",
        targetType: "database",
        relationship: "associated",
      },
    ]);
  });

  test("parses links with roles correctly", () => {
    const element4 = new dia.Element({
      id: "element4",
      type: "role",
      attrs: {
        label: {
          text: "Role 2",
        },
      },
      props: {
        type: "role",
      },
    });
    const link3 = new dia.Link({
      id: "link3",
      source: { id: element1.id },
      target: { id: element4.id },
    });
    graph.addCells([element4, link3]);

    const { links } = parseDiagram(graph);
    expect(links).toContainEqual({
      id: "link3",
      sourceId: "element1",
      targetId: "element4",
      sourceName: "Role 1",
      targetName: "Role 2",
      sourceType: "role",
      targetType: "role",
      relationship: "grant_to",
    });
  });

  // Add more tests for other possible scenarios
});
