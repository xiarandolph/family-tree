import React from "react";
import { HierarchyNode } from "@visx/hierarchy/lib/types";
import { Classes, Tree, TreeNodeInfo } from "@blueprintjs/core";
import { Node } from "./FamilyTree";

type NodePath = number[];

type TreeAction =
    | { type: "SET_IS_EXPANDED"; payload: { path: NodePath; isExpanded: boolean } }
    | { type: "DESELECT_ALL" }
    | { type: "SET_IS_SELECTED"; payload: { path: NodePath; isSelected: boolean } };

function forEachNode(nodes: TreeNodeInfo[] | undefined, callback: (node: TreeNodeInfo) => void) {
  if (nodes === undefined) {
    return;
  }
  
  for (const node of nodes) {
    callback(node);
    forEachNode(node.childNodes, callback);
  }
}
  
function forNodeAtPath(nodes: TreeNodeInfo[], path: NodePath, callback: (node: TreeNodeInfo) => void) {
  callback(Tree.nodeFromPath(path, nodes));
}

function convert(node: HierarchyNode<Node>): TreeNodeInfo<HierarchyNode<Node>> {
  return {
    id: node.id || node.data.name,
    label: node.data.name,
    hasCaret: node.children !== undefined,
    childNodes: node.children?.map(convert),
    nodeData: node,
  };
}

function treeReducer(state: TreeNodeInfo[], action: TreeAction) {
  switch (action.type) {
  case "DESELECT_ALL":
    forEachNode(state, node => (node.isSelected = false));
    break;
  case "SET_IS_EXPANDED":
    forNodeAtPath(state, action.payload.path, node => (node.isExpanded = action.payload.isExpanded));
    break;
  case "SET_IS_SELECTED":
    forNodeAtPath(state, action.payload.path, node => (node.isSelected = action.payload.isSelected));
    break;
  }
  return [...state];
}

export interface MenuProps {
  root: HierarchyNode<Node>;
  onSelect?: (selected: HierarchyNode<Node>) => void;
}

function Menu({root, onSelect}: MenuProps) {
  const nodes = [convert(root)];
  
  const [contents, dispatch] = React.useReducer(treeReducer, nodes);

  const handleNodeClick = React.useCallback(
    (node: TreeNodeInfo, nodePath: NodePath) => {
      dispatch({ type: "DESELECT_ALL" }); // unselect previous selection
      dispatch({
        payload: { path: nodePath, isSelected: node.isSelected == null ? true : !node.isSelected },
        type: "SET_IS_SELECTED",
      });
      onSelect?.(node.nodeData as HierarchyNode<Node>);
    },
    [],
  );

  const handleNodeCollapse = React.useCallback((_node: TreeNodeInfo, nodePath: NodePath) => {
    dispatch({
      payload: { path: nodePath, isExpanded: false },
      type: "SET_IS_EXPANDED",
    });
  }, []);

  const handleNodeExpand = React.useCallback((_node: TreeNodeInfo, nodePath: NodePath) => {
    dispatch({
      payload: { path: nodePath, isExpanded: true },
      type: "SET_IS_EXPANDED",
    });
  }, []);
  
  return (
    <div className="Menu">
      <Tree
        contents={contents}
        className={Classes.ELEVATION_0}
        onNodeClick={handleNodeClick}
        onNodeCollapse={handleNodeCollapse}
        onNodeExpand={handleNodeExpand}
      />
    </div>
  );
}

export default Menu;