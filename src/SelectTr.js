import React from 'react';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField'
import Short from '@material-ui/icons/ExposureNeg1';
import Long from '@material-ui/icons/ExposurePlus1Sharp';

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const [value, setValue] = React.useState("bull-put");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOption = (event) => {
      console.log (event.currentTarget.id)
  }

  const style = {
        button: {
            margin: "1%"
        }
  }
  function  TypeOfStrategy (){
      if ( value == "bull-put" ){
          return (  
            <div>
            <h3> Example </h3>
            <Button
                style= {style.button}
                variant="contained"
                color="secondary"
                // className={classes.button}
                startIcon={< Short />}
            >
                Sell 345 Put
            </Button>
            <Button
                style= {style.button}
                variant="contained"
                color="primary"
                // className={classes.button}
                startIcon={<Long />}
            >
                Buy 340 Put
            </Button>
            <br/>
            <br/>
            <TextField id="outlined-basic" label="Short Strike Put" variant="outlined" />
            <TextField id="outlined-basic" label="$" variant="outlined" />
            <TextField id="outlined-basic" label="Long Strike Put" variant="outlined" />
            <TextField id="outlined-basic" label="$" variant="outlined" />
            </div>
          )
      }
      if ( value == "bear-put" ){
        return (  
          <div>
          <h3> Example </h3>
          <Button
              style= {style.button}
              variant="contained"
              color="primary"
              // className={classes.button}
              startIcon={<Long />}
          >
              Buy 340 Put
          </Button>
          <Button
              style= {style.button}
              variant="contained"
              color="secondary"
              // className={classes.button}
              startIcon={< Short />}
          >
              Sell 345 Put
          </Button>
          <br/>
          <br/>
          <TextField id="outlined-basic" label="Long Strike Put" variant="outlined" />
          <TextField id="outlined-basic" label="$" variant="outlined" />
          <TextField id="outlined-basic" label="Short Strike Put" variant="outlined" />
          <TextField id="outlined-basic" label="$" variant="outlined" />
          </div>
        )
    }
    if ( value == "bull-call" ){
        return (  
          <div>
          <h3> Example </h3>
         
        <Button
            style= {style.button}
            variant="contained"
            color="primary"
            // className={classes.button}
            startIcon={<Long />}
        >
            Buy 400 Call
        </Button>
        <Button
            style= {style.button}
            variant="contained"
            color="secondary"
            // className={classes.button}
            startIcon={< Short />}
        >
            Sell 350 Call
        </Button>
       
          <br/>
          <br/>
          <TextField id="outlined-basic" label="Long Strike Call" variant="outlined" />
          <TextField id="outlined-basic" label="$" variant="outlined" />
          <TextField id="outlined-basic" label="Short Strike Call" variant="outlined" />
          <TextField id="outlined-basic" label="$" variant="outlined" />
          </div>
        )
    }
    if ( value == "bear-call" ){
      return (  
        <div>
        <h3> Example </h3>
        <Button
            style= {style.button}
            variant="contained"
            color="secondary"
            // className={classes.button}
            startIcon={< Short />}
        >
            Sell 350 Call
        </Button>
        <Button
            style= {style.button}
            variant="contained"
            color="primary"
            // className={classes.button}
            startIcon={<Long />}
        >
            Buy 400 Call
        </Button>
       
        <br/>
        <br/>
        <TextField id="outlined-basic" label="Short Strike Call" variant="outlined" />
        <TextField id="outlined-basic" label="$" variant="outlined" />
        <TextField id="outlined-basic" label="Long Strike Call" variant="outlined" />
        <TextField id="outlined-basic" label="$" variant="outlined" />
        </div>
        
      )
    }
    if ( value == "iron-normal" ){
        return (  
          <div>
          <h3> Example </h3>
          <Button
                style= {style.button}
                variant="contained"
                color="secondary"
                // className={classes.button}
                startIcon={< Short />}
            >
                Sell 200 Put
            </Button>
            <Button
                style= {style.button}
                variant="contained"
                color="primary"
                // className={classes.button}
                startIcon={<Long />}
            >
                Buy 150 Put
            </Button>
            <br/>
            <Button
                 style= {style.button}
                variant="contained"
                color="secondary"
            // className={classes.button}
                startIcon={< Short />}
        >
            Sell 350 Call
        </Button>
        <Button
            style= {style.button}
            variant="contained"
            color="primary"
            // className={classes.button}
            startIcon={<Long />}
        >
            Buy 400 Call
        </Button>
       
         
          <br/>
          <br/>
          <TextField id="outlined-basic" label="Short Strike Call" variant="outlined" />
          <TextField id="outlined-basic" label="$" variant="outlined" />
          <TextField id="outlined-basic" label="Long Strike Call" variant="outlined" />
          <TextField id="outlined-basic" label="$" variant="outlined" />
          <TextField id="outlined-basic" label="Short Strike Put" variant="outlined" />
          <TextField id="outlined-basic" label="$" variant="outlined" />
          <TextField id="outlined-basic" label="Long Strike Put" variant="outlined" />
          <TextField id="outlined-basic" label="$" variant="outlined" />
        </div>)
  }
}







  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Please enter your trade !"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {/* <ButtonGroup
        orientation="vertical"
        color="primary"
        aria-label="vertical contained primary button group"
        variant="contained"
      >
        <Button color="secondary" id= {1} onClick= { (event) => handleOption (event)}>Bull Put Credit Spread</Button>
        <Button >Bull Put Debit Spread</Button>
        <Button color="secondary">Bull Call Credit Spread</Button>
        <Button>Bull Call Dedit Spread</Button>

      </ButtonGroup> */}
        <FormControl component="fieldset">
            <FormLabel component="legend">Option Strategy</FormLabel>
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                <FormControlLabel value="bull-put" control={<Radio />} label="Bull Put Credit Spread (bullish)"/> 
                <FormControlLabel value="bear-put" control={<Radio />} label="Bull Put Dedit Spread (bearish)" /> 
                <FormControlLabel value="bull-call" control={<Radio />} label="Bull Call Credit Spread (bearish)" />
                <FormControlLabel value="bear-call" control={<Radio />} label="Bull Call Dedit Spread (bullish)" />
                <FormControlLabel value="iron-normal" control={<Radio />} label="Iron Condor Normal (neutral)" />

            </RadioGroup>
        </FormControl>
             { TypeOfStrategy () }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
