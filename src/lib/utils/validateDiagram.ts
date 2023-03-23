import type { ParsedElement, ParsedLink } from "./parseDiagram";

export function validateDiagram(diagramData: {
  elements: ParsedElement[];
  links: ParsedLink[];
}): string | boolean {
  const elements = diagramData.elements;
  const links = diagramData.links;

  const databaseToSchemasMap: Map<string, Set<string>> = new Map();
  const roleNames: Set<string> = new Set();
  const databaseNames: Set<string> = new Set();
  const schemaToDatabaseMap: Map<string, string> = new Map();

  let errors = ``;
  for (const element of elements) {
    if (element.type === "role") {
      if (roleNames.has(element.name)) {
        errors += `Duplicate role name found: ${element.name}\n`;
      }
      roleNames.add(element.name);
    } else if (element.type === "database") {
      if (databaseNames.has(element.name)) {
        errors += `Duplicate database name found: ${element.name}\n`;
      }
      databaseNames.add(element.name);
      databaseToSchemasMap.set(element.id, new Set<string>());
    }
  }

  for (const element of elements) {
    if (element.type == "schema") {
      const databaseSourceLink = links.find(
        (link) => link.sourceId === element.id && link.targetType === "database"
      );
      if (databaseSourceLink) {
        const schemas = databaseSourceLink.targetId
          ? databaseToSchemasMap.get(databaseSourceLink.targetId)
          : undefined;
        if (schemas) {
          if (schemas.has(element.name)) {
            errors += `Duplicate schema name found for database '${databaseSourceLink.targetName}': ${element.name}\n`;
          }
          schemas.add(element.name);
        }
      } else {
      }
    }
  }

  return errors;
}
