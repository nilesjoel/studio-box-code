import React from "react";

import {
  StudioArtContextProvider,
  OuterComponent
} from "../../components/contexts/StudioArtContext";

const StudioArtSymmetry = (props) => {
  // const { classes } = props;
  const { greeting, color } = props;

  return (
    <StudioArtContextProvider greeting={greeting} color={color}>
      <OuterComponent> aqwertyui</OuterComponent>
    </StudioArtContextProvider>
  );
};

export default StudioArtSymmetry;
