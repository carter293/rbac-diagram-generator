import { generateSQLCommands } from "../src/lib/utils/generateSQL";
import type { ParsedDiagram } from "../src/lib/types";

describe("generateSQLCommands", () => {
  test("should create a SQL command for each role in the diagram", () => {
    const parsedDiagram: ParsedDiagram = {
      elements: [
        { id: "role1", type: "role", name: "role1" },
        { id: "role2", type: "role", name: "role2" },
      ],
      links: [],
    };

    const expectedOutput = `
CREATE ROLE IF NOT EXISTS "role1";
CREATE ROLE IF NOT EXISTS "role2";`.trim();

    expect(generateSQLCommands(parsedDiagram)).toEqual(expectedOutput);
  });

  test("should create a SQL command for each database in the diagram", () => {
    const parsedDiagram: ParsedDiagram = {
      elements: [
        { id: "db1", type: "database", name: "db1" },
        { id: "db2", type: "database", name: "db2" },
      ],
      links: [],
    };

    const expectedOutput = `
CREATE DATABASE IF NOT EXISTS "db1";
CREATE DATABASE IF NOT EXISTS "db2";`.trim();

    expect(generateSQLCommands(parsedDiagram)).toEqual(expectedOutput);
  });

  test("should create a SQL command for each schema in the diagram", () => {
    const parsedDiagram: ParsedDiagram = {
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
CREATE DATABASE IF NOT EXISTS "db1";
CREATE DATABASE IF NOT EXISTS "db2";
CREATE SCHEMA IF NOT EXISTS "db1"."schema1";
CREATE SCHEMA IF NOT EXISTS "db1"."schema2";`.trim();

    expect(generateSQLCommands(parsedDiagram)).toEqual(expectedOutput);
  });

  test("should create a SQL command for each grant_usage link in the diagram", () => {
    const parsedDiagram: ParsedDiagram = {
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
CREATE ROLE IF NOT EXISTS "role1";
// Can't make schema resource for schema1 because it's not associated with a database
// Can't grant usage to role1 on schema1 because it's not associated with a database`.trim();

    expect(generateSQLCommands(parsedDiagram)).toEqual(expectedOutput);
  });

  test("should create a SQL command for each grant_to link in the diagram", () => {
    const parsedDiagram: ParsedDiagram = {
      elements: [
        { id: "role1", type: "role", name: "role1" },
        { id: "role2", type: "role", name: "role2" },
      ],
      links: [
        {
          id: "link1",
          sourceId: "role2",
          targetId: "role1",
          sourceName: "role2",
          targetName: "role1",
          sourceType: "role",
          targetType: "role",
          relationship: "grant_to",
        },
      ],
    };

    const expectedOutput = `
CREATE ROLE IF NOT EXISTS "role1";
CREATE ROLE IF NOT EXISTS "role2";
GRANT "role2" TO "role1";`.trim();

    expect(generateSQLCommands(parsedDiagram)).toEqual(expectedOutput);
  });
});
