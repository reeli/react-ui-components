import { DesignToken } from "../DesignToken";
import { color,fontWeight } from "../";

describe("DesignToken", () => {
  it("should generate design token by give color", () => {
    const { tokens } = DesignToken.of("md").color(color);
    expect(tokens.primary).toEqual("md.color.primary");
  });

  it("should generate design token by give fontWeight", () => {
    const { tokens } = DesignToken.of("md").fontWeight(fontWeight);
    expect(tokens.bold).toEqual("md.fontWeight.bold");
  });
});
