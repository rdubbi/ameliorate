import { Article, Check, Extension, ThumbDown, ThumbUp } from "@mui/icons-material";

import { As } from "./Diagram.store";

export interface NodeDecoration {
  themeColor:
    | "primary"
    | "secondary"
    | "problem"
    | "solution"
    | "rootClaim"
    | "support"
    | "critique"; // theme colors; is there a better way to get this?
  NodeIcon: typeof Extension;
  allowed: {
    [key in As]: NodeType[];
  };
}

// TODO(refactor): should only need to edit this file to add new node types
export type NodeType = "Problem" | "Solution" | "RootClaim" | "Support" | "Critique";

export const nodeDecorations: Record<NodeType, NodeDecoration> = {
  Problem: {
    themeColor: "problem",
    NodeIcon: Extension,
    allowed: {
      Parent: ["Problem", "Solution"],
      Child: ["Problem", "Solution"],
    },
  },
  Solution: {
    themeColor: "solution",
    NodeIcon: Check,
    allowed: {
      Parent: ["Problem", "Solution"],
      Child: ["Problem", "Solution"],
    },
  },
  RootClaim: {
    themeColor: "solution",
    NodeIcon: Article,
    allowed: {
      Parent: [],
      Child: ["Support", "Critique"],
    },
  },
  Support: {
    themeColor: "solution",
    NodeIcon: ThumbUp,
    allowed: {
      Parent: [],
      Child: ["Support", "Critique"],
    },
  },
  Critique: {
    themeColor: "solution",
    NodeIcon: ThumbDown,
    allowed: {
      Parent: [],
      Child: ["Support", "Critique"],
    },
  },
};
