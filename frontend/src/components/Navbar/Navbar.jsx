import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ModeIcon from "@mui/icons-material/Mode";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    const bearerToken = localStorage.getItem("jwtToken");
    const apiUrl =
      "https://noteme-the-blog-app-backend.onrender.com/api/auth/logout";

    // Make a POST request with Authorization header
    axios
      .post(
        apiUrl,
        {},
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      )
      .then((response) => {
        // Handle the successful response here
        // console.log(response);
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("userLoggedIn");
        navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error while logging out:", error);
      });
  };

  const isUserLoggedIn = localStorage.getItem("userLoggedIn") === "true";
  return (
    <AppBar
      position="static"
      style={{
        background:
          "linear-gradient(50deg, #fc7ba8, #dabad0, #e4d6db, #f7d6e1, #fc7ba8)",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        marginBottom: "50px",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ModeIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            NoteMe
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                className="navbar-button"
                onClick={handleCloseNavMenu}
                sx={{
                  display: isUserLoggedIn ? "" : "none",
                }}
              >
                <Typography textAlign="center">
                  <Link to="/create-new-blog">POST BLOG</Link>
                </Typography>
              </MenuItem>
              <MenuItem
                className="navbar-button"
                onClick={handleCloseNavMenu}
                sx={{ display: isUserLoggedIn ? "none" : "initial" }}
              >
                <Typography textAlign="center">
                  <Link to="/auth/login">LOGIN</Link>
                </Typography>
              </MenuItem>
              <MenuItem
                className="navbar-button"
                onClick={handleCloseNavMenu}
                sx={{ display: isUserLoggedIn ? "none" : "initial" }}
              >
                <Typography textAlign="center">
                  <Link to="/auth/register">SIGN UP</Link>
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <ModeIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            NoteMe
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              className="navbar-button"
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: "white",
                display: isUserLoggedIn ? "" : "none",
              }}
            >
              <Link to="/create-new-blog">POST BLOG</Link>
            </Button>
            <Button
              className="navbar-button"
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: "white",
                display: isUserLoggedIn ? "none" : "block",
              }}
            >
              <Link to="/auth/login">LOGIN</Link>
            </Button>
            <Button
              className="navbar-button"
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: "white",
                display: isUserLoggedIn ? "none" : "block",
              }}
            >
              <Link to="/auth/register">SIGN UP</Link>
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem className="navbar-button" onClick={handleCloseUserMenu}>
                <Link to={isUserLoggedIn ? "/" : "/auth/login"}>
                  {isUserLoggedIn ? (
                    <Typography textAlign="center" onClick={handleLogout}>
                      Logout
                    </Typography>
                  ) : (
                    <Typography textAlign="center">Login</Typography>
                  )}
                </Link>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
