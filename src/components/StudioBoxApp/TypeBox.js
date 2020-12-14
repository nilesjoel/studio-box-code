import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { capitalize } from "@material-ui/core";
import { Typography as MuiTypography } from "@material-ui/core";
import { Box } from "@material-ui/core";

// variant
// 'h1'
// | 'h2'
// | 'h3'
// | 'h4'
// | 'h5'
// | 'h6'
// | 'subtitle1'
// | 'subtitle2'
// | 'body1'
// | 'body2'
// | 'caption'
// | 'button'
// | 'overline'
// | 'srOnly'
// | 'inherit'

//   align
// 'inherit'
// | 'left'
// | 'center'
// | 'right'
// | 'justify'

const styles = (theme) => ({
  letteringH2Center: {
    height: 4,
    width: 73,
    display: "block",
    margin: `${theme.spacing(1)}px auto 0`,
    backgroundColor: theme.palette.secondary.main
  },
  letteringH3Center: {
    height: 4,
    width: 55,
    display: "block",
    margin: `${theme.spacing(1)}px auto 0`,
    background: theme.palette.secondary.main
  },
  letteringH4Center: {
    height: 4,
    width: 55,
    display: "block",
    margin: `${theme.spacing(1)}px auto 0`,
    backgroundColor: theme.palette.secondary.main
  },
  letteringH6Left: {
    height: 2,
    width: 28,
    display: "block",
    marginTop: theme.spacing(0.5),
    background: "currentColor"
  }
});
const letteringMapping = {};
const variantMapping = {
  h1: "h1",
  h2: "h1",
  h3: "h1",
  h4: "h1",
  h5: "h3",
  h6: "h2",
  subtitle1: "h3"
};

function TypeBox(props) {
  const {
    children,
    classes,
    alignment = false,
    lettering = false,
    variant,
    // color,
    // key,
    ...other
  } = props;
  console.log("color", other);
  return (
    <MuiTypography variantMapping={variantMapping} variant={variant}>
      <Box {...other}>
        {children}
        {alignment ? (
          <span
            className={
              classes[`lettering${capitalize(variant) + capitalize(alignment)}`]
            }
          />
        ) : null}
      </Box>
    </MuiTypography>
  );
}

TypeBox.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  lettering: PropTypes.array,
  alignment: PropTypes.oneOf([false, "center", "left", "right"]),
  variant: PropTypes.string,
  color: PropTypes.any
};

export default withStyles(styles)(TypeBox);
