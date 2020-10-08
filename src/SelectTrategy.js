import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import Short from "@material-ui/icons/ExposureNeg1";
import Long from "@material-ui/icons/ExposurePlus1Sharp";
import axios from "axios";

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const [value, setValue] = React.useState("bull-put");
  const [symbolPrice, setSymbolPrice] = React.useState(0);
  const [symbol, setSymbol] = React.useState();
  const [display, setDisplay] = React.useState(false);
  const [strategy, setStrategy] = React.useState({
    type: "",
    shortPut: {
      strike: 0,
      price: 0,
    },
    longPut: {
      strike: 0,
      price: 0,
    },
    shortCall: {
      strike: 0,
      price: 0,
    },
    longCall: {
      strike: 0,
      price: 0,
    },
  });

  const handleChange = (event) => {
    setValue(event.target.value);
    setStrategy({ type: event.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleSymbolPrice = () => {
    if (symbol) {
      const form = new FormData();
      form.append("symbol", symbol);
      axios({
        method: "post",
        url: "http://127.0.0.1:5000/symbol/price",
        data: form,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
        .then(function (response) {
          //handle success
          // this.setState ( { dataPoints: response.data.dataPoints})
          console.log(response.data.quote);
          setSymbolPrice(response.data.quote);
        })
        .catch(function (response) {
          //handle error
          console.log("Error Response");
        });
    }
  };
  const handleSymbolChange = (event) => {
    setSymbol(event.currentTarget.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOption = (event) => {
    console.log(event.currentTarget.id);
  };

  const handleSubmit = () => {
    console.log("request something");
  };
  const setShortPut = (event) => {
    setStrategy({ shortPut: { strike: event.target.value } });
  };
  const setLongPut = (event) => {
    setStrategy({ longPut: { strike: event.target.value } });
  };
  const setShortCall = (event) => {
    setStrategy({ shortCall: { strike: event.target.value } });
  };
  const setLongCall = (event) => {
    setStrategy({ longCall: { strike: event.target.value } });
  };

  const setShortPutPrice = (event) => {
    setStrategy({ shortPut: { price: event.target.value } });
  };
  const setLongPutPrice = (event) => {
    setStrategy({ longPut: { price: event.target.value } });
  };
  const setShortCallPrice = (event) => {
    setStrategy({ shortCall: { price: event.target.value } });
  };
  const setLongCallPrice = (event) => {
    setStrategy({ longCall: { price: event.target.value } });
  };

  const style = {
    button: {
      margin: "1%",
    },
    display: {
      display: "none",
    },
    Nonedisplay: {
      display: "in-line",
    },
  };

  function TypeOfStrategy() {
    if (value === "bull-put") {
      return (
        <div>
          <h3> Example </h3>
          <Button
            style={style.button}
            variant="contained"
            color="secondary"
            // className={classes.button}
            startIcon={<Short />}
          >
            Sell 345 Put
          </Button>
          <Button
            style={style.button}
            variant="contained"
            color="primary"
            // className={classes.button}
            startIcon={<Long />}
          >
            Buy 340 Put
          </Button>
          <br />
          <br />
          {/*  Input text to find the symbol price */}
          <span>
            <TextField
              id="outlined-basic"
              label="Symbol"
              variant="outlined"
              onChange={(event) => handleSymbolChange(event)}
            />

            <h3> $ {symbolPrice}</h3>
          </span>

          {/*  Button sending request to get price of the symbol  */}
          <Button
            style={{ backgroundColor: "green", borderRadius: "1rem" }}
            variant="contained"
            color="primary"
            onClick={() => handleSymbolPrice()}
          >
            $ Get Price
          </Button>
          <div style={display === false ? style.Nonedisplay : style.display}>
            <TextField
              style={{ margin: "1%" }}
              type="number"
              id="outlined-basic"
              label="Short Strike Put"
              variant="outlined"
            />
            <TextField
              style={{ margin: "1%" }}
              type="number"
              id="outlined-basic"
              label="$"
              variant="outlined"
            />
            <TextField
              style={{ margin: "1%" }}
              type="number"
              id="outlined-basic"
              label="Long Strike Put"
              variant="outlined"
            />
            <TextField
              style={{ margin: "1%" }}
              type="number"
              id="outlined-basic"
              label="$"
              variant="outlined"
            />
          </div>
        </div>
      );
    }
    if (value === "bear-put") {
      return (
        <div>
          <h3> Example </h3>
          <Button
            style={style.button}
            variant="contained"
            color="primary"
            // className={classes.button}
            startIcon={<Long />}
          >
            Buy 340 Put
          </Button>
          <Button
            style={style.button}
            variant="contained"
            color="secondary"
            // className={classes.button}
            startIcon={<Short />}
          >
            Sell 345 Put
          </Button>
          <br />
          <br />
          <TextField
            style={{ margin: "1%" }}
            type="number"
            id="outlined-basic"
            label="Long Strike Put"
            variant="outlined"
            onChange={(event) => setLongPut(event)}
          />
          <TextField
            style={{ margin: "1%" }}
            type="number"
            id="outlined-basic"
            label="$"
            variant="outlined"
            onChange={(event) => setLongPutPrice(event)}
          />
          <TextField
            style={{ margin: "1%" }}
            type="number"
            id="outlined-basic"
            label="Short Strike Put"
            variant="outlined"
            onChange={(event) => setShortPut(event)}
          />
          <TextField
            style={{ margin: "1%" }}
            type="number"
            id="outlined-basic"
            label="$"
            variant="outlined"
            onChange={(event) => setShortPutPrice(event)}
          />
        </div>
      );
    }
    if (value === "bull-call") {
      return (
        <div>
          <h3> Example </h3>

          <Button
            style={style.button}
            variant="contained"
            color="primary"
            // className={classes.button}
            startIcon={<Long />}
          >
            Buy 350 Call
          </Button>
          <Button
            style={style.button}
            variant="contained"
            color="secondary"
            // className={classes.button}
            startIcon={<Short />}
          >
            Sell 350 Call
          </Button>

          <br />
          <br />
          <TextField
            style={{ margin: "1%" }}
            type="number"
            id="outlined-basic"
            label="Long Strike Call"
            variant="outlined"
          />
          <TextField
            style={{ margin: "1%" }}
            type="number"
            id="outlined-basic"
            label="$"
            variant="outlined"
          />
          <TextField
            style={{ margin: "1%" }}
            type="number"
            id="outlined-basic"
            label="Short Strike Call"
            variant="outlined"
          />
          <TextField
            style={{ margin: "1%" }}
            type="number"
            id="outlined-basic"
            label="$"
            variant="outlined"
          />
        </div>
      );
    }
    if (value === "bear-call") {
      return (
        <div>
          <h3> Example </h3>
          <Button
            style={style.button}
            variant="contained"
            color="secondary"
            // className={classes.button}
            startIcon={<Short />}
          >
            Sell 350 Call
          </Button>
          <Button
            style={style.button}
            variant="contained"
            color="primary"
            // className={classes.button}
            startIcon={<Long />}
          >
            Buy 400 Call
          </Button>

          <br />
          <br />
          <TextField
            style={{ margin: "1%" }}
            type="number"
            id="outlined-basic"
            label="Short Strike Call"
            variant="outlined"
          />
          <TextField
            style={{ margin: "1%" }}
            type="number"
            id="outlined-basic"
            label="$"
            variant="outlined"
          />
          <TextField
            style={{ margin: "1%" }}
            type="number"
            id="outlined-basic"
            label="Long Strike Call"
            variant="outlined"
          />
          <TextField
            style={{ margin: "1%" }}
            type="number"
            id="outlined-basic"
            label="$"
            variant="outlined"
          />
        </div>
      );
    }
    if (value === "iron-normal") {
      return (
        <div>
          <h3> Example </h3>
          <Button
            style={style.button}
            variant="contained"
            color="secondary"
            // className={classes.button}
            startIcon={<Short />}
          >
            Sell 200 Put
          </Button>
          <Button
            style={style.button}
            variant="contained"
            color="primary"
            // className={classes.button}
            startIcon={<Long />}
          >
            Buy 150 Put
          </Button>
          <br />
          <Button
            style={style.button}
            variant="contained"
            color="secondary"
            // className={classes.button}
            startIcon={<Short />}
          >
            Sell 350 Call
          </Button>
          <Button
            style={style.button}
            variant="contained"
            color="primary"
            // className={classes.button}
            startIcon={<Long />}
          >
            Buy 400 Call
          </Button>

          <br />
          <br />
          <TextField
            style={{ margin: "1%" }}
            type="number"
            id="outlined-basic"
            label="Short Strike Call"
            variant="outlined"
          />
          <TextField
            style={{ margin: "1%" }}
            type="number"
            id="outlined-basic"
            label="$"
            variant="outlined"
          />
          <TextField
            style={{ margin: "1%" }}
            type="number"
            id="outlined-basic"
            label="Long Strike Call"
            variant="outlined"
          />
          <TextField
            style={{ margin: "1%" }}
            type="number"
            id="outlined-basic"
            label="$"
            variant="outlined"
          />
          <TextField
            style={{ margin: "1%" }}
            type="number"
            id="outlined-basic"
            label="Short Strike Put"
            variant="outlined"
          />
          <TextField
            style={{ margin: "1%" }}
            type="number"
            id="outlined-basic"
            label="$"
            variant="outlined"
          />
          <TextField
            style={{ margin: "1%" }}
            type="number"
            id="outlined-basic"
            label="Long Strike Put"
            variant="outlined"
          />
          <TextField
            style={{ margin: "1%" }}
            type="number"
            id="outlined-basic"
            label="$"
            variant="outlined"
          />
        </div>
      );
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
        <DialogTitle id="alert-dialog-title">
          {"Please enter your trade !"}
        </DialogTitle>
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
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="bull-put"
                  control={<Radio />}
                  label="Bull Put Credit Spread (bullish)"
                />
                <FormControlLabel
                  value="bear-put"
                  control={<Radio />}
                  label="Bull Put Dedit Spread (bearish)"
                />
                <FormControlLabel
                  value="bear-call"
                  control={<Radio />}
                  label="Bull Call Credit Spread (bearish)"
                />
                <FormControlLabel
                  value="bull-call"
                  control={<Radio />}
                  label="Bull Call Dedit Spread (bullish)"
                />
                <FormControlLabel
                  value="iron-normal"
                  control={<Radio />}
                  label="Iron Condor Normal (neutral)"
                />
              </RadioGroup>
            </FormControl>
            {TypeOfStrategy()}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={(event) => {
              handleSubmit();
              handleClose();
            }}
            color="primary"
            autoFocus
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
