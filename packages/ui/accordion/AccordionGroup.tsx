export function AccordionGroup(props: any) {
  const { header, children } = props;
  return (
    <div>
      {header && <div>{header}</div>}
      <div>{children}</div>
    </div>
  );
}
