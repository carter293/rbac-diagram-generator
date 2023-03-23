import * as joint from "jointjs";
import type { dia } from "jointjs";

export async function loadFromFile(graph: dia.Graph, file: File | null) {
  if (!file) {
    console.error("No file provided");
    return;
  }

  try {
    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      if (event.target && event.target.result) {
        const graphData = event.target.result as string;
        let graphJSON = JSON.parse(graphData);
        graph.fromJSON(graphJSON);
      }
    };

    fileReader.onerror = (error) => {
      console.error("FileReader error:", error);
    };

    fileReader.readAsText(file);
  } catch (error) {
    console.error("Error while loading diagram from file:", error);
  }
}
