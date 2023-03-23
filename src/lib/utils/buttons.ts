import { g, dia, shapes, connectors, elementTools } from "jointjs";
export class CustomCloneButton extends elementTools.Button {
  constructor(options: elementTools.Button.Options) {
    super({
      markup: [
        {
          tagName: "circle",
          selector: "button",
          attributes: {
            r: 7,
            fill: "#10eb17",
          },
        },
        {
          tagName: "path",
          selector: "icon",
          attributes: {
            d: "M0 -3 L0 3 M-3 0 L3 0",
            fill: "none",
            stroke: "#FFF",
            "stroke-width": 2,
          },
        },
      ],
      action: options.action,
    });
  }
}

export class CustomLinkButton extends elementTools.Button {
  constructor(options: elementTools.Button.Options) {
    super({
      offset: options.offset ?? { x: 0, y: 40 },
      markup: [
        {
          tagName: "circle",
          selector: "button",
          attributes: {
            r: 7,
            fill: "#2196F3",
          },
        },
        {
          tagName: "path",
          selector: "icon",
          attributes: {
            d: "M-4 4 L4 -4 M0 -4 L4 -4 L4 0 M-4 4",
            fill: "none",
            stroke: "#FFF",
            "stroke-width": 2,
          },
        },
      ],
      action: options.action,
    });
  }
}

export class CustomDeleteButton extends elementTools.Button {
  constructor(options: elementTools.Button.Options) {
    super({
      offset: options.offset ?? { x: 100, y: 0 },
      markup: [
        {
          tagName: "circle",
          selector: "button",
          attributes: {
            r: 7,
            fill: "#F44336",
          },
        },
        {
          tagName: "path",
          selector: "icon",
          attributes: {
            d: "M-2 -2 L2 2 M-2 2 L2 -2",
            fill: "none",
            stroke: "#FFF",
            "stroke-width": 2,
          },
        },
      ],
      action: options.action,
    });
  }
}
