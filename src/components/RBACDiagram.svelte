<!-- RBACDiagram.svelte -->
<script lang="ts">
  import Prism from "prismjs";
  import * as joint from "jointjs";
  import { onMount } from "svelte";
  import {
    CustomCloneButton,
    CustomDeleteButton,
    CustomLinkButton,
  } from "../../utils/buttons";
  import { loadFromFile } from "../../utils/serialisation";
  import { roleShape, databaseShape, schemaShape } from "../../utils/shapes";
  import { generateTerraformHCL } from "../../utils/generateHCL";
  import { parseDiagram } from "../../utils/parseDiagram";
  import { generateSQLCommands } from "../../utils/generateSQL";
  import { validateDiagram } from "../../utils/validateDiagram";
  import "../../utils/buttons.js";
  import "prismjs/components/prism-sql.js";
  import "prismjs/components/prism-hcl.js";

  let container: HTMLElement;
  let htmlOut = "...";
  let graph: joint.dia.Graph;
  let fileInput: HTMLInputElement;
  const Link = joint.shapes.standard.Link.define("namespace.Link", {});

  function createLink(this: joint.dia.ElementView) {
    const link = new Link();
    link.source(this.model);
    link.target({
      x: this.model.position().x + 100,
      y: this.model.position().y + 100,
    });
    link.addTo(this.model.graph);
  }

  function editLabel(element: joint.dia.ElementView) {
    const newText = prompt(
      "Enter new label text:",
      element.model.attr("label/text")
    );
    if (newText) {
      element.model.attr("label/text", newText);
      const newLength = newText.length * 12 < 100 ? 100 : newText.length * 12;
      element.model.resize(newLength, 40);
      showTooling(element);
    }
  }

  function createElement(this: joint.dia.ElementView) {
    const element = this.model.clone();
    const { x, y } = this.model.attributes.position ?? { x: 0, y: 0 };
    element.attributes.position = { x: x + 150, y };
    this.model.graph.addCell(element);
  }

  function deleteElement(this: joint.dia.ElementView) {
    this.model.remove();
  }

  function showTooling(elementView: joint.dia.ElementView) {
    const xOffset = elementView.model.attributes.size?.width;
    const yOffset = elementView.model.attributes.size?.height;
    const tools = new joint.dia.ToolsView({
      tools: [
        new CustomCloneButton({
          offset: { x: 0, y: 0 },
          action: createElement.bind(elementView),
        }),
        new CustomLinkButton({
          offset: { x: 0, y: yOffset },
          action: createLink.bind(elementView),
        }),
        new CustomDeleteButton({
          offset: { x: xOffset, y: 0 },
          action: deleteElement.bind(elementView),
        }),
      ],
    });
    elementView.addTools(tools);
  }

  function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      loadFromFile(graph, input.files[0]);
    }
  }

  function saveGraph() {
    const graphJSON = graph.toJSON();
    const graphData = JSON.stringify(graphJSON);
    localStorage.setItem("savedRBACDiagram", graphData);
  }

  function downloadGraph() {
    const graphJSON = graph.toJSON();
    const graphData = JSON.stringify(graphJSON, null, 2);
    const blob = new Blob([graphData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "rbac-diagram.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function uploadGraph() {
    fileInput.click();
  }

  function resetGraph() {
    graph.clear();
    localStorage.removeItem("savedRBACDiagram");
    const roleShapeElem = new roleShape();
    const databaseShapeElem = new databaseShape();
    const schemaShapeElem = new schemaShape();
    databaseShapeElem.addTo(graph);
    schemaShapeElem.addTo(graph);
    roleShapeElem.addTo(graph);
  }

  onMount(() => {
    window.joint = joint;
    graph = new joint.dia.Graph(
      {},
      {
        cellNamespace: {
          namespace: {
            Database: databaseShape,
            Role: roleShape,
            Schema: schemaShape,
            Link: Link,
          },
        },
      }
    );
    const paper = new joint.dia.Paper({
      el: container,
      width: "100%",
      height: "100vh",
      model: graph,
      gridSize: 10,
      drawGrid: true,
      background: {
        color: "#f0f0f0",
      },
      interactive: {
        linkMove: true,
      },
    });

    const graphData = localStorage.getItem("savedRBACDiagram");

    if (graphData) {
      const graphJSON = JSON.parse(graphData);
      graph.fromJSON(graphJSON);
    } else {
      resetGraph();
    }

    paper.on("element:pointerdown", showTooling);

    paper.on("element:pointerup", function (elementView, evt) {
      const link = graph
        .getLinks()
        .find((link) => link.getTargetElement() === null);
      if (link) {
        link.target(elementView.model);
      }
    });

    paper.on("blank:pointerdown", () => {
      paper.removeTools();
    });

    let currentLink: joint.dia.LinkView | null = null;

    paper.on("cell:pointerdown", (cellView, evt) => {
      if (cellView.model.isLink()) {
        if (cellView instanceof joint.dia.LinkView) {
          cellView.addTools(
            new joint.dia.ToolsView({
              tools: [
                new joint.linkTools.Vertices(),
                new joint.linkTools.SourceArrowhead(),
                new joint.linkTools.TargetArrowhead(),
                new joint.linkTools.Segments(),
                new joint.linkTools.Remove({ distance: 20 }),
              ],
            })
          );
          currentLink = cellView;
        }
      } else if (currentLink) {
        currentLink.removeTools();
        currentLink = null;
      }
    });

    paper.on("blank:pointerdown", () => {
      if (currentLink) {
        currentLink.removeTools();
        currentLink = null;
      }
    });

    paper.on(
      "element:pointerdblclick",
      (elementView: joint.dia.ElementView) => {
        editLabel(elementView);
      }
    );

    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", saveGraph);
    }
  });

  function generateAndShowHCL() {
    saveGraph();
    const diagramData = parseDiagram(graph);
    const errors = validateDiagram(diagramData);
    if (errors) {
      alert(`Can't generate HCL:\n ${errors}`);
    } else {
      const hcl = generateTerraformHCL(diagramData);
      htmlOut = Prism.highlight(hcl, Prism.languages.hcl, "hcl");
    }
  }

  function generateAndShowSQL() {
    saveGraph();
    const diagramData = parseDiagram(graph);
    const errors = validateDiagram(diagramData);
    if (errors) {
      alert(`Can't generate SQL:\n ${errors}`);
    } else {
      const sql = generateSQLCommands(diagramData);
      htmlOut = Prism.highlight(sql, Prism.languages.sql, "sql");
    }
  }
</script>

<svelte:head>
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/themes/prism.min.css"
    rel="stylesheet"
  />
</svelte:head>

<div class="rbac-diagram">
  <div class="how-to">
    <h3>How to use</h3>
    <p>
      1. Click on any of the elements provided (role, database, and schema) and
      click the green plus to add a new element to the canvas.
      <br />
      2. Connect the elements by clicking on the "Link" button (arrow on bottom left)
      and dragging from one element to another.
      <br />
      3. Edit the label of an element by double-clicking on it.
      <br />
      4. Delete an element or link by clicking on the "Delete" button and then clicking
      on the element or link you want to delete.
    </p>
  </div>
  <div class="diagram-container" bind:this={container} />
  <div class="buttons">
    <button on:click={resetGraph}>Reset Graph</button>
    <button on:click={uploadGraph}>Upload Diagram</button>
    <button on:click={downloadGraph}>Download Diagram</button>
    <input
      type="file"
      bind:this={fileInput}
      style="display: none;"
      on:change={handleFileChange}
    />
  </div>
  <div class="output">
    <button style="background-color: #7b01a0;" on:click={generateAndShowHCL}
      >Generate Terraform HCL</button
    >
    <button style="background-color: #055f0d;" on:click={generateAndShowSQL}
      >Generate SQL</button
    >
    <h2>Output</h2>
    <div>{@html htmlOut}</div>
  </div>
</div>

<style>
  .rbac-diagram button {
    background-color: #052f5f;
    color: white;
    padding: 0.5em 1em;
    border: none;
    border-radius: 4px;
    margin: 0.5em;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .rbac-diagram button:hover {
    background-color: #ff5714;
    color: white;
  }

  .output {
    margin: 1em auto;
    max-width: 1000px;
    background-color: white;
    border: 1px solid #ddd;
    padding: 1em;
    white-space: pre-wrap;
  }

  .how-to {
    margin: 1em auto;
    background-color: #052f5f;
    color: white;
    padding: 1em;
    border-radius: 1em;
  }

  .how-to h3 {
    margin-top: 0;
  }

  .how-to p {
    margin-bottom: 0;
  }
</style>
