import { getPlacement, Placement } from "../getPlacement";

describe("getPlacement", () => {
  const triggerRect = {
    width: 200,
    height: 50,
    top: 100,
    left: 100,
    right: 0,
    bottom: 0,
  } as DOMRect;

  const contentRect = {
    width: 500,
    height: 200,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  } as DOMRect;

  it("should get correct position when placement is top", () => {
    expect(getPlacement({ triggerRect, contentRect, placement: Placement.top })).toEqual({
      left: -50,
      top: 50,
    });
  });

  it("should get correct position when placement is topLeft", () => {
    expect(getPlacement({ triggerRect, contentRect, placement: Placement.topLeft })).toEqual({
      left: 100,
      top: 50,
    });
  });

  it("should get correct position when placement is topRight", () => {
    expect(getPlacement({ triggerRect, contentRect, placement: Placement.topRight })).toEqual({
      left: -200,
      top: 50,
    });
  });

  it("should get correct position when placement is bottom", () => {
    expect(getPlacement({ triggerRect, contentRect, placement: Placement.bottom })).toEqual({
      left: -50,
      top: 150,
    });
  });

  it("should get correct position when placement is bottomLeft", () => {
    expect(getPlacement({ triggerRect, contentRect, placement: Placement.bottomLeft })).toEqual({
      left: 100,
      top: 150,
    });
  });

  it("should get correct position when placement is left", () => {
    expect(getPlacement({ triggerRect, contentRect, placement: Placement.left })).toEqual({
      left: -400,
      top: 25,
    });
  });

  it("should get correct position when placement is leftTop", () => {
    expect(getPlacement({ triggerRect, contentRect, placement: Placement.leftTop })).toEqual({
      left: -400,
      top: 100,
    });
  });

  it("should get correct position when placement is leftBottom", () => {
    expect(getPlacement({ triggerRect, contentRect, placement: Placement.leftBottom })).toEqual({
      left: -400,
      top: -50,
    });
  });

  it("should get correct position when placement is right", () => {
    expect(getPlacement({ triggerRect, contentRect, placement: Placement.right })).toEqual({
      left: 300,
      top: 25,
    });
  });

  it("should get correct position when placement is rightTop", () => {
    expect(getPlacement({ triggerRect, contentRect, placement: Placement.rightTop })).toEqual({
      left: 300,
      top: 100,
    });
  });

  it("should get correct position when placement is rightBottom", () => {
    expect(getPlacement({ triggerRect, contentRect, placement: Placement.rightBottom })).toEqual({
      left: 300,
      top: -50,
    });
  });
});
