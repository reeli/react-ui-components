import { Grid } from "@material-ui/core";
import { Row } from "../Row";
import { Col } from "../Col";

export function GridDemo() {
  return (
    <div>
      <Grid container>
        <Grid item sm={1}>
          1
        </Grid>
        <Grid item sm={11}>
          2
        </Grid>
        <Grid item sm={1}>
          3
        </Grid>
      </Grid>

      <Row justifyContent={"center"}>
        <Col sm={1}>1</Col>
        <Col sm={10}>2</Col>
        <Col sm={1}>3</Col>
      </Row>
    </div>
  );
}
