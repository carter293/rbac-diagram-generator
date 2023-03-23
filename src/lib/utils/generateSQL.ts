import type { ParsedDiagram } from "../types";

export function generateSQLCommands(parsedDiagram: ParsedDiagram): string {
  const { elements, links } = parsedDiagram;

  const createRoleCommands = elements
    .filter((element) => element.type === "role")
    .map((element) => `CREATE ROLE IF NOT EXISTS "${element.name}";`);

  const createDatabaseCommands = elements
    .filter((element) => element.type === "database")
    .map((element) => `CREATE DATABASE IF NOT EXISTS "${element.name}";`);

  const createSchemaCommands = elements
    .filter((element) => element.type === "schema")
    .map((element) => {
      const associatedDatabase = links.find(
        (link) =>
          link.sourceId === element.id && link.relationship === "associated"
      );
      const databaseName = associatedDatabase?.targetId
        ? elements.find((e) => e.id === associatedDatabase?.targetId)?.name ??
          ""
        : "";

      return databaseName
        ? `CREATE SCHEMA IF NOT EXISTS "${databaseName}"."${element.name}";`
        : `// Can't make schema resource for ${element.name} because it's not associated with a database`;
    });

  const grantUsageCommands = links
    .filter((link) => link.relationship === "grant_usage")
    .map((link) => {
      const schema = elements.find((element) => element.id === link.targetId);
      const schemaName = schema?.name ?? "";
      const role = elements.find((element) => element.id === link.sourceId);
      const roleName = role?.name ?? "";

      const associatedDatabaseLink = links.find(
        (link) =>
          link.sourceId === schema?.id && link.relationship === "associated"
      );
      const databaseName = associatedDatabaseLink?.targetId
        ? elements.find((e) => e.id === associatedDatabaseLink?.targetId)?.name
        : "";

      return databaseName
        ? `
GRANT USAGE ON SCHEMA "${databaseName}"."${schemaName}" TO "${roleName}";
GRANT USAGE ON DATABASE "${databaseName}" TO "${roleName}";`.trim()
        : `// Can't grant usage to ${roleName} on ${schemaName} because it's not associated with a database`;
    });

  const grantRoleCommands = links
    .filter((link) => link.relationship === "grant_to")
    .map((link) => {
      const targetRole = elements.find(
        (element) => element.name === link.targetName
      );
      const targetRoleName = targetRole?.name ?? "";
      const grantedRole = elements.find(
        (element) => element.name === link.sourceName
      );
      const grantedRoleName = grantedRole?.name ?? "";

      return `GRANT "${grantedRoleName}" TO "${targetRoleName}";`;
    });

  return [
    ...createRoleCommands,
    ...createDatabaseCommands,
    ...createSchemaCommands,
    ...grantUsageCommands,
    ...grantRoleCommands,
  ].join("\n");
}
