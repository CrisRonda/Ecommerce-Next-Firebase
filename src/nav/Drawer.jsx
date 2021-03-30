import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import NextLink from '../components/NextLink';
import useUser from '../hooks/useUser';

const DrawerNav = ({ routes, open, handleClose }) => {
  const { user } = useUser();

  return (
    <Drawer open={open} onClose={handleClose}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        mt={4}
      >
        <Avatar src={user.photoURL} sizes="" color="secondary" />
        <Typography>{user.displayName}</Typography>
      </Box>
      <Divider />
      <List>
        {routes.map((item) => (
          <NextLink key={item.href} href={item.href}>
            <ListItem button>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label.toUpperCase()} />
            </ListItem>
          </NextLink>
        ))}
      </List>
    </Drawer>
  );
};

DrawerNav.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default DrawerNav;