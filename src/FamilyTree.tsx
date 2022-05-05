import React from "react";
import { Group} from "@visx/group";
import { hierarchy, Tree } from "@visx/hierarchy";
import { LinkVertical } from "@visx/shape";
import { Zoom } from "@visx/zoom";
import { localPoint } from "@visx/event";
import "./FamilyTree.css";

interface Node {
  name: string;
  children?: Node[];
}

const data: Node = {
  name: "T",
  children: [
    {
      name: "A",
      children: [
        { name: "A1" },
        { name: "A2" },
        { name: "A3" },
        {
          name: "C",
          children: [
            {
              name: "C1",
            },
            {
              name: "D",
              children: [
                {
                  name: "D1",
                },
                {
                  name: "D2",
                },
                {
                  name: "D3",
                },
              ],
            },
          ],
        },
      ],
    },
    { name: "Z" },
    {
      name: "B",
      children: [{ name: "B1" }, { name: "B2" }, { name: "B3" }],
    },
  ],
};

const width = 640;
const height = 480;

function FamilyTree() {
  // TODO: generate search tree for hierarchy
  // const hier = hierarchy(data, d => d.children);
  // console.log(hier);

  return ( 
    <div className="FamilyTree">
      <div className="Search">
        A
      </div>
      <Zoom<SVGSVGElement>
        width={width}
        height={height}
      >
        {zoom => (
          <svg 
            width={width}
            height={height}
            style={{ cursor: zoom.isDragging ? "grabbing" : "grab", touchAction: "none" }}
            ref={zoom.containerRef}
          >
            <rect
              width={width}
              height={height}
              rx={14}
              fill="transparent"
              onTouchStart={zoom.dragStart}
              onTouchMove={zoom.dragMove}
              onTouchEnd={zoom.dragEnd}
              onMouseDown={zoom.dragStart}
              onMouseMove={zoom.dragMove}
              onMouseUp={zoom.dragEnd}
              onMouseLeave={() => {
                if (zoom.isDragging) zoom.dragEnd();
              }}
              onDoubleClick={(event) => {
                const point = localPoint(event) || { x: 0, y: 0 };
                zoom.scale({ scaleX: 1.1, scaleY: 1.1, point });
              }}
            />
            <Group transform={zoom.toString()}>
              <Tree
                root={hierarchy(data, d => d.children)}
                size={[width, height]}
              >
                {tree => (
                  <Group>
                    {tree.links().map((link, i) => (
                      <LinkVertical
                        key={i}
                        data={link}
                        stroke="rgb(254,110,158,0.6)"
                        strokeWidth="1"
                        fill="none"
                      />
                    ))}
  
                    {tree.descendants().map((node, key) => {
                      const width = 40;
                      const height = 20;
                      return (
                        <Group top={node.y} left={node.x} key={key}>
                          <rect
                            height={height}
                            width={width}
                            y={-height / 2}
                            x={-width / 2}
                            fill="#272b4d"
                            rx={node.data.children ? 0 : 10}
                            onClick={() => {
                              console.log(node);
                            }}
                          />
                          <text
                            dy=".33em"
                            fontSize={9}
                            fontFamily="Arial"
                            textAnchor="middle"
                            style={{ pointerEvents: "none" }}
                            fill={node.depth === 0 ? "#71248e" : node.children ? "white" : "#26deb0"}
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
        )}
      </Zoom>  
    </div>
  );
}

export default FamilyTree;
