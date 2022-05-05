import React from "react";
import { Group } from "@visx/group";
import { hierarchy, Tree } from "@visx/hierarchy";
import { LinkVerticalStep } from "@visx/shape";
import { Zoom } from "@visx/zoom";
import { localPoint } from "@visx/event";
import "./FamilyTree.css";

interface Node {
  name: string;
  children?: Node[];
}

const data: Node = {"name": "A", "children": [{"name": "B"}, {"name": "B1", "children": [{"name": "C", "children": [{"name": "D", "children": [{"name": "E", "children": [{"name": "F"}, {"name": "F1"}, {"name": "F2"}]}]}, {"name": "D1", "children": [{"name": "E1", "children": [{"name": "F3", "children": [{"name": "G", "children": [{"name": "H"}, {"name": "H1"}, {"name": "H2"}, {"name": "H3"}]}]}, {"name": "F4"}, {"name": "F5", "children": [{"name": "G1", "children": [{"name": "H4"}, {"name": "H5"}]}, {"name": "G2", "children": [{"name": "H6"}, {"name": "H7"}]}]}, {"name": "F6", "children": [{"name": "G3", "children": [{"name": "H8"}, {"name": "H9"}, {"name": "H10"}]}, {"name": "G4", "children": [{"name": "H11"}, {"name": "H12"}, {"name": "H13"}, {"name": "H14"}]}]}]}]}]}, {"name": "C1", "children": [{"name": "D2", "children": [{"name": "E2", "children": [{"name": "F7"}, {"name": "F8"}, {"name": "F9", "children": [{"name": "G5", "children": [{"name": "H15"}, {"name": "H16"}, {"name": "H17"}, {"name": "H18"}]}, {"name": "G6", "children": [{"name": "H19"}]}, {"name": "G7"}, {"name": "G8", "children": [{"name": "H20"}, {"name": "H21"}]}]}]}, {"name": "E3"}, {"name": "E4", "children": [{"name": "F10", "children": [{"name": "G9", "children": [{"name": "H22"}]}, {"name": "G10"}, {"name": "G11", "children": [{"name": "H23"}, {"name": "H24"}, {"name": "H25"}]}, {"name": "G12", "children": [{"name": "H26"}, {"name": "H27"}, {"name": "H28"}]}]}, {"name": "F11", "children": [{"name": "G13"}, {"name": "G14", "children": [{"name": "H29"}, {"name": "H30"}, {"name": "H31"}]}]}, {"name": "F12", "children": [{"name": "G15", "children": [{"name": "H32"}]}, {"name": "G16"}, {"name": "G17"}]}, {"name": "F13", "children": [{"name": "G18", "children": [{"name": "H33"}, {"name": "H34"}, {"name": "H35"}, {"name": "H36"}]}, {"name": "G19", "children": [{"name": "H37"}, {"name": "H38"}, {"name": "H39"}]}, {"name": "G20", "children": [{"name": "H40"}, {"name": "H41"}, {"name": "H42"}]}, {"name": "G21", "children": [{"name": "H43"}, {"name": "H44"}, {"name": "H45"}, {"name": "H46"}]}]}]}, {"name": "E5", "children": [{"name": "F14", "children": [{"name": "G22", "children": [{"name": "H47"}, {"name": "H48"}, {"name": "H49"}, {"name": "H50"}]}, {"name": "G23", "children": [{"name": "H51"}, {"name": "H52"}, {"name": "H53"}, {"name": "H54"}]}, {"name": "G24", "children": [{"name": "H55"}, {"name": "H56"}, {"name": "H57"}, {"name": "H58"}]}, {"name": "G25", "children": [{"name": "H59"}, {"name": "H60"}, {"name": "H61"}]}]}]}]}, {"name": "D3", "children": [{"name": "E6"}, {"name": "E7", "children": [{"name": "F15", "children": [{"name": "G26", "children": [{"name": "H62"}, {"name": "H63"}, {"name": "H64"}, {"name": "H65"}]}, {"name": "G27", "children": [{"name": "H66"}, {"name": "H67"}]}]}, {"name": "F16", "children": [{"name": "G28", "children": [{"name": "H68"}]}]}, {"name": "F17"}, {"name": "F18", "children": [{"name": "G29", "children": [{"name": "H69"}]}, {"name": "G30", "children": [{"name": "H70"}]}]}]}, {"name": "E8", "children": [{"name": "F19", "children": [{"name": "G31", "children": [{"name": "H71"}, {"name": "H72"}, {"name": "H73"}]}, {"name": "G32", "children": [{"name": "H74"}, {"name": "H75"}, {"name": "H76"}]}, {"name": "G33", "children": [{"name": "H77"}]}]}, {"name": "F20", "children": [{"name": "G34", "children": [{"name": "H78"}, {"name": "H79"}, {"name": "H80"}, {"name": "H81"}]}, {"name": "G35", "children": [{"name": "H82"}, {"name": "H83"}, {"name": "H84"}, {"name": "H85"}]}]}, {"name": "F21"}, {"name": "F22"}]}]}, {"name": "D4", "children": [{"name": "E9", "children": [{"name": "F23", "children": [{"name": "G36"}, {"name": "G37"}, {"name": "G38", "children": [{"name": "H86"}, {"name": "H87"}, {"name": "H88"}, {"name": "H89"}]}]}, {"name": "F24", "children": [{"name": "G39", "children": [{"name": "H90"}]}, {"name": "G40", "children": [{"name": "H91"}, {"name": "H92"}, {"name": "H93"}]}, {"name": "G41", "children": [{"name": "H94"}, {"name": "H95"}]}, {"name": "G42"}]}]}, {"name": "E10", "children": [{"name": "F25", "children": [{"name": "G43", "children": [{"name": "H96"}, {"name": "H97"}]}, {"name": "G44", "children": [{"name": "H98"}]}, {"name": "G45"}]}, {"name": "F26", "children": [{"name": "G46", "children": [{"name": "H99"}, {"name": "H100"}, {"name": "H101"}, {"name": "H102"}]}, {"name": "G47", "children": [{"name": "H103"}, {"name": "H104"}, {"name": "H105"}]}, {"name": "G48", "children": [{"name": "H106"}, {"name": "H107"}, {"name": "H108"}]}, {"name": "G49"}]}]}, {"name": "E11", "children": [{"name": "F27", "children": [{"name": "G50", "children": [{"name": "H109"}, {"name": "H110"}, {"name": "H111"}, {"name": "H112"}]}, {"name": "G51"}, {"name": "G52", "children": [{"name": "H113"}]}]}, {"name": "F28", "children": [{"name": "G53", "children": [{"name": "H114"}, {"name": "H115"}, {"name": "H116"}, {"name": "H117"}]}, {"name": "G54", "children": [{"name": "H118"}, {"name": "H119"}, {"name": "H120"}]}]}]}]}]}, {"name": "C2", "children": [{"name": "D5"}, {"name": "D6", "children": [{"name": "E12", "children": [{"name": "F29", "children": [{"name": "G55", "children": [{"name": "H121"}, {"name": "H122"}]}, {"name": "G56", "children": [{"name": "H123"}]}, {"name": "G57", "children": [{"name": "H124"}, {"name": "H125"}]}, {"name": "G58", "children": [{"name": "H126"}]}]}, {"name": "F30", "children": [{"name": "G59", "children": [{"name": "H127"}, {"name": "H128"}, {"name": "H129"}]}]}, {"name": "F31"}]}, {"name": "E13"}, {"name": "E14", "children": [{"name": "F32", "children": [{"name": "G60", "children": [{"name": "H130"}, {"name": "H131"}]}, {"name": "G61", "children": [{"name": "H132"}, {"name": "H133"}, {"name": "H134"}, {"name": "H135"}]}, {"name": "G62", "children": [{"name": "H136"}, {"name": "H137"}, {"name": "H138"}, {"name": "H139"}]}, {"name": "G63", "children": [{"name": "H140"}]}]}]}, {"name": "E15", "children": [{"name": "F33"}, {"name": "F34", "children": [{"name": "G64", "children": [{"name": "H141"}, {"name": "H142"}, {"name": "H143"}, {"name": "H144"}]}, {"name": "G65", "children": [{"name": "H145"}, {"name": "H146"}]}, {"name": "G66"}]}]}]}]}]}, {"name": "B2", "children": [{"name": "C3", "children": [{"name": "D7", "children": [{"name": "E16"}]}, {"name": "D8", "children": [{"name": "E17", "children": [{"name": "F35", "children": [{"name": "G67"}, {"name": "G68", "children": [{"name": "H147"}, {"name": "H148"}]}, {"name": "G69", "children": [{"name": "H149"}, {"name": "H150"}, {"name": "H151"}, {"name": "H152"}]}, {"name": "G70", "children": [{"name": "H153"}, {"name": "H154"}, {"name": "H155"}, {"name": "H156"}]}]}, {"name": "F36", "children": [{"name": "G71", "children": [{"name": "H157"}, {"name": "H158"}, {"name": "H159"}]}, {"name": "G72", "children": [{"name": "H160"}, {"name": "H161"}, {"name": "H162"}, {"name": "H163"}]}, {"name": "G73", "children": [{"name": "H164"}, {"name": "H165"}, {"name": "H166"}]}, {"name": "G74", "children": [{"name": "H167"}, {"name": "H168"}]}]}]}]}, {"name": "D9", "children": [{"name": "E18", "children": [{"name": "F37", "children": [{"name": "G75", "children": [{"name": "H169"}, {"name": "H170"}]}, {"name": "G76", "children": [{"name": "H171"}, {"name": "H172"}, {"name": "H173"}, {"name": "H174"}]}]}, {"name": "F38", "children": [{"name": "G77", "children": [{"name": "H175"}, {"name": "H176"}, {"name": "H177"}]}]}, {"name": "F39", "children": [{"name": "G78", "children": [{"name": "H178"}]}]}]}]}, {"name": "D10", "children": [{"name": "E19"}, {"name": "E20", "children": [{"name": "F40"}, {"name": "F41", "children": [{"name": "G79", "children": [{"name": "H179"}]}]}]}, {"name": "E21", "children": [{"name": "F42"}, {"name": "F43", "children": [{"name": "G80", "children": [{"name": "H180"}, {"name": "H181"}]}, {"name": "G81", "children": [{"name": "H182"}, {"name": "H183"}, {"name": "H184"}]}]}, {"name": "F44", "children": [{"name": "G82"}, {"name": "G83", "children": [{"name": "H185"}]}, {"name": "G84", "children": [{"name": "H186"}]}, {"name": "G85"}]}]}, {"name": "E22", "children": [{"name": "F45", "children": [{"name": "G86"}, {"name": "G87", "children": [{"name": "H187"}, {"name": "H188"}, {"name": "H189"}]}, {"name": "G88", "children": [{"name": "H190"}, {"name": "H191"}, {"name": "H192"}, {"name": "H193"}]}]}, {"name": "F46"}, {"name": "F47"}]}]}]}, {"name": "C4", "children": [{"name": "D11", "children": [{"name": "E23"}, {"name": "E24", "children": [{"name": "F48", "children": [{"name": "G89", "children": [{"name": "H194"}, {"name": "H195"}, {"name": "H196"}]}, {"name": "G90", "children": [{"name": "H197"}]}, {"name": "G91", "children": [{"name": "H198"}, {"name": "H199"}, {"name": "H200"}, {"name": "H201"}]}, {"name": "G92", "children": [{"name": "H202"}, {"name": "H203"}]}]}, {"name": "F49", "children": [{"name": "G93", "children": [{"name": "H204"}, {"name": "H205"}, {"name": "H206"}]}, {"name": "G94", "children": [{"name": "H207"}, {"name": "H208"}, {"name": "H209"}, {"name": "H210"}]}]}]}, {"name": "E25", "children": [{"name": "F50", "children": [{"name": "G95", "children": [{"name": "H211"}, {"name": "H212"}, {"name": "H213"}]}]}]}]}, {"name": "D12", "children": [{"name": "E26", "children": [{"name": "F51", "children": [{"name": "G96", "children": [{"name": "H214"}, {"name": "H215"}, {"name": "H216"}, {"name": "H217"}]}, {"name": "G97", "children": [{"name": "H218"}, {"name": "H219"}, {"name": "H220"}]}, {"name": "G98", "children": [{"name": "H221"}, {"name": "H222"}]}]}, {"name": "F52"}, {"name": "F53", "children": [{"name": "G99"}, {"name": "G100", "children": [{"name": "H223"}, {"name": "H224"}, {"name": "H225"}, {"name": "H226"}]}, {"name": "G101", "children": [{"name": "H227"}, {"name": "H228"}, {"name": "H229"}, {"name": "H230"}]}]}]}, {"name": "E27", "children": [{"name": "F54"}, {"name": "F55", "children": [{"name": "G102", "children": [{"name": "H231"}, {"name": "H232"}, {"name": "H233"}, {"name": "H234"}]}, {"name": "G103", "children": [{"name": "H235"}, {"name": "H236"}, {"name": "H237"}]}]}]}, {"name": "E28", "children": [{"name": "F56"}, {"name": "F57", "children": [{"name": "G104", "children": [{"name": "H238"}, {"name": "H239"}, {"name": "H240"}]}, {"name": "G105", "children": [{"name": "H241"}, {"name": "H242"}]}]}, {"name": "F58", "children": [{"name": "G106", "children": [{"name": "H243"}, {"name": "H244"}, {"name": "H245"}]}, {"name": "G107", "children": [{"name": "H246"}, {"name": "H247"}, {"name": "H248"}, {"name": "H249"}]}]}]}]}, {"name": "D13", "children": [{"name": "E29", "children": [{"name": "F59", "children": [{"name": "G108", "children": [{"name": "H250"}]}, {"name": "G109", "children": [{"name": "H251"}, {"name": "H252"}, {"name": "H253"}, {"name": "H254"}]}, {"name": "G110", "children": [{"name": "H255"}, {"name": "H256"}, {"name": "H257"}]}]}, {"name": "F60"}, {"name": "F61", "children": [{"name": "G111", "children": [{"name": "H258"}, {"name": "H259"}]}]}]}]}]}, {"name": "C5", "children": [{"name": "D14"}, {"name": "D15", "children": [{"name": "E30", "children": [{"name": "F62", "children": [{"name": "G112", "children": [{"name": "H260"}, {"name": "H261"}, {"name": "H262"}]}, {"name": "G113", "children": [{"name": "H263"}, {"name": "H264"}, {"name": "H265"}, {"name": "H266"}]}, {"name": "G114", "children": [{"name": "H267"}, {"name": "H268"}, {"name": "H269"}]}]}, {"name": "F63", "children": [{"name": "G115", "children": [{"name": "H270"}, {"name": "H271"}]}]}, {"name": "F64", "children": [{"name": "G116", "children": [{"name": "H272"}, {"name": "H273"}, {"name": "H274"}]}, {"name": "G117", "children": [{"name": "H275"}]}, {"name": "G118", "children": [{"name": "H276"}, {"name": "H277"}]}, {"name": "G119", "children": [{"name": "H278"}, {"name": "H279"}]}]}]}, {"name": "E31", "children": [{"name": "F65", "children": [{"name": "G120", "children": [{"name": "H280"}, {"name": "H281"}]}]}]}]}, {"name": "D16", "children": [{"name": "E32", "children": [{"name": "F66", "children": [{"name": "G121", "children": [{"name": "H282"}, {"name": "H283"}, {"name": "H284"}, {"name": "H285"}]}]}, {"name": "F67", "children": [{"name": "G122"}, {"name": "G123"}]}]}]}, {"name": "D17", "children": [{"name": "E33", "children": [{"name": "F68"}, {"name": "F69", "children": [{"name": "G124", "children": [{"name": "H286"}, {"name": "H287"}, {"name": "H288"}, {"name": "H289"}]}]}, {"name": "F70", "children": [{"name": "G125", "children": [{"name": "H290"}, {"name": "H291"}]}, {"name": "G126", "children": [{"name": "H292"}, {"name": "H293"}, {"name": "H294"}]}, {"name": "G127", "children": [{"name": "H295"}, {"name": "H296"}, {"name": "H297"}, {"name": "H298"}]}]}]}]}]}, {"name": "C6", "children": [{"name": "D18"}]}]}, {"name": "B3", "children": [{"name": "C7"}, {"name": "C8"}]}]};

function FamilyTree() {
  // TODO: generate search tree for hierarchy
  const hier = hierarchy(data, d => d.children);
  console.log(hier);

  return (
    <div className="FamilyTree">
      <div className="Search">
        A
      </div>
      <div className="View">
        <Zoom<SVGSVGElement>
          width={innerWidth}
          height={innerHeight}
          initialTransformMatrix={{
            scaleX: 1,
            scaleY: 1,
            translateX: innerWidth/2,
            translateY: 50,
            skewX: 0,
            skewY: 0,
          }}
        >
          {zoom => (
            <svg
              style={{ cursor: zoom.isDragging ? "grabbing" : "grab", touchAction: "none" }}
              ref={zoom.containerRef}
            >
              <rect
                width={innerWidth}
                height={innerHeight}
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
                  root={hier}
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
          )}
        </Zoom>
      </div>
      
      
      
    </div>
  );
}

export default FamilyTree;
