import { CSSPropsWithExtensions } from "packages/ui-base/src/theme/type";

interface Pseudo {
  hover: CSSPropsWithExtensions;
  active: CSSPropsWithExtensions;
  focus: CSSPropsWithExtensions;
  before: CSSPropsWithExtensions;
  after: CSSPropsWithExtensions;
}

export class $ {
  private selectors: string[] = [];

  constructor() {}

  attr(selector: string) {
    this.selectors.push(`[${selector}]`);
    return this;
  }

  tag(selector: string) {
    this.selectors.push(selector);
    return this;
  }

  child() {
    this.selectors.push(" ");
    return this;
  }

  childCombinator() {
    this.selectors.push(" > ");
    return this;
  }

  sibling() {
    this.selectors.push(" + ");
    return this;
  }

  hover() {
    this.selectors.push("&:hover");
    return this;
  }

  focus() {
    this.selectors.push("&:focus");
    return this;
  }

  before() {
    this.selectors.push("&::before");
    return this;
  }

  active() {
    this.selectors.push("&:active");
    return this;
  }

  firstOfType() {
    this.selectors.push("&:first-of-type");
    return this;
  }

  lastOfType() {
    this.selectors.push("&:last-of-type");
    return this;
  }

  static of() {
    return new $();
  }

  css(css: CSSPropsWithExtensions, pseudo?: Partial<Pseudo>) {
    const finalSelector = this.selectors.reduce((res, item) => {
      return res + item;
    }, "");

    const mapping: { [K: string]: string } = {
      hover: "&:hover",
      focus: "&:focus",
      active: "&:active",
      before: "&::before",
      after: "&::after",
    };

    return {
      [finalSelector]: pseudo
        ? {
            ...css,
            ...Object.keys(pseudo).reduce((res, key) => {
              return {
                ...res,
                [mapping[key]]: (pseudo as any)[key],
              };
            }, {}),
          }
        : css,
    };
  }
}
