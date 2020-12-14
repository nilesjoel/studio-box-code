import React, { useState, useEffect, useContext } from "react";

import TypeBox from "./TypeBox";
import axios from "axios";

import { Box, Grid, Container, Divider } from "@material-ui/core";

const uuid = require("uuid");

const initialState = { sandboxInfo: { name: "StudioBox UI v.0" } };

const StudioContext = React.createContext([{}, (p) => {}]);
const ThemeContext = React.createContext([{}, (p) => {}]);
/* Color Theme Swatches in HSLA */

const testPink = "hsla(290,100%,50%,0.3)";
const shade1 = "hsla(176, 9%, 31%, 1)";
const shade2 = "hsla(176, 62%, 66%, 1)";
const shade3 = "hsla(175, 32%, 77%, 1)";
const shade4 = "hsla(176, 80%, 20%, 1)";
const shade5 = "hsla(175, 13%, 59%, 1)";
const StudioBoxContextProvider = (props) => {
  const { greeting, color, children } = props;

  const [studioBoxContexts, setStudioBoxContexts] = useState({});

  useEffect(() => {
    // useEffect hook call which will be invoked the first time the DOM mount. it is like using componentDidMount in Class Components
    fetchStudioArtData(); // the function that will be called as soon as the DOM mounted
  }, []);

  // Fetch Symmetry Data
  async function fetchStudioArtData() {
    try {
      const quoteContext = await axios.get(
        "https://fjs17.sse.codesandbox.io/quoteBox"
      );
      console.log("quoteContext : - ", quoteContext.data);

      const studioBox = await axios.get("http://localhost:4700/studioBox/");
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
      setStudioBoxContexts(studioBoxContext);
    } catch (error) {
      console.log(error);
    }
  }

  const defaultContext = "Quote";

  // Symmetry Data List
  const contextState = {
    ...initialState,
    studioBoxContexts,
    greeting,
    color,
    defaultContext
  };
  console.log(shade3);
  return (
    <StudioContext.Provider value={contextState}>
      <ThemeContext.Provider value={{ shade1 }}>
        {/* - TODO: Add Navigation for Nested Component */}

        <TypeBox
          variant="h6"
          style={{ color: shade4 }}
          letterSpacing={-1}
          m={0}
          p={20}
          lineHeight={1}
        >
          {children}
        </TypeBox>
      </ThemeContext.Provider>
    </StudioContext.Provider>
  );
};

