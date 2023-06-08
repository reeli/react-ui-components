import { ThemeFactory } from "../ThemeFactory";
import { defaultTheme } from "../defaultTheme";

describe("#convert", () => {
  it("should covert custom css styles to official css styles", () => {
    expect(
      ThemeFactory.of(defaultTheme).convert({
        px: 10,
        py: 10,
        margin: 10,
        textStyle: "bodyMedium",
        containerStyle: "primary",
      }),
    ).toEqual({
      paddingLeft: "1rem",
      paddingRight: "1rem",
      paddingBottom: "1rem",
      paddingTop: "1rem",
      margin: "1rem",
      fontSize: "2.7rem",
      fontFamily: "brand",
      fontWeight: 700,
      lineHeight: "1rem",
      letterSpacing: "0.5rem",
      backgroundColor: "#6750A4",
      color: "#FFFFFF",
    });
  });

  it("should always use onSurface color as text color when given background color is in surface category", () => {
    expect(
      ThemeFactory.of(defaultTheme).convert({
        containerStyle: "surface",
      }),
    ).toEqual({
      color: "#1C1B1F",
      backgroundColor: "#FEF7FF",
    });
  });

  // it("should handle pseudo class", () => {
  //   expect(
  //     ThemeFactory.of(defaultTheme).convert({
  //       containerStyle: "surface",
  //       "&:hover": {
  //         containerStyle: "primaryContainer",
  //       },
  //     }),
  //   ).toEqual({
  //     color: "#1C1B1F",
  //     backgroundColor: "#FEF7FF",
  //     "&:hover": {
  //       color: "#EADDFF",
  //       backgroundColor: "#21005E",
  //     },
  //   });
  // });
});
