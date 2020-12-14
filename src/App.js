import React from "react";

import { Box, Typography } from "@material-ui/core";
import StudioBoxSymmetry from "./components/StudioBoxApp/StudioBox";
import "./styles.css";

const DefaultTypographyBlock = (content) => {
  return (
    <Typography variant="overline">
      <Box letterSpacing={26} m={3}>
        {content}
      </Box>
    </Typography>
  );
};
export default function App() {
  return (
    <div className="App">
      <StudioBoxSymmetry greeting={"Dynamic Greeting"} color="#CCC4dd">
        {DefaultTypographyBlock("Studio Box Symmetry")}
      </StudioBoxSymmetry>
    </div>
  );
}
