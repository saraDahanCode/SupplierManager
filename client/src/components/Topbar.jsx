
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function Topbar({ onMenuClick, username }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userDetails);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleCompanyClick = () => {
    if (user?.role === "admin") {
      navigate("/admin/dashboard");
    } else if (user?.role === "supplier") {
      navigate("/supplier/dashboard");
    }
  };

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  
  const handleBackToLogin = () => {
    navigate("/");
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 120 }}
      className="topbar"
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 2,
          direction: "ltr",
        }}
      >
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, textAlign: "left", order: 0, cursor: "pointer" }}
          onClick={handleCompanyClick}
        >
          GrocerySpace
        </Typography>

        {username && (
          <>
            <Typography
              variant="subtitle1"
              onClick={handleUserClick}
              sx={{
                order: 1,
                marginRight: 2,
                whiteSpace: "nowrap",
                cursor: "pointer",
              }}
            >
              Hello, {username}
            </Typography>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
         
            </Menu>
          </>
        )}

        <Button
          variant="outlined"
          color="inherit"
          onClick={handleBackToLogin}
          sx={{
            order: 3,
            borderColor: "white",
            color: "white",
            fontSize: "0.8rem",
            padding: "4px 10px",
            textTransform: "none",
          }}
        >
        החלפת משתמש
        </Button>

        <IconButton
          color="inherit"
          edge="end"
          onClick={onMenuClick}
          aria-label="menu"
          sx={{ order: 2 }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
