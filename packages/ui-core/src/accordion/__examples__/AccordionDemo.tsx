import { css } from "@emotion/react";
import { Accordion } from "../Accordion";
import { AccordionGroup } from "../AccordionGroup";

const headerStyles = css({
  background: "#ccc",
});

export function AccordionDemo() {
  return (
    <Accordion>
      <AccordionGroup header={<span css={headerStyles}>accordion 1</span>}>
        <span>accordion content 1</span>
      </AccordionGroup>
      <AccordionGroup header={<span css={headerStyles}>accordion 1</span>}>
        <span>accordion content 2</span>
      </AccordionGroup>
      <AccordionGroup header={<span css={headerStyles}>accordion 1</span>}>
        <span>accordion content 3</span>
      </AccordionGroup>
    </Accordion>
  );
}