// STUDIO BOX COMPONENT
const OuterComponent = ({ children }) => {
  const [selectedStudioContext, setSelectedStudioContext] = useState({});

  const { sandboxInfo, studioBoxContexts, defaultContext } = useContext(
    StudioContext
  );
  const [selectedContextName, setSelectedContextName] = useState(
    defaultContext
  );
  useEffect(() => {
    // useEffect hook call which will be invoked the first time the DOM mount. it is like using componentDidMount in Class Components
    fetchStudioArtData(); // the function that will be called as soon as the DOM mounted
  }, []);

  // Fetch Symmetry Data
  async function fetchStudioArtData() {
    try {
      const content = await axios.get(
        "http://localhost:4700/studioBox/" + selectedContextName.toLowerCase()
      );
      if (content.data && content.data.length === 1) {
        console.log(selectedContextName, "[Data", content.data);
        setSelectedStudioContext(content.data[0].context.projects);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSelectContext = async (context) => {
    console.log(context.split(" ")[0]);
    setSelectedContextName(context.split(" ")[0]);
    // await fetchStudioArtData();
    console.log("loaded");
    try {
      const content = await axios.get(
        "http://localhost:4700/studioBox/" + context.split(" ")[0].toLowerCase()
      );
      if (content.data && content.data.length === 1) {
        console.log(selectedContextName, "[Data", content.data);
        setSelectedStudioContext(content.data[0].context.projects);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const buildArtImage = (files) => {
    console.log("files", files);
    let imageFiles = [];
    if (files && files.map) {
      imageFiles = files.map((data, idx) => {
        const filePath =
          "https://www.nilesjoel.com/studio-art/projects/" +
          data.project +
          "/" +
          data.name;
        return (
          <Box key={idx}>
            {data.title}
            <img src={filePath} alt={data.title} width="500" height="600" />
          </Box>
        );
      });
    }

    return imageFiles;
  };
  const buildMusicBox = (variations) => {
    const buildVariation = (idx, data) => {
      let variationSamples = [];
      if (data.samples && data.samples.map) {
        variationSamples = data.samples.map((data, idx) => {
          // console.log(idx,data);
          return data.name + " " + data.file;
        });
      }

      const filePath = "";
      return variationSamples;
    };

    let variationFiles = [];
    if (variations && variations.map) {
      variationFiles = variations.map((data, idx) => {
        return buildVariation(idx, data);
      });
    }

    return variationFiles;
  };
  const buildQuoteBox = (quotes) => {
    console.log("quotes", quotes);
    let quoteSegments = [];
    if (quotes && quotes.map) {
      console.log("Selected Studio Context", selectedStudioContext);
      quoteSegments = quotes.map((data, idx) => {
        return data.words;
      });
    }
    return quoteSegments;
  };

  console.log("dd", selectedStudioContext);
  // Symmetry Data List
  let studioArtContexts = [];
  if (selectedStudioContext && selectedStudioContext.map) {
    console.log("Selected Studio Context", selectedStudioContext);
    studioArtContexts = selectedStudioContext.map((data, idx) => {
      console.log(data, idx);
      return (
        <Grid item key={idx}>
          <Divider variant="middle" />
          <Box m={2} p={1} className="data-item">
            {data.name}

            {buildArtImage(data.files)}
            {buildMusicBox(data.variations)}
            {buildQuoteBox(data.segments)}
            {/* Before Middle After Middle */}
          </Box>
        </Grid>
      );
    });
  }
  console.log("studioBoxContexts", studioBoxContexts);
  return (
    <Container>
      <TypeBox
        variant="h3"
        color="primary"
        letterSpacing={-4}
        m={1}
        lineHeight={1}
        alignment="right"
        // lettering={["d"]}
      >
        {sandboxInfo.name}
      </TypeBox>

      {studioBoxContexts["contexts"] &&
        studioBoxContexts.contexts.map &&
        studioBoxContexts.contexts.map((data, idx) => {
          return (
            <TypeBox
              key={idx}
              variant="h3"
              color="primary"
              letterSpacing={-6}
              m={2}
              lineHeight={0.5}
              alignment="right"
              // lettering={["d"]}
            >
              <Box key={idx} onClick={() => handleSelectContext(data)}>
                {data}
              </Box>
            </TypeBox>
          );
        })}

      <Divider variant="middle" />

      {children}

      <TypeBox
        variant="h3"
        color="primary"
        letterSpacing={-6}
        m={10}
        lineHeight={1}
        alignment="right"
        // lettering={["d"]}
      >
        {selectedContextName}
      </TypeBox>

      <TypeBox
        alignment="right"
        variant="h3"
        letterSpacing={6}
        m={3}
        p={4}
        lineHeight={1}
        style={{ backgroundColor: "silver" }}
      >
        <Box onClick={() => handleSelectContext("Arty")}>
          {selectedContextName}
        </Box>
      </TypeBox>

      <TypeBox
        variant="h6"
        color="textPrimary"
        letterSpacing={16}
        m={7}
        lineHeight={3}
      >
        {"Projects"}
      </TypeBox>

      <Divider variant="middle" />
      {studioArtContexts}
    </Container>
  );
};

const MiddleComponent = ({ children, breaths }) => {
  // console.log("breaths", breaths);
  let studioContext = useContext(StudioContext);
  // console.log("studioContext]", studioContext);
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
  // console.log("themeContext]", themeContext);
  return (
    <Box style={{ backgroundColor: themeContext.color }}>
      <TypeBox>{greeting}</TypeBox>
      <Box>{children}</Box>
    </Box>
  );
};

export { StudioBoxContextProvider, OuterComponent };
