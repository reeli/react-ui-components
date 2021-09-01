import React from "react";
import { Grid } from "@material-ui/core";
import { Row } from "src/grid/Row";
import { Col } from "src/grid/Col";

export class GridDemo extends React.Component<any, any> {
  render() {
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
}
