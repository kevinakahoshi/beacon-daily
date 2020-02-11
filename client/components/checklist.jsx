import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import WbIncandescentOutlinedIcon from '@material-ui/icons/WbIncandescentOutlined';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 3),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  menuOptions: {
    padding: theme.spacing(1, 3)
  },
  quoteWeather: {
    whiteSpace: 'normal'
  }
}));

function Checklist(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [viewCompleted, setViewCompleted] = React.useState(false);
  const [mounting, setMounting] = React.useState('mounting');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleView = bool => {
    setMounting('unmounting');
    setTimeout(() => {
      setViewCompleted(bool);
      setMounting('mounting');
    }, 1000);
  };

  let checklistItems = <Box
    p={2}
    my={2}
    border={1}
    borderRadius={5}
    borderColor="grey.500">
    <h3>You have no to-do items!</h3>
  </Box>;

  if (props.checklist.length) {
    if (viewCompleted) {
      checklistItems = props.checklist.map((checklistItem, index) => {
        if (checklistItem.iscompleted) {
          return (
            <Box
              p={2}
              my={2}
              border={1}
              borderRadius={5}
              borderColor="grey.500"
              key={index}
              className={mounting}>
              <h3>{checklistItem.checklistitem}</h3>
            </Box>
          );
        }
      });
    } else {
      checklistItems = props.checklist.map((checklistItem, index) => {
        if (!checklistItem.iscompleted) {
          return (
            <Box
              p={2}
              my={2}
              border={1}
              borderRadius={5}
              borderColor="grey.500"
              key={index}
              className={mounting}>
              <h3>{checklistItem.checklistitem}</h3>
            </Box>
          );
        }
      });
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}>
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            onClick={() => props.history.push('/')}>
            Your Daily Planner
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}>
        <div className={classes.toolbar}>
          <WbIncandescentOutlinedIcon />
          <Typography variant="h6">
            Beacon Daily
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            className={classes.menuOptions}>
            <ListItemIcon>
              <AddBoxOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Add New To-Do" />
          </ListItem>
          <ListItem
            button
            className={classes.menuOptions}
            onClick={() => toggleView(false)}>
            <ListItemIcon>
              <CheckBoxOutlineBlankOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="View Incomplete" />
          </ListItem>
          <ListItem
            button
            className={classes.menuOptions}
            onClick={() => toggleView(true)}>
            <ListItemIcon>
              <CheckBoxOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="View Completed" />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {checklistItems}
      </main>
    </div>
  );
}

export default Checklist;
