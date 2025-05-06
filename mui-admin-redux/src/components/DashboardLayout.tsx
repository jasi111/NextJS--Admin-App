"use client";
import type { ReactNode } from "react";
import {
    CssBaseline,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    AppBar,
    Toolbar,
    Typography,
    Box,
    ListItemIcon,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import CategoryModal from "../components/CategoryModal";
import AddBoxIcon from "@mui/icons-material/AddBox";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const handleCategoryAdded = () => {
        console.log("Category added successfully!");
    
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6">Admin Dashboard</Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: 240,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: 240,
                        boxSizing: "border-box",
                        marginTop: "64px",
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <List>
                    <ListItem disablePadding sx={{ marginLeft: "9px", marginTop: "10px" }}>
                        <ListItemIcon sx={{ minWidth: "30px" }}>
                            <InventoryIcon sx={{ color: "#1976D2", fontSize: "24px" }} />
                        </ListItemIcon>
                        <ListItemText primary="Manage Products" />
                    </ListItem>
                    <ListItem disablePadding sx={{ marginLeft: "20px", marginTop: "20px" }}>
                        <ListItemButton component={Link} href="/dashboard/products/add-product">
                            <ListItemIcon sx={{ minWidth: "30px" }}>
                                <AddBoxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Add Product" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ marginLeft: "20px", marginTop: "20px" }}>
                        <ListItemButton component={Link} href="/dashboard/products/view-product">
                            <ListItemIcon sx={{ minWidth: "30px" }}>
                                <VisibilityIcon />
                            </ListItemIcon>
                            <ListItemText primary="View Products" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ marginLeft: "-10px", marginTop: "30px" }}>
                        <ListItemButton onClick={handleOpenModal}>
                            <ListItemIcon sx={{ minWidth: "30px" }}>
                                <CategoryIcon sx={{ color: "#1976D2", fontSize: "24px" }} />
                            </ListItemIcon>
                            <ListItemText primary="Manage Category" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: "background.default",
                    p: 3,
                    marginTop: "64px",
                }}
            >
                {children}
            </Box>
            <CategoryModal
                open={isModalOpen}
                handleClose={handleCloseModal}
                handleCategoryAdded={handleCategoryAdded}
            />
        </Box>
    );
}
