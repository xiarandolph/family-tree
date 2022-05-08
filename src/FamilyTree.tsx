import React from "react";
import { Group } from "@visx/group";
import { Tree } from "@visx/hierarchy";
import { LinkVerticalStep } from "@visx/shape";
import { Zoom } from "@visx/zoom";
import { ParentSize } from "@visx/responsive";
import { HierarchyNode, HierarchyPointNode } from "@visx/hierarchy/lib/types";
import "./FamilyTree.css";

export interface Node {
  name: string;
  children?: Node[];
}

export type UpdateZoomFunction = (selected?: HierarchyNode<Node>) => void;

export interface FamilyTreeProps {
  root: HierarchyNode<Node>;
  setSelected?: (selected: HierarchyNode<Node>) => void;
  updateZoom?: React.MutableRefObject<UpdateZoomFunction | null>;
}

function FamilyTree({root, setSelected, updateZoom}: FamilyTreeProps) {
  return (
    <div className="FamilyTree">
      <ParentSize> 
        {parent => {
          const width = parent.width > 0 ? parent.width : innerWidth;
          const height = parent.height > 0 ? parent.height : innerHeight;

          return (<Zoom<SVGSVGElement>
            width={parent.width}
            height={parent.height}
            initialTransformMatrix={{
              scaleX: 1.2,
              scaleY: 1.2,
              translateX: width/2,
              translateY: height/2,
              skewX: 0,
              skewY: 0,
            }}
          >
            {zoom => {
              if (updateZoom) updateZoom.current = (selected?: HierarchyNode<Node>) => {
                const x = (selected as HierarchyPointNode<Node>)?.x || 0;
                const y = (selected as HierarchyPointNode<Node>)?.y || 0;

                zoom.setTransformMatrix({
                  scaleX: 1.2,
                  scaleY: 1.2,
                  translateX: -1.2*x + width/2,
                  translateY: -1.2*y + height/2,
                  skewX: 0,
                  skewY: 0,
                });
              };
              return (
                <svg
                  style={{ cursor: zoom.isDragging ? "grabbing" : "grab", touchAction: "none" }}
                  ref={zoom.containerRef}
                >
                  <Group transform={zoom.toString()}>
                    <Tree
                      root={root}
                      nodeSize={[50, 50]}
                      separation={() => 1}
                    >
                      {tree => (
                        <Group>
                          {tree.links().map((link, i) => (
                            <LinkVerticalStep
                              key={i}
                              data={link}
                              percent={.50}
                              stroke="rgb(254,110,158,0.6)"
                              strokeWidth="1"
                              fill="none"
                            />
                          ))}
    
                          {tree.descendants().map((node, key) => {
                            const rectWidth = 40;
                            const rectHeight = 20;
                            return (
                              <Group top={node.y} left={node.x} key={key}>
                                <rect
                                  height={rectHeight}
                                  width={rectWidth}
                                  y={-rectHeight / 2}
                                  x={-rectWidth / 2}
                                  fill="#272b4d"
                                  rx={node.data.children ? 0 : 10}
                                  onClick={() => setSelected?.(node)}
                                />
                                <text
                                  dy=".33em"
                                  fontSize={9}
                                  fontFamily="Arial"
                                  textAnchor="middle"
                                  style={{ pointerEvents: "none" }}
                                  fill={node.children ? "white" : "#26deb0"}
                                >
                                  {node.data.name}
                                </text>
                              </Group>
                            );
                          })}
                        </Group>
                      )}
                    </Tree>
                  </Group>
                </svg>
              );}}
          </Zoom>);
        }
        }
      </ParentSize>
    </div>
  );
}

export default FamilyTree;
