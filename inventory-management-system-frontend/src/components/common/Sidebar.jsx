import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Divider,
  Box,
  Typography
} from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  PointOfSale as SalesIcon,
  Assessment as ReportsIcon,
  Settings as SettingsIcon,
  Category as CategoryIcon
} from '@mui/icons-material';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Products', icon: <InventoryIcon />, path: '/products' },
  { text: 'Categories', icon: <CategoryIcon />, path: '/categories' },
  { text: 'Sales', icon: <SalesIcon />, path: '/sales' },
  { text: 'Reports', icon: <ReportsIcon />, path: '/reports' },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const handleListItemClick = (path) => {
    navigate(path);
  };

  const filteredMenuItems = menuItems.filter((item) => {
    if (item.path === '/products' || item.path === '/') {
      return user && (user.role === 'ROLE_ADMIN' || user.role === 'ROLE_USER');
    }
    if (item.path === '/sales') {
      return user && user.role === 'ROLE_USER';
    }
    if (item.path === '/reports' || item.path === '/categories') {
      return user && user.role === 'ROLE_ADMIN';
    }
    return true;
  });

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#2d3748',
          color: 'white',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" component="div">
          IMS
        </Typography>
      </Box>
      <Divider />
      <List>
        {filteredMenuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleListItemClick(item.path)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'white' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ position: 'absolute', bottom: 0, width: '100%', p: 2 }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: 'white' }}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;