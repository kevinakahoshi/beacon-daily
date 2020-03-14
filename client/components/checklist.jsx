import React from 'react';
import ChecklistItems from './checklist-items';
import CreateChecklistItem from './create-checklist-item';
import ModalOverlay from './modal-overlay';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

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
    }),
    backgroundColor: theme.palette.type === 'dark'
      ? theme.palette.background.paper
      : theme.primary
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
    marginRight: theme.spacing(4)
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
    width: 0,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1, 3)
    },
    [theme.breakpoints.up('xs')]: {
      padding: theme.spacing(0, 2)
    },
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3)
    },
    [theme.breakpoints.up('xs')]: {
      padding: theme.spacing(2)
    }
  },
  menuOptions: {
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(1, 3)
    }
  },
  pointer: {
    cursor: 'pointer'
  },
  titleNoWrap: {
    whiteSpace: 'nowrap'
  }
}));

const Checklist = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [view, setView] = React.useState('incomplete');
  const [fade, setFade] = React.useState('fade-in');
  const [filteredList, setFilteredList] = React.useState([]);
  const [mounting, setMounting] = React.useState('mounting');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const leavePage = () => {
    setFade('fade-out');
    setMounting('unmounting');
    setTimeout(() => {
      props.history.push('/');
    }, 1000);
  };

  const toggleView = newView => {
    if (view !== newView) {
      handleDrawerClose();
      setMounting('unmounting');
      setTimeout(() => {
        setView(newView);
        setMounting('mounting');
      }, 1000);
    }

    if (newView === 'completed' || newView === 'incomplete') {
      props.getChecklistItems(props.user.userid);
      window.scrollTo(0, 0);
    }
  };

  const filterList = () => {
    setFilteredList(props.checklist.filter(checklistItem => checklistItem.iscompleted === (view === 'completed')));
  };

  React.useEffect(() => {
    filterList();
    window.scrollTo(0, 0);
  }, [view, props.checklist]);

  return (
    <div
      className={`${classes.root} ${fade}`}>
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
            className={`${classes.pointer} ${classes.titleNoWrap}`}
            onClick={leavePage}>
            {props.user
              ? `Hello, ${props.user.firstname}!`
              : 'Your Daily Planner'}
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
        <div
          className={classes.toolbar}>
          <WbIncandescentOutlinedIcon />
          <Typography
            variant="h6">
            Beacon Daily
          </Typography>
          <IconButton
            onClick={handleDrawerClose}>
            {theme.direction === 'rtl'
              ? <ChevronRightIcon />
              : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            className={classes.menuOptions}
            onClick={() =>
              view !== 'create'
                ? toggleView('create')
                : null}>
            <ListItemIcon>
              <AddBoxOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Add New Item" />
          </ListItem>
          <ListItem
            button
            className={classes.menuOptions}
            onClick={() =>
              view !== 'incomplete'
                ? toggleView('incomplete')
                : null}>
            <ListItemIcon>
              <CheckBoxOutlineBlankOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary="View Incomplete" />
          </ListItem>
          <ListItem
            button
            className={classes.menuOptions}
            onClick={() =>
              view === 'completed'
                ? null
                : toggleView('completed')}>
            <ListItemIcon>
              <CheckBoxOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary="View Completed" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            button
            onClick={() => {
              props.toggleColorMode();
              handleDrawerClose();
            }}
            className={classes.menuOptions}>
            <ListItemIcon>
              {props.colorMode === 'light'
                ? <Brightness4Icon />
                : <Brightness7Icon />}
            </ListItemIcon>
            <ListItemText
              primary={props.colorMode === 'light'
                ? 'Dark Mode'
                : 'Light Mode'}>
            </ListItemText>
          </ListItem>
          <ListItem
            button
            className={classes.menuOptions}
            onClick={() => {
              handleDrawerClose();
              props.logoutUser(props.history);
              setFade('fade-out');
            }}>
            <ListItemIcon>
              <ExitToAppOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Sign Out" />
          </ListItem>
        </List>
      </Drawer>
      <main
        className={`${classes.content} ${props.componentStatus}`}>
        <div
          className={classes.toolbar} />
        {view === 'create'
          ? <CreateChecklistItem
            newItem={props.createChecklistItem}
            handleModalOpen={props.handleModalOpen}
            setModalMessage={props.setModalMessage}
            toggleView={toggleView}
            mounting={mounting} />
          : <ChecklistItems
            mounting={mounting}
            view={view}
            updateChecklistItem={props.updateChecklistItem}
            toggleComplete={props.toggleComplete}
            checklist={filteredList}
            handleDeleteClick={props.handleDeleteClick}
            classes={classes} />}
        {props.modalOpen
          ? <ModalOverlay
            deleting={props.deleting}
            deleteId={props.deleteId}
            deleteChecklistItem={props.deleteChecklistItem}
            modalOpen={props.modalOpen}
            handleModalClose={props.handleModalClose}
            modalMessage={props.modalMessage} />
          : null}
      </main>
    </div>
  );
};

export default Checklist;
