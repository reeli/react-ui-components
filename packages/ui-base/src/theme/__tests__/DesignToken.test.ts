import { convert, defaultTheme } from "../DesignToken";

describe("#convert", () => {
  it("should covert custom css styles to official css styles", () => {
    expect(convert({ px: 1, textStyle: "bodyMedium", color: "red", py: 1 }, defaultTheme)).toEqual({
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
