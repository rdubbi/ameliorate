import { filterHiddenComponents, findEdge } from "../utils/diagram";
import { isEdgeImplied, nodes } from "../utils/edge";
import { useTopicStore } from "./store";
import { getClaimTrees, getDiagramOrThrow } from "./utils";

export const useIsImplied = (edgeId: string, diagramId: string) => {
  return useTopicStore((state) => {
    try {
      const diagram = getDiagramOrThrow(state, diagramId);
      const edge = findEdge(edgeId, diagram);
      const displayDiagram = filterHiddenComponents(diagram, getClaimTrees(state), true);
      return isEdgeImplied(edge, displayDiagram, getClaimTrees(state));
    } catch {
      return false;
    }
  });
};

export const useIsNodeSelected = (edgeId: string, diagramId: string) => {
  return useTopicStore((state) => {
    try {
      const diagram = getDiagramOrThrow(state, diagramId);
      const edge = findEdge(edgeId, diagram);
      return nodes(edge, diagram).some((node) => node.selected);
    } catch {
      return false;
    }
  });
};
