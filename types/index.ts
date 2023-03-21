export interface Element {
  id: string;
  type: string;
  name: string;
}

export interface Link {
  id: string;
  sourceId: string | undefined;
  targetId: string | undefined;
  sourceName: string;
  targetName: string;
  sourceType: string;
  targetType: string;
  relationship: string;
}

export interface ParsedDiagram {
  elements: Element[];
  links: Link[];
}

export interface RoleGrantResourcesMap {
  [key: string]: string[];
}

export interface SchemaGrantAccumulator {
  [key: string]: string[];
}
