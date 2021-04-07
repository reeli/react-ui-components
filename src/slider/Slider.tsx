import React, { useState } from "react";

export const Slider =
  ({ children, disabled, ...others }) => {
    const [startX, setStartX] = useState<number | null>(null);
    const [deltaX, setDeltaX] = useState(0);
    const totalWidth = 100;
    const totalHeight = 4;
    // TODO: 解决浮点数相乘精读丢失问题，比如：0.14*100
    const percentage = Math.floor((deltaX / totalWidth).toFixed(2) * 100);

    return (
      <div>
        <div css={{
          position: "relative", width: totalWidth, height: totalHeight, border: "1px solid #ccc"
        }}>
          <div css={{
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: 10
          }}/>

          <div css={{
            position: "absolute",
            width: `${percentage}%`,
            height: "100%",
            zIndex: 11,
            backgroundColor: "blue"
          }}>
          </div>
          <div

            onTouchStart={(e) => {
              console.log("touch start", e.touches[0].clientX);
              setStartX(e.touches[0].clientX - deltaX);
            }} onTouchMove={(e) => {
            const dx = Math.floor(e.touches[0].clientX - startX);
            if (dx <= 0) {
              setDeltaX(0);
              return;
            }

            if (dx >= totalWidth) {
              setDeltaX(totalWidth);
              return;
            }

            setDeltaX(dx);


            // const per = Number((dx/totalWidth).toFixed(2))
            //
            // if(per<=0){
            //   setPercentage(0)
            //   return;
            // }
            // if(per>=1){
            //   setPercentage(100);
            //   return;
            // }
            //
            // setPercentage(per *100)

          }} onTouchEnd={(e) => {
            console.log("touch end");
          }} css={{
            width: totalHeight * 4,
            height: totalHeight * 4,
            borderRadius: totalHeight * 4,
            backgroundColor: "rgba(255,0,0,0.5)",
            position: "absolute",
            zIndex: 12,
            left: `${percentage}%`
            ,
            transform: `translate3d(-50%, -35%, 0)`
          }}/>
        </div>
        <div>{percentage}</div>
      </div>
    );
  };
