const React = require("react");
const ReactJSXRuntime = require("@emotion/react/jsx-runtime");

const Fragment = ReactJSXRuntime.Fragment;

const NameContext = React.createContext({
  name: "",
});

const Name = ({ children, suffix }) => {
  const { name } = React.useContext(NameContext);
  const suffixedName = `${name}.${suffix}`;

  const Child = React.cloneElement(children, {
    "data-testid": suffixedName,
  });

  return ReactJSXRuntime.jsx(NameContext.Provider, { value: { name: suffixedName }, children: Child });
};

const create = (children) => (type, props, key) => {
  if (typeof type !== "string") {
    return ReactJSXRuntime.jsx(NameContext.Provider, { value: { name: type.name }, children }, key);
  }

  console.log(key, "key");

  return ReactJSXRuntime.jsx(Name, { ...(props || {}), children, suffix: key ? type + key : type }, key);
};

function jsx(type, props, key) {
  const children = ReactJSXRuntime.jsx(type, props || {}, key);

  return create(children)(type, props, key);
}

function jsxs(type, props, key) {
  const children = ReactJSXRuntime.jsxs(type, props, key);

  return create(children)(type, props, key);
}

module.exports = {
  Fragment,
  jsx,
  jsxs,
};
