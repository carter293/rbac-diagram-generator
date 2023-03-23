import { c as create_ssr_component, d as add_attribute, e as escape, v as validate_component } from "../../chunks/index.js";
import "prismjs";
import * as joint from "jointjs";
import "prismjs/components/prism-sql.js";
import "prismjs/components/prism-hcl.js";
class CustomCloneButton extends joint.elementTools.Button {
  constructor(options) {
    super({
      markup: [
        {
          tagName: "circle",
          selector: "button",
          attributes: {
            r: 7,
            fill: "#10eb17"
          }
        },
        {
          tagName: "path",
          selector: "icon",
          attributes: {
            d: "M0 -3 L0 3 M-3 0 L3 0",
            fill: "none",
            stroke: "#FFF",
            "stroke-width": 2
          }
        }
      ],
      action: options.action
    });
  }
}
class CustomLinkButton extends joint.elementTools.Button {
  constructor(options) {
    super({
      offset: options.offset ?? { x: 0, y: 40 },
      markup: [
        {
          tagName: "circle",
          selector: "button",
          attributes: {
            r: 7,
            fill: "#2196F3"
          }
        },
        {
          tagName: "path",
          selector: "icon",
          attributes: {
            d: "M-4 4 L4 -4 M0 -4 L4 -4 L4 0 M-4 4",
            fill: "none",
            stroke: "#FFF",
            "stroke-width": 2
          }
        }
      ],
      action: options.action
    });
  }
}
class CustomDeleteButton extends joint.elementTools.Button {
  constructor(options) {
    super({
      offset: options.offset ?? { x: 100, y: 0 },
      markup: [
        {
          tagName: "circle",
          selector: "button",
          attributes: {
            r: 7,
            fill: "#F44336"
          }
        },
        {
          tagName: "path",
          selector: "icon",
          attributes: {
            d: "M-2 -2 L2 2 M-2 2 L2 -2",
            fill: "none",
            stroke: "#FFF",
            "stroke-width": 2
          }
        }
      ],
      action: options.action
    });
  }
}
joint.shapes.standard.Rectangle.define(
  "namespace.Role",
  {
    position: { x: 50, y: 50 },
    size: { width: 100, height: 40 },
    attrs: {
      body: { fill: "#4caf50" },
      label: { text: "Role", fill: "white" }
    },
    props: {
      type: "role"
    }
  }
);
joint.shapes.standard.Rectangle.define(
  "namespace.Database",
  {
    position: { x: 50, y: 200 },
    size: { width: 100, height: 40 },
    attrs: {
      body: { fill: "#2196f3" },
      label: { text: "Database", fill: "white" }
    },
    props: {
      type: "database"
    }
  }
);
joint.shapes.standard.Rectangle.define(
  "namespace.Schema",
  {
    position: { x: 50, y: 350 },
    size: { width: 100, height: 40 },
    attrs: {
      body: { fill: "#ff9800" },
      label: { text: "Schema", fill: "white" }
    },
    props: {
      type: "schema"
    }
  }
);
const RBACDiagram_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".rbac-diagram.svelte-195vo74 button.svelte-195vo74{background-color:#052f5f;color:white;padding:0.5em 1em;border:none;border-radius:4px;margin:0.5em;font-size:1rem;font-weight:bold;cursor:pointer;transition:background-color 0.3s ease}.rbac-diagram.svelte-195vo74 button.svelte-195vo74:hover{background-color:#ff5714;color:white}.output.svelte-195vo74.svelte-195vo74{margin:1em auto;max-width:1000px;background-color:white;border:1px solid #ddd;padding:1em;white-space:pre-wrap}.how-to.svelte-195vo74.svelte-195vo74{margin:1em auto;background-color:#052f5f;color:white;padding:1em;border-radius:1em}.how-to.svelte-195vo74 h3.svelte-195vo74{margin-top:0}.how-to.svelte-195vo74 p.svelte-195vo74{margin-bottom:0}",
  map: null
};
const RBACDiagram = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let container;
  let htmlOut = "...";
  joint.shapes.standard.Link.define("namespace.Link", {});
  $$result.css.add(css$2);
  return `


${$$result.head += `<!-- HEAD_svelte-2depqg_START --><link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/themes/prism.min.css" rel="stylesheet"><!-- HEAD_svelte-2depqg_END -->`, ""}

<div class="rbac-diagram svelte-195vo74"><div class="how-to svelte-195vo74"><h3 class="svelte-195vo74">How to use</h3>
    <p class="svelte-195vo74">1. Click on any of the elements provided (role, database, and schema) and
      click the green plus to add a new element to the canvas.
      <br>
      2. Connect the elements by clicking on the &quot;Link&quot; button (arrow on bottom left)
      and dragging from one element to another.
      <br>
      3. Edit the label of an element by double-clicking on it.
      <br>
      4. Delete an element or link by clicking on the &quot;Delete&quot; button and then clicking
      on the element or link you want to delete.
    </p></div>
  <div class="diagram-container"${add_attribute("this", container, 0)}></div>
  <div class="buttons"><button class="svelte-195vo74">Reset Graph</button>
    <button class="svelte-195vo74">Upload Diagram</button>
    <button class="svelte-195vo74">Download Diagram</button>
    <input type="file" style="display: none;"></div>
  <div class="output svelte-195vo74"><button style="background-color: #7b01a0;" class="svelte-195vo74">Generate Terraform HCL</button>
    <button style="background-color: #055f0d;" class="svelte-195vo74">Generate SQL</button>
    <h2>Output</h2>
    <div><!-- HTML_TAG_START -->${htmlOut}<!-- HTML_TAG_END --></div></div>
</div>`;
});
const ScrollButton_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".scroll-btn.svelte-1fi7jlw{position:fixed;bottom:20px;right:20px;z-index:9999;padding:10px 20px;border:none;background-color:rgba(255, 255, 255, 0.373);border-radius:5px;color:black;font-size:10px;font-weight:bold;text-transform:uppercase;cursor:pointer;transition:background-color 0.3s ease}.scroll-btn.svelte-1fi7jlw:hover{background-color:#7ebdc2;color:white}.scroll-btn.svelte-1fi7jlw:focus{outline:none}",
  map: null
};
const ScrollButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { buttonText = "Scroll to Output" } = $$props;
  if ($$props.buttonText === void 0 && $$bindings.buttonText && buttonText !== void 0)
    $$bindings.buttonText(buttonText);
  $$result.css.add(css$1);
  return `<button class="scroll-btn svelte-1fi7jlw">${escape(buttonText)}</button>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".svelte-xearkn{box-sizing:border-box}.container.svelte-xearkn{display:flex;flex-direction:column;min-height:100vh;background-color:#efe6dd}.header.svelte-xearkn{background-color:#0b6e4f;border-radius:1em;color:white;padding:1em;text-align:center}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `


<main class="svelte-xearkn"><div class="container svelte-xearkn"><div class="header svelte-xearkn"><h1 class="svelte-xearkn">RBAC Diagram</h1></div>
    ${validate_component(RBACDiagram, "RBACDiagram").$$render($$result, {}, {}, {})}</div>
  ${validate_component(ScrollButton, "ScrollButton").$$render($$result, {}, {}, {})}
</main>`;
});
export {
  Page as default
};
