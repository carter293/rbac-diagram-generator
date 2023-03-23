import { validateDiagram } from "../src/lib/utils/validateDiagram";
import type { ParsedElement, ParsedLink } from "../src/lib/utils/parseDiagram";

describe("validateDiagram", () => {
  test("should not return any errors for a valid diagram", () => {
    const elements: ParsedElement[] = [
      { id: "1", type: "role", name: "Role1" },
      { id: "2", type: "database", name: "Database1" },
      { id: "3", type: "schema", name: "Schema1" },
    ];

    const links: ParsedLink[] = [
      {
        id: "link1",
        sourceId: "1",
        targetId: "2",
        sourceName: "Role1",
        targetName: "Database1",
        sourceType: "role",
        targetType: "database",
        relationship: "grant_to",
      },
      {
        id: "link2",
        sourceId: "3",
        targetId: "2",
        sourceName: "Schema1",
        targetName: "Database1",
        sourceType: "schema",
        targetType: "database",
        relationship: "associated",
      },
    ];

    const result = validateDiagram({ elements, links });
    expect(result).toBe("");
  });

  test("should return an error for duplicate role names", () => {
    const elements: ParsedElement[] = [
      { id: "1", type: "role", name: "Role1" },
      { id: "2", type: "role", name: "Role1" },
    ];

    const result = validateDiagram({ elements, links: [] });
    expect(result).toBe("Duplicate role name found: Role1\n");
  });

  test("should return an error for duplicate database names", () => {
    const elements: ParsedElement[] = [
      { id: "1", type: "database", name: "Database1" },
      { id: "2", type: "database", name: "Database1" },
    ];

    const result = validateDiagram({ elements, links: [] });
    expect(result).toBe("Duplicate database name found: Database1\n");
  });

  test("should return an error for duplicate schema names within the same database", () => {
    const elements: ParsedElement[] = [
      { id: "1", type: "database", name: "Database1" },
      { id: "2", type: "schema", name: "Schema1" },
      { id: "3", type: "schema", name: "Schema1" },
    ];

    const links: ParsedLink[] = [
      {
        id: "link1",
        sourceId: "2",
        targetId: "1",
        sourceName: "Schema1",
        targetName: "Database1",
        sourceType: "schema",
        targetType: "database",
        relationship: "associated",
      },
      {
        id: "link2",
        sourceId: "3",
        targetId: "1",
        sourceName: "Schema1",
        targetName: "Database1",
        sourceType: "schema",
        targetType: "database",
        relationship: "associated",
      },
    ];
    const result = validateDiagram({ elements, links });

    expect(result).toBe(
      "Duplicate schema name found for database 'Database1': Schema1\n"
    );
  });

  test("should not return an error for duplicate schema names across different databases", () => {
    const elements: ParsedElement[] = [
      { id: "1", type: "database", name: "Database1" },
      { id: "2", type: "database", name: "Database2" },
      { id: "3", type: "schema", name: "Schema1" },
      { id: "4", type: "schema", name: "Schema1" },
    ];
    const links: ParsedLink[] = [
      {
        id: "link1",
        sourceId: "3",
        targetId: "1",
        sourceName: "Schema1",
        targetName: "Database1",
        sourceType: "schema",
        targetType: "database",
        relationship: "associated",
      },
      {
        id: "link2",
        sourceId: "4",
        targetId: "2",
        sourceName: "Schema1",
        targetName: "Database2",
        sourceType: "schema",
        targetType: "database",
        relationship: "associated",
      },
    ];

    const result = validateDiagram({ elements, links });
    expect(result).toBe("");
  });
});
