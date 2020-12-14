import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import { Box, Grid, Container, Typography } from "@material-ui/core";

const initialState = { sandboxInfo: { name: "ArtBox UI v.0" } };

const StudioContext = React.createContext([{}, (p) => {}]);
const ThemeContext = React.createContext([{}, (p) => {}]);

const StudioArtContextProvider = (props) => {
  const { greeting, color, children } = props;

  const [studioBox, setStudioBox] = useState({});

  useEffect(() => {
    // useEffect hook call which will be invoked the first time the DOM mount. it is like using componentDidMount in Class Components
    fetchStudioArtData(); // the function that will be called as soon as the DOM mounted
  }, []);

  // Fetch Symmetry Data
  async function fetchStudioArtData() {
    try {
      const studioBox = await axios.get("http://localhost:4700/studioBox");
      const contexts = await axios.get(
        "http://localhost:4700/studioBox/contexts"
      );

      let studioBoxContext = {};
      if (contexts.data && studioBox.data) {
        studioBoxContext = {
          contexts: contexts.data,
          studioBox: studioBox.data
        };
      }
      setStudioBox(studioBoxContext);
    } catch (error) {
      console.log(error);
    }
  }

  // Symmetry Data List
  const contextState = { ...initialState, studioBox, greeting, color };

  return (
    <StudioContext.Provider value={contextState}>
      <ThemeContext.Provider value={{ color }}>
        {contextState.sandboxInfo.name}{" "}
        {/* - TODO: Could Add Navigation for Nested Component */}
        {children}
      </ThemeContext.Provider>
    </StudioContext.Provider>
  );
};

const OuterComponent = ({ children }) => {
  const [studioArtData, setStudioArtData] = useState({});

  const studioBoxContext = useContext(StudioContext);

  console.log("studioBoxContext", studioBoxContext);

  useEffect(() => {
    // useEffect hook call which will be invoked the first time the DOM mount. it is like using componentDidMount in Class Components
    fetchStudioArtData(); // the function that will be called as soon as the DOM mounted
  }, []);

  // Fetch Symmetry Data
  async function fetchStudioArtData() {
    try {
      // Replace with dynamic sequence id
      // const content = await axios.get("http://localhost:4500/sequence/default");
      const content = await axios.get("http://localhost:4700/studioBox/art");
      setStudioArtData(content.data);
      console.log("Data", content.data);
    } catch (error) {
      console.log(error);
    }
  }
  // Symmetry Data List
  let studioArtContexts = [];
  console.log();
  if (studioArtData.contexts && studioArtData.contexts.map) {
    studioArtContexts = studioArtData.contexts.map((data, idx) => {
      return (
        <Grid item key={idx}>
          <Box m={2} p={1} className="data-item">
            <Typography variant="overline">
              <Box letterSpacing={26} m={3}>
                {data.title}
              </Box>
            </Typography>
            Before Middle
            <MiddleComponent breaths={studioArtData}>
              The Middle Component
              {studioArtContexts}
            </MiddleComponent>
            After Middle
            <Typography variant="overline">
              <Box fontStyle="oblique" px={2} className="box-item">
                <h1>
                  {data.breathCount} {data.start.title} {data.end.title}
                </h1>
              </Box>
            </Typography>
          </Box>
        </Grid>
      );
    });
  }

  let sequenceList = [];
  console.log();
  if (studioArtData.sequence && studioArtData.sequence.map) {
    sequenceList = studioArtData.sequence.map((data, idx) => {
      return (
        <Grid item key={idx}>
          <Box m={2} p={1} className="data-item">
            <Typography variant="overline">
              <Box letterSpacing={26} m={3}>
                {data.title}
              </Box>
            </Typography>
            Before Middle
            <MiddleComponent breaths={studioArtData}>
              The Middle Component
              {sequenceList}
            </MiddleComponent>
            After Middle
            <Typography variant="overline">
              <Box fontStyle="oblique" px={2} className="box-item">
                <h1>
                  {data.breathCount} {data.start.title} {data.end.title}
                </h1>
              </Box>
            </Typography>
          </Box>
        </Grid>
      );
    });
  }

  return (
    <Container>
      Before{children} AFTER & BEFORE {sequenceList}
      {studioArtContexts}
    </Container>
  );
};

const MiddleComponent = ({ children, breaths }) => {
  // console.log("breaths", breaths);
  let studioContext = useContext(StudioContext);
  console.log("studioContext]", studioContext);
  return (
    <Box>
      <span>Before Inner</span>
      <InnerComponent>Inner {children} Component</InnerComponent>
      <span>After Inner</span>
    </Box>
  );
};
const InnerComponent = ({ children }) => {
  let studioContext = useContext(StudioContext);
  let { greeting } = studioContext;
  // console.log("studioContext", studioContext);
  let themeContext = useContext(ThemeContext);
  console.log("themeContext]", themeContext);
  return (
    <Box style={{ backgroundColor: themeContext.color }}>
      <Box>
        <Typography>{greeting}</Typography>
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};

export { StudioArtContextProvider, OuterComponent };
