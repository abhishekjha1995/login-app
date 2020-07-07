import React, {useState} from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
	Button,
	Menu,
	MenuItem,
	Avatar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { makeStyles } from '@material-ui/core/styles';
import { auth } from "../authentication/firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = (props) => {
	const classes = useStyles(),
		[anchorEl, toggleMenu] = useState(null),
		{ displayName, photoURL } = props.loggedInUser || {};

	return (
		<AppBar position="static">
			<Toolbar>
				<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" className={classes.title}>Login-App</Typography>
				{
						props.loggedInUser ?
					(
							<React.Fragment>
							<IconButton
								aria-label="toggle password visibility"
								onClick={(event) => toggleMenu(event.currentTarget)}
								edge="end"
							>
								<Avatar src={photoURL} >
									{displayName.split(" ").map(word => word ? word[0].toUpperCase() : "")}
								</Avatar>
								<ArrowDropDownIcon style={{color: "white"}} />
							</IconButton>
							<Menu
								id="simple-menu"
								anchorEl={anchorEl}
								open={Boolean(anchorEl)}
								onClose={() => toggleMenu(null)}
								elevation={0}
								getContentAnchorEl={null}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'center',
								}}
							>
								<MenuItem onClick={() => {
									toggleMenu(null);
									auth.signOut();
								}}
								>
									Logout
								</MenuItem>
							</Menu>
						</React.Fragment>
					) :
					(
						<React.Fragment>
							<Button color="inherit" onClick={() => props.handleLoginPopup(true)}>Login</Button>
							<Button color="secondary" onClick={() => props.handleSignupPopup(true)}>Sign up</Button>
						</React.Fragment>
					)
				}
			</Toolbar>
		</AppBar>
	)
}

export default Header;