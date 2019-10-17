import * as d3 from "d3-shape";
import { times } from "lodash";
import React from "react";
import { TouchEvent } from "react";

const rad = Math.PI / 180; // 1PI=180度

export class DonutProgress extends React.Component<any, any> {
  svg: SVGElement | null = null;
  state = {
    centerX: 0,
    centerY: 0,
    thetaStart: 0,
    thetaMove: 120,
    thetaMovePrev: 0,
  };

  componentDidMount() {
    const svgRect = this.svg!.getBoundingClientRect() as ClientRect;
    this.setState({
      centerX: svgRect.left + svgRect.width / 2,
      centerY: svgRect.top + svgRect.height / 2,
    });
  }

  render() {
    const arc = d3.arc();
    const dx = 360 / 60;

    return (
      <div>
        <svg
          width={200}
          height={200}
          onTouchStart={(e: TouchEvent<any>) => {
            const dx = e.touches[0].clientX - this.state.centerX;
            const dy = e.touches[0].clientY - this.state.centerY;
            let thetaStart = Math.atan(dy / dx);
            if (dx < 0) {
              thetaStart = Math.PI - Math.atan(dy / -dx);
            }

            this.setState({
              thetaStart: thetaStart / rad,
              thetaMovePrev: this.state.thetaMove,
            });
          }}
          onTouchEnd={() => {
            this.setState({
              thetaStart: 0,
              thetaMovePrev: 0,
            });
          }}
          onTouchMove={(e: TouchEvent<any>) => {
            const dx = e.touches[0].clientX - this.state.centerX;
            const dy = e.touches[0].clientY - this.state.centerY;
            let thetaMove = Math.atan(dy / dx);
            if (dx < 0) {
              thetaMove = Math.PI - Math.atan(dy / -dx);
            }
            const per = thetaMove / rad - this.state.thetaStart;
            this.setState({
              thetaMove: this.state.thetaMovePrev + per,
            });
          }}
          ref={(svg: any) => {
            this.svg = svg;
          }}
        >
          <g style={{ transform: "translate(100px, 100px)" }} fill="blue">
            {times(60, (index: number) => {
              return (
                <path
                  key={index}
                  d={
                    arc({
                      innerRadius: 80, //px
                      outerRadius: 100,
                      startAngle: rad * dx * index,
                      endAngle: rad * (dx * index + 1), // 弧度
                    })!
                  }
                />
              );
            })}
            <path
              d={
                arc({
                  innerRadius: 80, //px
                  outerRadius: 100,
                  startAngle: 0,
                  endAngle: rad * this.state.thetaMove, // 弧度
                })!
              }
              fill={"red"}
            />
            <circle x={0} y={0} r={3} fill={"red"} />
          </g>
        </svg>
      </div>
    );
  }
}
