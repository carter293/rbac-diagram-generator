import * as joint from "jointjs";

export class CustomEditButton extends joint.elementTools.Button {
  constructor(options: joint.elementTools.Button.Options) {
    super({
      offset: { x: 50, y: 0 },
      markup: [
        {
          tagName: "circle",
          selector: "button",
          attributes: {
            r: 10,
            fill: "#4CAF50",
          },
        },
        {
          tagName: "path",
          selector: "icon",
          attributes: {
            d: "M-3 -3 L3 0 L-3 3 M3 0 L0 3 M3 0 L0 -3",
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

export class CustomCloneButton extends joint.elementTools.Button {
  constructor(options: joint.elementTools.Button.Options) {
    super({
      markup: [
        {
          tagName: "circle",
          selector: "button",
          attributes: {
            r: 7,
            fill: "#FF9800",
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

export class CustomLinkButton extends joint.elementTools.Button {
  constructor(options: joint.elementTools.Button.Options) {
    super({
      offset: { x: 0, y: 40 },
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

export class CustomDeleteButton extends joint.elementTools.Button {
  constructor(options: joint.elementTools.Button.Options) {
    super({
      offset: { x: 100, y: 0 },
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
