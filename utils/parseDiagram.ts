import type { dia } from "jointjs";

export interface ParsedElement {
  id: string;
  type: string;
  name: string;
}

export interface ParsedLink {
  id: string;
  sourceId: string | undefined;
  targetId: string | undefined;
  sourceName: string;
  targetName: string;
  sourceType: string;
  targetType: string;
  relationship: string;
}

export function parseDiagram(graph: dia.Graph): {
  elements: ParsedElement[];
  links: ParsedLink[];
} {
  const elements = graph.getElements();
  const links = graph.getLinks();

  const parsedElements: ParsedElement[] = elements.map((element) => {
    const id = <string>element.id;
    const name: string = element.attr("label/text");
    const type: string = element.attributes.props?.type;
    return {
      id,
      type,
      name,
    };
  });

  const parsedLinks: ParsedLink[] = links.map((link) => {
    const sourceElement = link.getSourceElement();
    const targetElement = link.getTargetElement();

    const sourceId = <string>sourceElement?.id;
    const targetId = <string>targetElement?.id;

    const sourceType = sourceElement?.attributes.props?.type;
    const targetType = targetElement?.attributes.props?.type;

    const sourceName = sourceElement?.attr("label/text");
    const targetName = targetElement?.attr("label/text");

    let relationship = "";

    if (sourceType === "role" && targetType === "role") {
      relationship = "grant_to";
    } else if (sourceType === "schema" && targetType === "database") {
      relationship = "associated";
    } else if (sourceType === "role" && targetType === "schema") {
      relationship = "grant_usage";
    }

    return {
      id: <string>link.id,
      sourceId,
      targetId,
      sourceName,
      targetName,
      sourceType,
      targetType,
      relationship,
    };
  });

  return {
    elements: parsedElements,
    links: parsedLinks,
  };
}
