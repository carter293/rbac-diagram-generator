import { generateTerraformHCL } from "../src/lib/utils/generateHCL";

describe("generateTerraformHCL", () => {
  test("should create a resource for each role in the diagram", () => {
    const parsedDiagram = {
      elements: [
        { id: "role1", type: "role", name: "role1" },
        { id: "role2", type: "role", name: "role2" },
      ],
      links: [],
    };

    const expectedOutput = `
resource "snowflake_role" "role1" {
  name = "role1"
}

resource "snowflake_role" "role2" {
  name = "role2"
}`;
    expect(generateTerraformHCL(parsedDiagram)).toEqual(expectedOutput.trim());
  });

  test("should create a resource for each database in the diagram", () => {
    const parsedDiagram = {
      elements: [
        { id: "db1", type: "database", name: "db1" },
        { id: "db2", type: "database", name: "db2" },
      ],
      links: [],
    };

    const expectedOutput = `
resource "snowflake_database" "db1" {
  name = "db1"
}

resource "snowflake_database" "db2" {
  name = "db2"
}
`;

    expect(generateTerraformHCL(parsedDiagram)).toEqual(expectedOutput.trim());
  });

  test("should create a resource for each schema in the diagram", () => {
    const parsedDiagram = {
      elements: [
        { id: "db1", type: "database", name: "db1" },
        { id: "db2", type: "database", name: "db2" },
        { id: "schema1", type: "schema", name: "schema1" },
        { id: "schema2", type: "schema", name: "schema2" },
      ],
      links: [
        {
          id: "link1",
          sourceId: "schema1",
          targetId: "db1",
          sourceName: "schema1",
          targetName: "db1",
          sourceType: "schema",
          targetType: "database",
          relationship: "associated",
        },
        {
          id: "link2",
          sourceId: "schema2",
          targetId: "db1",
          sourceName: "schema2",
          targetName: "db1",
          sourceType: "schema",
          targetType: "database",
          relationship: "associated",
        },
      ],
    };

    const expectedOutput = `
resource "snowflake_database" "db1" {
  name = "db1"
}

resource "snowflake_database" "db2" {
  name = "db2"
}

resource "snowflake_schema" "schema1" {
  database = snowflake_database.db1.name
  name     = "schema1"
}

resource "snowflake_schema" "schema2" {
  database = snowflake_database.db1.name
  name     = "schema2"
}
`;
    expect(generateTerraformHCL(parsedDiagram)).toEqual(expectedOutput.trim());
  });

  test("should create a grant_usage resource for each role to schema link in the diagram", () => {
    const parsedDiagram = {
      elements: [
        { id: "role1", type: "role", name: "role1" },
        { id: "schema1", type: "schema", name: "schema1" },
      ],
      links: [
        {
          id: "link1",
          sourceId: "role1",
          targetId: "schema1",
          sourceName: "role1",
          targetName: "schema1",
          sourceType: "role",
          targetType: "schema",
          relationship: "grant_usage",
        },
      ],
    };

    const expectedOutput = `
resource "snowflake_role" "role1" {
  name = "role1"
}

# Can't make schema resource for schema1 because it's not associated with a database

# Can't make schema grant resource for schema1 because it's not associated with a database`;

    expect(generateTerraformHCL(parsedDiagram)).toEqual(expectedOutput.trim());
  });
});
