import { CSSExtensionHandler } from "../CSSExtensionHandler";
import { defaultTheme } from "../defaultTheme";

describe("#convert", () => {
  it("should covert custom css styles to official css styles", () => {
    expect(CSSExtensionHandler.of(defaultTheme).convert({
      px: 1,
      textStyle: "bodyMedium",
      color: "red",
      py: 1,
    })).toEqual({
      paddingLeft: 4,
      paddingRight: 4,
      fontSize: "27",
      fontFamily: "brand",
      fontWeight: 700,
      lineHeight: "10px",
      letterSpacing: "5px",
      paddingBottom: 4,
      paddingTop: 4,
      color: "red",
    });
  });
});
