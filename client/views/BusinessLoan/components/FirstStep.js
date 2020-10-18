import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import {Col, Row} from 'react-bootstrap';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  button : {
	padding : "20px"
  },
  inner: {
	//   variant:'outlined',
	minWidth: 800,
	justifyContent: 'center',
	paddingLeft: '40px'
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end',
    backgroundColor: 'white'
  },
  table: {
	// flex: 'center',
	flexDirection:'column',
	height:'1000px'
  },
  form : {
	  minWidth:'1000px'
  },
  paper : {
	  alignItems: 'center'
  }

}));
// Destructure props
const FirstStep = ({
    handleNext,
    handleChange,
	values: { firstName, lastName, age, gender, phone }
}) => {
	const classes = useStyles();

	return (
    <Container className={classes.paper}>
      <Row>
        <div className={classes.inner}>
          <TextField
            className={classes.form}
            variant="outlined"
            label="First Name"
            name="firstName"
            placeholder="Your first name"
            defaultValue={firstName}
            onChange={handleChange('firstName')}
            margin="normal"
            required
          />
        </div>
        <div className={classes.inner}>
          <TextField
            className={classes.form}
            variant="outlined"
            label="Last Name"
            name="lastName"
            placeholder="Your last name"
            defaultValue={lastName}
            onChange={handleChange('lastName')}
            margin="normal"
            required
          />
        </div>
      </Row>
      <div className={classes.inner}>
        <TextField
          className={classes.form}
          label="Age"
          variant="outlined"
          name="age"
          placeholder="Your Age"
          type="number"
          defaultValue={age}
          onChange={handleChange('age')}
          margin="normal"
          required
        />
      </div>
      <div className={classes.inner}>
        <FormControl
          className={classes.form}
          variant="outlined"
          placeholder="lol"
          margin="normal">
          <InputLabel htmlFor="gender">Gender</InputLabel>
          <Select label="Gender" value={gender} onChange={handleChange('gender')}>
            <MenuItem value={'Male'}>Male</MenuItem>
            <MenuItem value={'Female'}>Female</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes.inner}>
        <TextField
          className={classes.form}
          label="Phone Number"
          variant="outlined"
          name="phone"
          placeholder="Your Phone Number"
          defaultValue={phone}
          onChange={handleChange('phone')}
          margin="normal"
          required
        />
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: 50,
          justifyContent: 'flex-end',
          padding: '10px'
        }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}>
          Next
        </Button>
      </div>
    </Container>
  );
};

export default FirstStep;
