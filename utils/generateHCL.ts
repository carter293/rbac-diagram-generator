import type {
  ParsedDiagram,
  Element,
  Link,
  RoleGrantResourcesMap,
  SchemaGrantAccumulator,
} from "../types";

export function generateTerraformHCL(parsedDiagram: ParsedDiagram): string {
  const { elements, links } = parsedDiagram;
  const roleResources = elements
    .filter((element) => element.type === "role")
    .map((element) =>
      `
resource "snowflake_role" "${element.name}" {
  name = "${element.name}"
}`.trim()
    )
    .join("\n\n");

  const databaseResources = elements
    .filter((element) => element.type === "database")
    .map((element) =>
      `resource "snowflake_database" "${element.name}" {
  name = "${element.name}"
}`.trim()
    )

    .join("\n\n");

  const schemaResources = elements
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
        ? `
resource "snowflake_schema" "${element.name}" {
  database = snowflake_database.${databaseName}.name
  name     = "${element.name}"
}`.trim()
        : `# Can't make schema resource for ${element.name} because it's not associated with a database`;
    })
    .join("\n\n");

  const schemaGrants = links
    .filter((link) => link.relationship === "grant_usage")
    .reduce((accumulator: SchemaGrantAccumulator, currentLink) => {
      const targetId = currentLink.targetId as string;
      const sourceId = currentLink.sourceId;

      if (!accumulator[targetId]) {
        accumulator[targetId] = [];
      }

      accumulator[targetId].push(sourceId as string);

      return accumulator;
    }, {});

  const schemaGrantResources = Object.entries(schemaGrants)
    .map(([schemaId, roleIds]) => {
      const schema: Element | undefined = elements.find(
        (element) => element.id === schemaId
      );
      const schemaName: string = schema?.name ?? "";
      const associatedDatabaseLink: Link | undefined = links.find(
        (link) =>
          link.sourceId === schemaId && link.relationship === "associated"
      );
      const databaseName: string | undefined = associatedDatabaseLink
        ? elements.find(
            (element) => element.id === associatedDatabaseLink.targetId
          )?.name ?? undefined
        : undefined;
      const roleNames: string = roleIds
        .map((roleId) => {
          const role = elements.find((element) => element.id === roleId);
          return role ? `snowflake_role.${role.name}.name` : "";
        })
        .filter((roleName) => roleName)
        .join(", ");

      return databaseName
        ? `
resource "snowflake_schema_grant" "${schemaName}_grant" {
  database_name = snowflake_database.${databaseName}.name
  schema_name   = snowflake_schema.${schemaName}.name
  privilege = "USAGE"
  roles     = [${roleNames}]
  enable_multiple_grants = true
}

resource "snowflake_database_grant" "${databaseName}_grant" {
  database_name = snowflake_database.${databaseName}.name
  privilege = "USAGE"
  roles     = [${roleNames}]
  enable_multiple_grants = true
}`.trim()
        : `# Can't make schema grant resource for ${schemaName} because it's not associated with a database`;
    })
    .join("\n\n");

  const roleGrantResourcesMap: RoleGrantResourcesMap = links
    .filter((link) => link.relationship === "grant_to")
    .reduce((acc: SchemaGrantAccumulator, link) => {
      if (!acc[link.targetName]) {
        acc[link.targetName] = [];
      }
      acc[link.targetName].push(link.sourceName);
      return acc;
    }, {});

  const roleGrantResources = Object.entries(roleGrantResourcesMap)
    .map(([targetRole, grantedRoles]) => {
      const targetRoleName = elements.find(
        (element) => element.name === targetRole
      )?.name;

      const grantedRoleNames = grantedRoles
        .map((role) => {
          const roleElement = elements.find((element) => element.name === role);
          return roleElement ? `snowflake_role.${roleElement.name}.name` : "";
        })
        .filter(Boolean);

      return `
resource "snowflake_role_grants" "${targetRoleName}_grants" {
  role_name = snowflake_role.${targetRoleName}.name
  roles = [
    ${grantedRoleNames.join(", ")}
  ]
}`.trim();
    })
    .join("\n\n");

  const roleResourcesOut = roleResources ? roleResources + "\n\n" : "";
  const databaseResourcesOut = databaseResources
    ? databaseResources + "\n\n"
    : "";
  const schemaResourcesOut = schemaResources ? schemaResources + "\n\n" : "";
  const schemaGrantResourcesOut = schemaGrantResources
    ? schemaGrantResources + "\n\n"
    : "";
  const roleGrantResourcesOut = roleGrantResources
    ? roleGrantResources + "\n\n"
    : "";
  return (
    roleResourcesOut +
    databaseResourcesOut +
    schemaResourcesOut +
    schemaGrantResourcesOut +
    roleGrantResourcesOut
  ).trim();
}
