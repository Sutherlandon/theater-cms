import React from 'react';
import { BrowserRouter, Link, Switch, Redirect, Route } from 'react-router-dom';
import { 
  AppBar,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import MoviesIcon from '@material-ui/icons/Theaters';
import AboutIcon from '@material-ui/icons/Help';
import UsersIcon from '@material-ui/icons/PeopleAlt';
import HomeIcon from '@material-ui/icons/Home';
import Movies from './movies';
import Users from './users';

import backgroundImage from '../images/IMG_7137.JPG';

const useHeaderStyles = makeStyles((theme) => ({
  menuButton: {
    color: 'whitesmoke',
  },
  gradient: {
    backgroundImage: theme.palette.fadedGradient,
    backgroundImage: `${theme.palette.fadedGradient}, url(${backgroundImage})`,
    backgroundPosition: 'top center',
    backgroundSize: 'cover',
    height: '100%',
    paddingTop: '0.001em',
  },
}));

function Header({ toggleDrawer }) {
  const classes = useHeaderStyles();
  return (
    <AppBar>
      <Toolbar className={classes.gradient}>
        <Hidden mdUp>
          <IconButton onClick={toggleDrawer}>
            <MenuIcon fontSize='large' className={classes.menuButton} />
          </IconButton>
        </Hidden>
        <Typography variant='h4'>Theater CMS Admin</Typography>
      </Toolbar>
    </AppBar>
  );
}

// function Menu() {
//   return (
//     <nav className="nav flex-column">
//       <a className="nav-link" href="/admin">Movies</a>
//       <a className="nav-link" href="/">About</a>
//       <a className="nav-link" href="/">Users</a>
//       <style>{`
//         .nav-link {
//           color: whitesmoke;
//           border-bottom: solid 1px #555;
//           border-radius: 0px;
//         }
//         .nav-link:hover {
//           color: #212529;
//           background-color: whitesmoke;
//         }
//       `}</style>
//     </nav>
//   )
// }

const useMenuStyles = makeStyles({
  drawerPaper: {
    marginTop: 64,
    width: 240,
  }
});


function Menu({ open }) {
  const classes = useMenuStyles();
  
  return (
    <Drawer
      variant='persistent'
      anchor='left'
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <List>
        <ListItem button component={Link} to='/'>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText>Site</ListItemText>
        </ListItem>
        <Divider />
        <ListItem button component={Link} to='/admin/movies'>
          <ListItemIcon><MoviesIcon /></ListItemIcon>
          <ListItemText>Movies</ListItemText>
        </ListItem>
        <Divider />
        <ListItem button component={Link} to='/admin/about'>
          <ListItemIcon><AboutIcon /></ListItemIcon>
          <ListItemText>About</ListItemText>
        </ListItem>
        <Divider />
        <ListItem button component={Link} to='/admin/users'>
          <ListItemIcon><UsersIcon /></ListItemIcon>
          <ListItemText>Users</ListItemText>
        </ListItem>
        <Divider />
      </List>
    </Drawer>
  );
}

const useAdminStyles = makeStyles({
  main: {
    marginTop: 64,
    marginLeft: 240,
  }
});

function Admin(props) {
  const classes = useAdminStyles();
  const [open, setOpen] = React.useState(true);
  const toggleDrawerOpen = () => setOpen(!open);

  return (
    <div>
      <Header toggleDrawer={toggleDrawerOpen} />
      <Menu open={open} />
      <main className={classes.main}>
        <BrowserRouter>
          <Switch>
            <Route path='/admin/movies' component={Movies} />
            <Route path='/admin/users' component={Users} />
            <Redirect to='/admin/movies' />
          </Switch>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default Admin;