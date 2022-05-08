import React from "react";
import { HierarchyNode } from "@visx/hierarchy/lib/types";
import { Tree } from "@blueprintjs/core";
import { Node } from "./FamilyTree";

export interface MenuProps {
  root: HierarchyNode<Node>;
}

function convert(node: HierarchyNode<Node>) {
  return;
}

function Menu({root}: MenuProps) {

  const mapNode = (node: HierarchyNode<Node>) => (
    <li>
      {node.data.name}
      {node.children && <ul>{node.children.map(mapNode)}</ul>}
    </li>
  );

  return (
    <div>
      <ul>
        {root && mapNode(root)}
      </ul>
    </div>
  );
}

export default Menu;