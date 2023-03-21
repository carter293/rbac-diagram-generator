<!-- RBACDiagram.svelte -->
<script lang='ts'>
    import Prism from 'prismjs';
    import * as joint from "jointjs";
    import { onMount } from "svelte";
    import { CustomCloneButton, CustomLinkButton, CustomDeleteButton } from '../../utils/buttons';
    import { roleShape, databaseShape, schemaShape } from "../../utils/shapes";
    import { generateTerraformHCL } from "../../utils/generateHCL";
    import { parseDiagram } from "../../utils/parseDiagram";
    import { generateSQLCommands } from "../../utils/generateSQL"
    import '../../utils/buttons.js';
    import "prismjs/components/prism-sql.js"
    import "prismjs/components/prism-hcl.js"
    

    let container: HTMLElement;
    let htmlOut = "...";
    let graph: joint.dia.Graph;
    
    function createLink(this: joint.dia.ElementView) {
      const link = new joint.shapes.standard.Link();
      link.source(this.model);
      link.target({ x: this.model.position().x + 100, y: this.model.position().y + 100 });
      link.addTo(this.model.graph);
    }
    
    function editLabel(element: joint.dia.Element) {
      const newText = prompt("Enter new label text:", element.attr("label/text"));
    
      if (newText) {
        element.attr("label/text", newText);
      }
    }
    
    function createElement(this: joint.dia.ElementView) {
      const element = this.model.clone();
      const { x, y } = this.model.attributes.position ?? { x:0, y:0 };
      element.attributes.position = { x: x + 150, y };
      this.model.graph.addCell(element);
    }
    
    function deleteElement(this: joint.dia.ElementView) {
      this.model.remove();
    }
    
    onMount(() => {
      graph = new joint.dia.Graph();
      const paper = new joint.dia.Paper({
        el: container,
        width: "100%",
        height: "70vh",
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
    
      graph.addCells([roleShape.prop('type', "role"), databaseShape.prop('type', "database"), schemaShape.prop('type', "schema")]);
    
      paper.on("element:pointerdown", function (elementView) {
        const tools = new joint.dia.ToolsView({
          tools: [
            new CustomCloneButton({
              action: createElement.bind(elementView),
            }),
            new CustomLinkButton({
              action: createLink.bind(elementView),
            }),
            new CustomDeleteButton({
              action: deleteElement.bind(elementView),
            }),
          ],
        });
        elementView.addTools(tools);
      });
    
      paper.on("element:pointerup", function (elementView, evt) {
        const link = graph.getLinks().find((link) => link.getTargetElement() === null);
        if (link) {
          link.target(elementView.model);
        }
      });
    
      paper.on("blank:pointerdown", () => {
        paper.removeTools();
      });
    
      let currentLink: joint.dia.LinkView | null = null;
    
      paper.on('cell:pointerdown', (cellView, evt) => {
        if (cellView.model.isLink()) {
          if (cellView instanceof joint.dia.LinkView) {
            cellView.addTools(new joint.dia.ToolsView({
              tools: [
                new joint.linkTools.Vertices(),
                new joint.linkTools.SourceArrowhead(),
                new joint.linkTools.TargetArrowhead(),
                new joint.linkTools.Segments(),
                new joint.linkTools.Remove({ distance: 20 }),
              ],
            }));
            currentLink = cellView;
          }
        } else if (currentLink) {
          currentLink.removeTools();
          currentLink = null;
        }
      });
    
        paper.on('blank:pointerdown', (evt, x, y) => {
          if (currentLink) {
            currentLink.removeTools();
            currentLink = null;
          }
        });
    
        paper.on('element:pointerdblclick', (elementView: joint.dia.ElementView) => {
          editLabel(elementView.model);
        });
    });
    
    function generateAndShowHCL() {
      const diagramData = parseDiagram(graph);
      const hcl = generateTerraformHCL(diagramData);
      htmlOut = Prism.highlight(hcl, Prism.languages.hcl, 'hcl');      
    }
    
    function generateAndShowSQL() {
      const diagramData = parseDiagram(graph);
      const sql = generateSQLCommands(diagramData);
      htmlOut = Prism.highlight(sql, Prism.languages.sql, 'sql');
    }
    
</script>

<svelte:head>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/themes/prism.min.css" rel="stylesheet" />
</svelte:head>

<style>
  .diagramContainer {
    width: 100%;
    border: 1px
  }
  .outputContainer {
    height: 100%;
    white-space: pre-wrap;
    text-align: left;
    padding: 2vw;

    background-color: rgb(255, 255, 255);
  }
</style>

<button on:click={generateAndShowHCL}>Generate Terraform HCL</button>
<button on:click={generateAndShowSQL}>Generate SQL</button>
<div class="diagramContainer" bind:this="{container}"></div>
<div class="outputContainer">
<h2> Output </h2>
  <div>
    {@html htmlOut}
  </div>
</div>