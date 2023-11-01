/**
=========================================================
* NextJS Material Dashboard 2 PRO - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard-pro
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect, useCallback } from "react";

// import Link from "next/link";
import { useRouter } from "next/router";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDInput from "/components/MDInput";
import MDBadge from "/components/MDBadge";

// NextJS Material Dashboard 2 PRO examples
import Breadcrumbs from "/examples/Breadcrumbs";
import NotificationItem from "/examples/Items/NotificationItem";
import { useAuth } from "hooks/use-auth";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarDesktopMenu,
  navbarMobileMenu,
} from "/examples/Navbars/DashboardNavbar/styles";

// NextJS Material Dashboard 2 PRO context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "/context";
import ProductAutocomplete from "/pagesComponents/dashboards/analytics/components/ProductAutocomplete";

function DashboardNavbar({ absolute, light, isMini, setSearchText }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const [tempText, setTempText] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    miniSidenav,
    transparentNavbar,
    fixedNavbar,
    openConfigurator,
    darkMode,
  } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useRouter().pathname.split("/").slice(1);

  // listen for pressed enter key and set search text only when enter is pressed
  // document.addEventListener('keyup', (e) => {
  //   if (e.key === 'Enter') {
  //     console.log('Navbar - ' + e.target.value);
  //     // setSearchText(tempText);
  //   }
  // });
  // document.addEventListener('keydown', (e) => {
  //   if (e.key === 'Enter') {
  //     console.log('Navbar - ' + e.target.value);
  //     // setSearchText(tempText);
  //   }
  // });

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(
        dispatch,
        (fixedNavbar && window.scrollY === 0) || !fixedNavbar,
      );
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  // const { anchorEl, onClose, open } = props;

  const auth = useAuth();
  const router = useRouter();

  const handleSignOut = useCallback(
    () => {
      // onClose?.();
      auth.signOut();
      router.push('/authentication/sign-in/basic');
    },
    [auth, router]
  );

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      {/* <NotificationItem icon={<Icon>email</Icon>} title="Check new messages" />
      <NotificationItem
        icon={<Icon>podcasts</Icon>}
        title="Manage Podcast sessions"
      /> */}
      <NotificationItem
        icon={<Icon>logout</Icon>}
        title="Log Out"
        onClick={handleSignOut}
      />
    </Menu>
  );



  // Styles for the navbar icons
  const iconsStyle = ({
    palette: { dark, white, text },
    functions: { rgba },
  }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  useEffect(() => {
    console.log('Navbar - ' + tempText);
  }, [tempText]);

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) =>
        navbar(theme, { transparentNavbar, absolute, light, darkMode })
      }
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox
          color="inherit"
          mb={{ xs: 1, md: 0 }}
          sx={(theme) => navbarRow(theme, { isMini })}
        >
          {/* <Breadcrumbs
            icon="home"
            title={route[route.length - 1]}
            route={route}
            light={light}
          /> */}
          <IconButton
            sx={navbarDesktopMenu}
            onClick={handleMiniSidenav}
            size="small"
            disableRipple
          >
            <Icon fontSize="medium" sx={iconsStyle}>
              {!miniSidenav ? "menu_open" : "menu"}
            </Icon>
          </IconButton>
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox pr={22}>
              {/* replace with OMS / Product name search to filter products */}
              {/* input searchText here */}
              {/* ADD AUTOCOMPLETE HERE */}
              {/* <MDInput label="Search here" value={tempText} onChange={(e) => {
                // setSearchText(e.target.value);
                setTempText(e.target.value);
              }} /> */}
              <ProductAutocomplete
                // setProductName={setTempText}
                setSelectedProduct={tempText => setTempText(tempText)}
              // setLog={() => { }
              // }
              />
            </MDBox>
            <MDBox>
              {/* icon for search */}
              {/* if loading then set icon to Loading */}
              {/* if not loading then set icon to search */}

              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                onClick={() => {
                  setLoading(true);
                  setSearchText(tempText)
                  setTimeout(() => {
                    setLoading(false);
                  }
                    , 1000);
                }
                }
              >
                {loading ? <Icon sx={iconsStyle}>hourglass_empty</Icon> : <Icon sx={iconsStyle}>search</Icon>}
              </IconButton>
            </MDBox>
            <MDBox color={light ? "white" : "inherit"}>
              {/* <Link href="/authentication/sign-in/basic" passHref> */}
              <IconButton size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}>
                <Icon sx={iconsStyle}>account_circle</Icon>
                {renderMenu()}
              </IconButton>
              {/* </Link> */}
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon sx={iconsStyle} fontSize="medium">
                  {!miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
              {/* <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
                <Icon sx={iconsStyle}>settings</Icon>
              </IconButton> */}
              {/* <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                <MDBadge badgeContent={9} color="error" size="xs" circular>
                  <Icon sx={iconsStyle}>notifications</Icon>
                </MDBadge>
              </IconButton> */}
              {renderMenu()}
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
