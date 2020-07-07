import React, {useState} from "react";
import {
  Container,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Divider,
  Typography
} from "@material-ui/core";
import {
  AccountCircle,
  Visibility,
  VisibilityOff
} from '@material-ui/icons';
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import FacebookIcon from '@material-ui/icons/Facebook';
import ModalPopup from './ModalPopup';
import { makeStyles } from "@material-ui/core/styles";
import { signInWithGoogle, signInWithFacebook } from '../authentication/firebase';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  margin2: {
    margin: theme.spacing(2)
  },
  padding: {
    padding: theme.spacing(2)
  }
}));

const Login = (props) => {
  const classes = useStyles(),
    [values, setValues] = useState({
      username: '',
      password: '',
      showPassword: false
    }),
    toggleShowPassword = () => {
      setValues({
        ...values,
        showPassword: !values.showPassword
      });
    },
    handleChange = (fieldName) => (event) => {
      setValues({ ...values, [fieldName]: event.target.value });
    };

  const getLoginForm = () => {
    return (
      <Container maxWidth="xs">
        <form noValidate autoComplete="off">
          <Grid container spacing={1} alignItems="center" className={classes.margin2}>
            <Grid item>
              <AccountCircle fontSize="large" />
            </Grid>
            <Grid item style={{width: "75%"}}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-username">Username or Email</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-username"
                  type="text"
                  value={values.username}
                  onChange={handleChange('username')}
                  labelWidth={140}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="center" className={classes.margin2}>
            <Grid item>
              <VpnKeyRoundedIcon fontSize="large" />
            </Grid>
            <Grid item style={{width: "75%"}}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  labelWidth={70}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={toggleShowPassword}
                        edge="end"
                      >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
          <Button 
            variant="contained"
            color="primary"
            size="large"
            className={classes.margin}
            fullWidth
            onClick={() => alert(true)}
          >
            Login
          </Button>
        </form>
        <Divider />
        <Button
          variant="outlined"
          color="default"
          size="large"
          className={classes.margin}
          fullWidth
          startIcon={<AccountCircle fontSize="large" />}
          onClick={signInWithGoogle}
        >
          Login with Google
        </Button>
        <Button
          variant="outlined"
          color="default"
          size="large"
          className={classes.margin}
          fullWidth
          startIcon={<FacebookIcon color="primary" fontSize="large" />}
          onClick={signInWithFacebook}
        >
          Login with Facebook
        </Button>
        <Typography align="center">Forgot password?</Typography>
      </Container>
    )
  }

  return (
    <ModalPopup
      isDialogOpen={true}
      handleDialogClose={() => props.handleDialogClose(false)}
      dialogTitle="Login"
      dialogContent={getLoginForm()}
    />
  );
};

export default Login;