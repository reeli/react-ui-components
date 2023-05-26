import { CSSExtensionHandler } from "../CSSExtensionHandler";
import { defaultTheme } from "../defaultTheme";

describe("#convert", () => {
  it("should covert custom css styles to official css styles", () => {
    expect(
      CSSExtensionHandler.of(defaultTheme).convert({
        px: 10,
        py: 10,
        margin: 10,
        textStyle: "bodyMedium",
        containerStyle: "primary",
      }),
    ).toEqual({
      paddingLeft: 1,
      paddingRight: 1,
      paddingBottom: 1,
      paddingTop: 1,
      margin: 1,
      fontSize: "27",
      fontFamily: "brand",
      fontWeight: 700,
      lineHeight: "10px",
      letterSpacing: "5px",
      backgroundColor: "#6750A4",
      color: "#FFFFFF",
    });
  });

  it("should always use onSurface color as text color when given background color is in surface category", () => {
    expect(
      CSSExtensionHandler.of(defaultTheme).convert({
        containerStyle: "surface",
      }),
    ).toEqual({
      color: "#1C1B1F",
      backgroundColor: "#FEF7FF",
    });
  });
});
