import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import classes from "../mainLayout.module.css";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import SearchModal from "../../components/SearchModal";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import MenuBar from "../../components/MenuBar";
import HeroSlider from "../../components/HeroSlider";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function LoginLayout(props) {
  const history = useHistory();

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar style={{ backgroundColor: "#1f1b2e" }}>
          <Toolbar>
            <Typography className={classes.logo}>
              <MenuBar className={classes.burgerMenu} />
              <Link to="/">
                <MenuBookIcon
                  className={classes.menuBookIcon}
                  fontSize="large"
                />
              </Link>
            </Typography>
            <div className={classes.nav__content}>
              <div className={classes.top__menu}>
                <Link
                  style={({ textDecoration: "none" }, { color: "white" })}
                  to="/"
                >
                  <Typography variant="h6">Главное</Typography>
                </Link>
                {/* <Typography variant="h6">Книги</Typography> */}
                {/* <Typography variant="h6">Авторы</Typography> */}
                {/* <Typography variant="h6">Жанры</Typography> */}
              </div>
              <div className={classes.top__menu2}>
                <SearchModal />
                <Link to="/login">
                  <AccountCircleOutlinedIcon className={classes.accountIcon} />
                </Link>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <main style={{ backgroundColor: "#0f0d19" }}>
        <Container>
          {props.children}
          {/* <Fab
            onClick={() => history.push("/products/create")}
            className={classes.addBtn}
            color="secondary"
            aria-label="add"
          >
            <AddIcon />
          </Fab> */}
        </Container>
      </main>
    </React.Fragment>
  );
}
