import React from "react";

import { StudioBoxContextProvider, OuterComponent } from "./StudioBoxContext";

const StudioBoxSymmetry = (props) => {
  // const { classes } = props;
  const { greeting, color, children } = props;

  return (
    <StudioBoxContextProvider greeting={greeting} color={color}>
      <OuterComponent>{children}</OuterComponent>
    </StudioBoxContextProvider>
  );
};

export default StudioBoxSymmetry;
