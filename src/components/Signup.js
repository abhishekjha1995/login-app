import React, {useState} from "react";
import ModalPopup from './ModalPopup';
import {
  Container,
  Grid,
  IconButton,
  Button,
  Divider,
  TextField 
} from "@material-ui/core";
import {
  AccountCircle,
  Visibility,
  VisibilityOff
} from '@material-ui/icons';
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import EmailIcon from '@material-ui/icons/Email';
import FacebookIcon from '@material-ui/icons/Facebook';
import { makeStyles } from "@material-ui/core/styles";
import { 
  auth,
  generateUserDocument,
  signInWithGoogle,
  signInWithFacebook
 } from '../authentication/firebase';

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

const Signup = (props) => {
  const classes = useStyles(),
    [formData, setValues] = useState({
      displayName: '',
      email: '',
      password: '',
      showPassword: false
    }),
    toggleShowPassword = () => {
      setValues({
        ...formData,
        showPassword: !formData.showPassword
      });
    },
    handleChange = (fieldName) => (event) => {
      setValues({ ...formData, [fieldName]: event.target.value });
    },
    resetFormData = () => {
      setValues({
        displayName: '',
        email: '',
        password: '',
        showPassword: false
      });
    },
    createUser = async (event) => {
      event.preventDefault();
      const { email, password, displayName } = formData;
      try{
        const { user } = await auth.createUserWithEmailAndPassword(email, password);
        generateUserDocument(user, {displayName});
      }
      catch(error){
        console.log('Error Signing up with email and password');
      }
      resetFormData();
    };

  const getSignUpForm = () => {
    return (
      <Container maxWidth="xs">
        <form noValidate autoComplete="off">
        <Grid container spacing={1} alignItems="center" className={classes.margin2}>
            <Grid item>
              <AccountCircle fontSize="large" />
            </Grid>
            <Grid item style={{width: "75%"}}>
              <TextField
                  fullWidth required
                  id="outlined-adornment-displayName"
                  variant="outlined"
                  label="Display Name"
                  type="text"
                  value={formData.email}
                  onChange={handleChange('displayName')}
                />
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="center" className={classes.margin2}>
            <Grid item>
              <EmailIcon fontSize="large" />
            </Grid>
            <Grid item style={{width: "75%"}}>
                <TextField
                  fullWidth required
                  id="outlined-adornment-email"
                  variant="outlined"
                  label="Email"
                  type="text"
                  value={formData.email}
                  onChange={handleChange('email')}
                />
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="center" className={classes.margin2}>
          <Grid item>
              <VpnKeyRoundedIcon fontSize="large" />
            </Grid>
            <Grid item style={{width: "75%"}}>
              <TextField
                fullWidth required
                id="outlined-adornment-password"
                variant="outlined"
                label="Password"
                type={formData.showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange('password')}
                InputProps={{
                  endAdornment:
                      <IconButton onClick={toggleShowPassword} edge="end">
                        {formData.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                  }}
              />
            </Grid>
          </Grid>
          <Button 
            variant="contained"
            color="primary"
            size="large"
            className={classes.margin}
            fullWidth
            onClick={createUser}
          >
            Sign up
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
          Signup with Google
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
          Signup with Facebook
        </Button>
      </Container>
    )
  }

  return (
    <React.Fragment>
      <ModalPopup
        isDialogOpen={true}
        handleDialogClose={() => props.handleDialogClose(false)}
        dialogTitle="Sign up"
        dialogContent={getSignUpForm()}
      />
    </React.Fragment>
  );
};

export default Signup;