import GitHubIcon from '@mui/icons-material/GitHub';
import ThemeIcon from '@mui/icons-material/InvertColors';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';

import { FlexBox } from '@/components/styled';
import { authorWebsite, repository, title } from '@/config';
import useHotKeysDialog from '@/store/hotkeys';
// import useNotifications from '@/store/notifications';
import useSidebar from '@/store/sidebar';
import useTheme from '@/store/theme';

import { HotKeysButton } from './styled';
// import { getRandomJoke } from './utils';
import { useNavigate } from 'react-router-dom';
import isMobile from '@/utils/is-mobile';
import { useMediaQuery } from '@mui/material';

import { useTheme as useThemeMUI } from '@mui/material';

function Header() {
  const [, sidebarActions] = useSidebar();
  const [theme, themeActions] = useTheme();
  // const [, notificationsActions] = useNotifications();
  const [, hotKeysDialogActions] = useHotKeysDialog();

  // function showNotification() {
  //   notificationsActions.push({
  //     options: {
  //       // Show fully customized notification
  //       // Usually, to show a notification, you'll use something like this:
  //       // notificationsActions.push({ message: ... })
  //       // `message` accepts string as well as ReactNode
  //       // If you want to show a fully customized notification, you can define
  //       // your own `variant`s, see @/sections/Notifications/Notifications.tsx
  //       variant: 'customNotification',
  //     },
  //     message: getRandomJoke(),
  //   });
  // }

  const navigate = useNavigate();
  const muiTheme = useThemeMUI();
  const IsMd = useMediaQuery(muiTheme.breakpoints.up('md'));

  return (
    <Box sx={{ flexGrow: 1 }} data-pw={`theme-${theme}`}>
      <AppBar color="transparent" elevation={1} position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <FlexBox sx={{ alignItems: 'center' }}>
            <IconButton
              onClick={sidebarActions.toggle}
              size="large"
              edge="start"
              color="primary"
              aria-label="menu"
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
            <Button
              onClick={() => navigate('/')}
              color="primary"
              sx={{
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}
            >
              {title}
            </Button>
          </FlexBox>
          <FlexBox>
            <FlexBox>
              {IsMd && (
                <FlexBox marginRight={2}>
                  <Button LinkComponent={'a'} href={authorWebsite} target="_blank">
                    About me
                  </Button>
                </FlexBox>
              )}
              {IsMd && !isMobile && (
                <Tooltip title="Hot keys" arrow>
                  <HotKeysButton
                    size="small"
                    variant="outlined"
                    aria-label="open hotkeys dialog"
                    onClick={hotKeysDialogActions.open}
                  >
                    ALT + K
                  </HotKeysButton>
                </Tooltip>
              )}
            </FlexBox>
            <Divider orientation="vertical" flexItem />
            <Tooltip title="Github repository" arrow>
              <IconButton
                color="primary"
                size="large"
                component="a"
                href={repository}
                target="_blank"
              >
                <GitHubIcon />
              </IconButton>
            </Tooltip>
            <Divider orientation="vertical" flexItem />
            <Tooltip title="Switch theme" arrow>
              <IconButton
                color="primary"
                edge="end"
                size="large"
                onClick={themeActions.toggle}
                data-pw="theme-toggle"
              >
                <ThemeIcon />
              </IconButton>
            </Tooltip>
          </FlexBox>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
