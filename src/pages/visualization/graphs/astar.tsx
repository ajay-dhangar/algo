// This file is kept for backwards-compat. The canonical A* page lives at /visualization/graphs/a-star
// Docusaurus will serve a-star.tsx at /visualization/graphs/a-star — this old route now redirects.
import React from "react";
import { Redirect } from "@docusaurus/router";

export default function AStarLegacyRedirect() {
  return <Redirect to="/visualization/graphs/a-star" />;
}