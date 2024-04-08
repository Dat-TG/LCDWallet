import { Link } from 'react-router-dom';

import DefaultIcon from '@mui/icons-material/Deblur';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import routes from '@/routes';
import useSidebar from '@/store/sidebar';
import { authorWebsite } from '@/config';
import { InfoOutlined } from '@mui/icons-material';

function Sidebar() {
  const [isSidebarOpen, sidebarActions] = useSidebar();

  return (
    <SwipeableDrawer
      anchor="left"
      open={isSidebarOpen}
      onClose={sidebarActions.close}
      onOpen={sidebarActions.open}
      disableBackdropTransition={false}
      swipeAreaWidth={30}
      data-pw="sidebar"
    >
      <List sx={{ width: 250, pt: (theme) => `${theme.mixins.toolbar.minHeight}px` }}>
        <ListItem sx={{ p: 0, m: 0 }} disablePadding>
          <ListItemText
            sx={{ p: 2 }}
            primary="LCDWallet"
            primaryTypographyProps={{
              variant: 'h6',
              sx: {
                textAlign: 'center',
                color: 'primary.main',
                fontWeight: 'bold',
              },
            }}
          />
        </ListItem>
        <ListItem sx={{ p: 0 }}>
          <ListItemButton
            component={Link}
            to="/"
            onClick={sidebarActions.close}
            selected={window.location.pathname === '/'}
          >
            <ListItemIcon>
              <DefaultIcon />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ p: 0 }}>
          <ListItemButton
            component={Link}
            to={authorWebsite}
            target="_blank"
            onClick={sidebarActions.close}
          >
            <ListItemIcon>
              <InfoOutlined />
            </ListItemIcon>
            <ListItemText>About me</ListItemText>
          </ListItemButton>
        </ListItem>
        {Object.values(routes)
          .filter((route) => route.title)
          .map(({ path, title, icon: Icon }) => (
            <ListItem sx={{ p: 0 }} key={path}>
              <ListItemButton
                component={Link}
                to={path as string}
                onClick={sidebarActions.close}
                selected={window.location.pathname === path}
              >
                <ListItemIcon>{Icon ? <Icon /> : <DefaultIcon />}</ListItemIcon>
                <ListItemText>{title}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </SwipeableDrawer>
  );
}

export default Sidebar;
