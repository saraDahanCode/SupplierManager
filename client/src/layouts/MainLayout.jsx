import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../components/Topbar.jsx";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Typography,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InboxIcon from "@mui/icons-material/Inbox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";

import { Link } from 'react-router-dom';


const drawerWidth = 250;

export default function MainLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  let user = useSelector((state) => state.user.userDetails);

  const handleMenuClick = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);

  const drawerStyle = {
    width: drawerWidth,
    boxSizing: "border-box",
    position: "fixed",
    top: 0,
    height: "100vh",
    backgroundColor: "#fff",
    zIndex: 1310,
  };
  const DrawerHeader = (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row-reverse", // הוספת שורה זו
        padding: "12px 16px 8px 16px",
        borderBottom: "1px solid #eee",
        minHeight: 56,
      }}
    >
      <Typography variant="h6" sx={{ fontSize: "1.1rem", color: "#333" }}>

      </Typography>
      <IconButton onClick={handleDrawerClose} aria-label="Close menu">
        <CloseIcon />
      </IconButton>
    </Box>
  );
  const SupplierDrawer = (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={handleDrawerClose}
      ModalProps={{ keepMounted: true }}
      PaperProps={{ sx: drawerStyle }}
    >
      {DrawerHeader}
      <Divider />
      <List sx={{ paddingTop: 0 }}>
        <Link to="/supplier/orders" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItemButton onClick={handleDrawerClose}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="כל ההזמנות" />
          </ListItemButton>
        </Link>

        <Link to="/supplier/products" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItemButton onClick={handleDrawerClose}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="המוצרים שלי" />
          </ListItemButton>
        </Link>

        <Link to="/supplier/products/add" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItemButton onClick={handleDrawerClose}>
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText primary="הוסף מוצר" />
          </ListItemButton>
        </Link>

        <Link to="/supplier/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItemButton onClick={handleDrawerClose}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="הפרופיל שלי" />
          </ListItemButton>
        </Link>
      </List>
    </Drawer>
  );
  const OwnerDrawer = (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={handleDrawerClose}
      ModalProps={{ keepMounted: true }}
      PaperProps={{ sx: drawerStyle }}
    >
      {DrawerHeader}
      <Divider />
      <List sx={{ paddingTop: 0 }}>
        <Link to="/admin/orders" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItemButton onClick={handleDrawerClose}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="כל ההזמנות" />
          </ListItemButton>
        </Link>

        <Link to="/admin/orders/new" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItemButton onClick={handleDrawerClose}>
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText primary="הוסף הזמנה" />
          </ListItemButton>
        </Link>
      </List>

    </Drawer>
  );

  
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        zIndex: 0,
      }}
    >
      <Topbar onMenuClick={handleMenuClick} username={user.companyName || user.name} />
      {user.role === "admin" ? OwnerDrawer : SupplierDrawer}

      <Box
        className="content-wrapper"
        sx={{
          flexGrow: 1,
          marginTop: "64px", // גובה ה-Topbar
          marginBottom: "56px", // גובה הפוטר
          position: "relative",
          zIndex: 0,
        }}
      >
        <Outlet />
      </Box>

   
    </Box>
  );
}
