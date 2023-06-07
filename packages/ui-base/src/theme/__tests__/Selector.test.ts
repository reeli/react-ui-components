import { $ } from "../Selector";

describe("Selector", () => {
  it("should set css styles to specific css selector", () => {
    const styles = $.of().attr("data-placement=end").css({ background: "red" });
    expect(styles).toEqual({
      "[data-placement=end]": {
        background: "red",
      },
    });
  });

  it("should set css styles to specific css selector and pseudo", () => {
    const styles = $.of()
      .attr("data-placement=end")
      .firstOfType()
      .child()
      .tag("span")
      .css(
        { background: "red" },
        {
          hover: {
            background: "white",
          },
          active: {
            background: "blue",
          },
          focus: {
            border: "red",
          },
        },
      );
    expect(styles).toEqual({
      "[data-placement=end]&:first-of-type span": {
        background: "red",
        "&:hover": {
          background: "white",
        },
        "&:active": {
          background: "blue",
        },
        "&:focus": {
          border: "red",
        },
      },
    });
  });

  it("should handle single pseudo", () => {
    const styles = $.of().hover().css({
      background: "red",
    });
    expect(styles).toEqual({
      "&:hover": {
        background: "red",
      },
    });
  });

  it("should handle complex rules", () => {
    const styles = $.of().lastOfType()
      .childCombinator()
      .attr("data-placement=end")
      .css(
        {
          background: "red",
        },
        {
          before: {
            content: "'.'",
            background: "red",
          },
        },
      );
    expect(styles).toEqual({
      "&:last-of-type > [data-placement=end]": {
        "&::before": {
          content: "'.'",
          background: "red",
        },
        background: "red",
      },
    });
  });
});
