const React = require("react");
const ReactJSXRuntime = require("@emotion/react/jsx-runtime");
const _ = require("lodash");

const Fragment = ReactJSXRuntime.Fragment;

const NameContext = React.createContext({
  name: "",
});

const AutoTestId = ({ children, suffix, testIdChild }) => {
  const { name } = React.useContext(NameContext);
  // const suffixedName = suffix ? `${name ? name + "." : ""}${suffix}` : name;

  console.log(testIdChild, name, "---");
  const Child = React.cloneElement(
    children,
    testIdChild && name
      ? {
          "data-testid": `${name}.${testIdChild}`,
        }
      : {},
  );

  return Child;
};

const create = (children) => (type, props, key) => {
  if (typeof type !== "string") {
    if ((props || {})["testid-root"]) {
      return ReactJSXRuntime.jsx(
        NameContext.Provider,
        {
          value: { name: (props || {})["testid-root"] || "" },
          children,
        },
        key,
      );
    }

    return children;
  }

  const defaultSuffix = key ? type + key : type;

  return ReactJSXRuntime.jsx(
    AutoTestId,
    {
      ...(props || {}),
      children,
      // suffix: defaultSuffix,
      testIdChild: (props || {})["role"] || "",
    },
    key,
  );
};

function jsx(type, props, key) {
  const children = ReactJSXRuntime.jsx(type, ignoreTestProps(props || {}), key);

  return create(children)(type, props, key);
}

function jsxs(type, props, key) {
  const children = ReactJSXRuntime.jsxs(type, ignoreTestProps(props), key);

  return create(children)(type, props, key);
}

const ignoreTestProps = (props = {}) => {
  return _.omit(props, ["testid-root", "role"]);
};

module.exports = {
  Fragment,
  jsx,
  jsxs,
};
