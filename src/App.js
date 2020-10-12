import React, { useEffect, useState } from "react";

import "./App.css";
import MenuCards from "./MenuCards";
import ActiveListDaily from "./ActiveListDaily";
import ChartPL from "./ChartPL";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import Short from "@material-ui/icons/ExposureNeg1";
import Long from "@material-ui/icons/ExposurePlus1";
import Fade from "@material-ui/core/Fade";

import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

function App() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("bull-put");
  const [symbolPrice, setSymbolPrice] = React.useState("");
  const [symbol, setSymbol] = React.useState("Ticker");
  const [profit, setProfit] = useState([]);
  const [loss, setLoss] = useState([]);
  const [titleStrategy, setTitleStrategy] = useState("Select Strategy");
  const [strategy, setStrategy] = useState({
    option: {
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
    },
  });
  const options = {
    "bull-put": "Bull Put Credit Spread",
    "bear-put": "Bear Put Debit Spread",
    "bull-call": "Bull Call Debit Spread",
    "bear-call": "Bear Call Credit Spread",
    "iron-normal": "Iron Condor",
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDropDown = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(value);
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
          if (response.data.quote !== 0) {
            setSymbolPrice("$" + response.data.quote);
          } else {
            setSymbolPrice("Not a valid ticker");
          }
        })
        .catch(function (response) {
          //handle error
          console.log("Error Response");
        });
    }
  };
  const handleSymbolChange = (event) => {
    // replace fixes bug when user enters spaces  or special characters
    //TODO mask the input so user can't even type in special characters
    setSymbol(
      event.currentTarget.value.toUpperCase().replace(/[^a-zA-Z0-9.]/g, "")
    );
  };

  const openMenu = Boolean(anchorEl);

  const handleClose = () => {
    setOpen(!open);
  };

  const handleOption = (event) => {
    console.log(event.currentTarget.id);
  };
  const handleGetItem = (event) => {
    setValue(event.currentTarget.id);
    setTitleStrategy(options[event.currentTarget.id]);
  };

  const ITEM_HEIGHT = 48;

  const handleSubmit = (event) => {
    event.preventDefault();
    const fOption = new FormData();
    fOption.append("type", value);
    fOption.append("symbol", symbol);
    fOption.append("underlyingPrice", symbolPrice);
    fOption.append("data", JSON.stringify(strategy));
    axios({
      method: "post",
      url: "http://127.0.0.1:5000/option/strategy/" + value,
      data: fOption,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        setLoss(response.data.lossDataPoints);
        setProfit(response.data.profitDataPoints);
        console.log(response.data);
      })
      .catch(function (response) {
        //handle error
        console.log("Error Response");
      });
  };

  //  ************  put section : short and long **********************
  const setShortPut = (event) => {
    const s = { ...strategy };
    s.option.shortPut.strike = event.target.value;
    setStrategy(s);
  };

  const setLongPut = (event) => {
    const s = { ...strategy };
    s.option.longPut.strike = event.target.value;
    setStrategy(s);
  };

  const setShortPutPrice = (event) => {
    const s = { ...strategy };
    s.option.shortPut.price = event.target.value;
    setStrategy(s);
  };

  const setLongPutPrice = (event) => {
    const s = { ...strategy };
    s.option.longPut.price = event.target.value;
    setStrategy(s);
  };

  //  ************ end put section : short and long **********************

  //  ************  call section : short and long **********************

  const setShortCall = (event) => {
    const s = { ...strategy };
    console.log(event.target.value);
    s.option.shortCall.strike = event.target.value;
    setStrategy(s);
  };

  const setLongCall = (event) => {
    const s = { ...strategy };
    s.option.longCall.strike = event.target.value;
    setStrategy(s);
  };

  const setShortCallPrice = (event) => {
    const s = { ...strategy };
    s.option.shortCall.price = event.target.value;
    setStrategy(s);
  };
  const setLongCallPrice = (event) => {
    const s = { ...strategy };
    s.option.longCall.price = event.target.value;
    setStrategy(s);
  };

  //  ************ end call section : short and long **********************

  const style = {
    button: {
      margin: "1%",
    },
    longButton: {
      background: "green",
      margin: "1%",
    },
    display: {
      display: "in-line",
    },
    Nonedisplay: {
      visibility: "hidden",
    },
  };

  function TypeOfStrategy() {
    if (value === "bull-put") {
      return (
        <div>
          <br />
          <br />
          {/*  Input text to find the symbol price */}
          <span>
            <TextField
              id="outlined-basic"
              label={symbol}
              variant="outlined"
              onChange={(event) => handleSymbolChange(event)}
            />

            {/*  Button sending request to get price of the symbol  */}
            <Button
              style={{
                backgroundColor: "green",
                borderRadius: "1rem",
                margin: 10,
              }}
              variant="contained"
              color="primary"
              onClick={() => handleSymbolPrice()}
            >
              Get Price
            </Button>
          </span>
          <h3>{`Current Price: ${symbolPrice}`}</h3>

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

          <div>
            <TextField
              onChange={(event) => setShortPut(event)}
              style={{ margin: "1%" }}
              type="number"
              id="outlined-basic"
              label="Short Put"
              variant="outlined"
              autoComplete="off"
            />
            <TextField
              onChange={(event) => setShortPutPrice(event)}
              style={{ margin: "1%" }}
              type="number"
              id="outlined-basic"
              label="$"
              variant="outlined"
              autoComplete="off"
            />
            <TextField
              onChange={(event) => setLongPut(event)}
              style={{ margin: "1%" }}
              type="number"
              id="outlined-basic"
              label="Long Put"
              variant="outlined"
              autoComplete="off"
            />
            <TextField
              onChange={(event) => setLongPutPrice(event)}
              style={{ margin: "1%" }}
              type="number"
              id="outlined-basic"
              label="$"
              variant="outlined"
              autoComplete="off"
            />
          </div>
        </div>
      );
    }
    if (value === "bear-put") {
      return (
        <div>
          <br />
          <br />
          {/*  Input text to find the symbol price */}
          <span>
            <TextField
              id="outlined-basic"
              label={symbol}
              variant="outlined"
              onChange={(event) => handleSymbolChange(event)}
            />

            <h3>{`Current Price: ${symbolPrice}`}</h3>
          </span>

          <Button
            style={{
              backgroundColor: "green",
              borderRadius: "1rem",
              margin: 10,
            }}
            variant="contained"
            color="primary"
            onClick={() => handleSymbolPrice()}
          >
            Get Price
          </Button>
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
          <div>
            <TextField
              style={{ margin: "1%" }}
              type="number"
              id="outlined-basic"
              label="Long Put"
              variant="outlined"
              onChange={(event) => setLongPut(event)}
              autoComplete="off"
            />
            <TextField
              style={{ margin: "1%" }}
              type="number"
              id="outlined-basic"
              label="$"
              variant="outlined"
              onChange={(event) => setLongPutPrice(event)}
              autoComplete="off"
            />
            <TextField
              style={{ margin: "1%" }}
              type="number"
              id="outlined-basic"
              label="Short Put"
              variant="outlined"
              onChange={(event) => setShortPut(event)}
              autoComplete="off"
            />
            <TextField
              style={{ margin: "1%" }}
              type="number"
              id="outlined-basic"
              label="$"
              variant="outlined"
              onChange={(event) => setShortPutPrice(event)}
              autoComplete="off"
            />
          </div>
        </div>
      );
    }
    if (value === "bull-call") {
      return (
        <div>
          <br />
          <br />
          {/*  Input text to find the symbol price */}
          <span>
            <TextField
              id="outlined-basic"
              label={symbol}
              variant="outlined"
              onChange={(event) => handleSymbolChange(event)}
            />

            <h3>{`Current Price: ${symbolPrice}`}</h3>
          </span>

          <Button
            style={{
              backgroundColor: "green",
              borderRadius: "1rem",
              margin: 10,
            }}
            variant="contained"
            color="primary"
            onClick={() => handleSymbolPrice()}
          >
            Get Price
          </Button>
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
            label="Long Call"
            variant="outlined"
            autoComplete="off"
          />
          <TextField
            style={{ margin: "1%" }}
            type="number"
            id="outlined-basic"
            label="$"
            variant="outlined"
            autoComplete="off"
          />
          <TextField
            style={{ margin: "1%" }}
            type="number"
            id="outlined-basic"
            label="Short Call"
            variant="outlined"
            autoComplete="off"
          />
          <TextField
            style={{ margin: "1%" }}
            type="number"
            id="outlined-basic"
            label="$"
            variant="outlined"
            autoComplete="off"
          />
        </div>
      );
    }
    if (value === "bear-call") {
      return (
        <div>
          <br />
          <br />
          {/*  Input text to find the symbol price */}
          <span>
            <TextField
              id="outlined-basic"
              label={symbol}
              variant="outlined"
              onChange={(event) => handleSymbolChange(event)}
            />

            <h3>{`Current Price: ${symbolPrice}`}</h3>
          </span>

          <Button
            style={{
              backgroundColor: "green",
              borderRadius: "1rem",
              margin: 10,
            }}
            variant="contained"
            color="primary"
            onClick={() => handleSymbolPrice()}
          >
            Get Price
          </Button>
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
            min="0"
            type="number"
            id="outlined-basic"
            label="Short Call"
            variant="outlined"
            autoComplete="off"
          />
          <TextField
            style={{ margin: "1%" }}
            min="0"
            type="number"
            id="outlined-basic"
            label="$"
            variant="outlined"
            autoComplete="off"
          />
          <TextField
            style={{ margin: "1%" }}
            min="0"
            type="number"
            id="outlined-basic"
            label="Long Call"
            variant="outlined"
            autoComplete="off"
          />
          <TextField
            style={{ margin: "1%" }}
            min="0"
            type="number"
            id="outlined-basic"
            label="$"
            variant="outlined"
            autoComplete="off"
          />
        </div>
      );
    }
    if (value === "iron-normal") {
      return (
        <div>
          <br />
          <br />
          {/*  Input text to find the symbol price */}
          <span>
            <TextField
              id="outlined-basic"
              label={symbol}
              variant="outlined"
              onChange={(event) => handleSymbolChange(event)}
            />

            <h3>{`Current Price: ${symbolPrice}`}</h3>
          </span>

          <Button
            style={{
              backgroundColor: "green",
              borderRadius: "1rem",
              margin: 10,
            }}
            variant="contained"
            color="primary"
            onClick={() => handleSymbolPrice()}
          >
            Get Price
          </Button>
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
            style={style.longButton}
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
            style={style.longButton}
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
            onChange={(event) => setLongCall(event)}
            style={{ margin: "1%" }}
            type="number"
            id="outlined-basic"
            label="Long Call"
            variant="outlined"
            autoComplete="off"
          />
          <TextField
            onChange={(event) => setLongCallPrice(event)}
            style={{ margin: "1%" }}
            type="number"
            id="outlined-basic"
            label="$"
            variant="outlined"
            autoComplete="off"
          />
          <TextField
            onChange={(event) => setShortCall(event)}
            style={{ margin: "1%" }}
            type="number"
            id="outlined-basic"
            label="Short Call"
            variant="outlined"
            autoComplete="off"
          />
          <TextField
            onChange={(event) => setShortCallPrice(event)}
            style={{ margin: "1%" }}
            type="number"
            id="outlined-basic"
            label="$"
            variant="outlined"
            autoComplete="off"
          />
          <TextField
            onChange={(event) => setShortPut(event)}
            style={{ margin: "1%" }}
            type="number"
            id="outlined-basic"
            label="Short Put"
            variant="outlined"
            autoComplete="off"
          />
          <TextField
            onChange={(event) => setShortPutPrice(event)}
            style={{ margin: "1%" }}
            type="number"
            id="outlined-basic"
            label="$"
            variant="outlined"
            autoComplete="off"
          />
          <TextField
            onChange={(event) => setLongPut(event)}
            style={{ margin: "1%" }}
            type="number"
            id="outlined-basic"
            label="Long Put"
            variant="outlined"
            autoComplete="off"
          />
          <TextField
            onChange={(event) => setLongPutPrice(event)}
            style={{ margin: "1%" }}
            type="number"
            id="outlined-basic"
            label="$"
            variant="outlined"
            autoComplete="off"
          />
        </div>
      );
    }
  }

  return (
    <div className="App">
      <div>
        {/* <div>
          <MenuCards />
          <ActiveListDaily />
        </div> */}
        <div style={{ textAlign: "center", marginTop: "10%" }}>
          <Button
            style={{ backgroundColor: "green", color: "black" }}
            variant="contained"
            onClick={handleClickOpen}
          >
            Option Strategy Test
          </Button>
        </div>
        <div style={style.display}>
          <ChartPL
            symbol={symbol}
            lossPoints={loss}
            profitPoints={profit}
            credit={
              strategy.option.shortPut.price - strategy.option.longPut.price
            }
            maxLoss={
              strategy.option.shortPut.strike -
              strategy.option.longPut.strike -
              (strategy.option.shortPut.price - strategy.option.longPut.price)
            }
          />
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          style={{ height: "90%" }}
        >
          <DialogTitle id="alert-dialog-title">
            {"Enter your trade"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <FormControl component="fieldset">
                {/* <FormLabel component="legend">Select Option Strategy</FormLabel> */}
                <div>
                  <Button variant="contained" onClick={handleClick}>
                    {titleStrategy}
                    <ArrowDropDownIcon />
                  </Button>
                  <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={openMenu}
                    onClose={handleCloseDropDown}
                    PaperProps={{
                      style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: "20ch",
                      },
                    }}
                  >
                    {Object.keys(options).map((key, keyIndex) => (
                      <MenuItem
                        key={options[key]}
                        selected={options[key] === "Pyxis"}
                        id={key}
                        onClick={(event) => {
                          handleGetItem(event);
                          handleCloseDropDown(event);
                        }}
                      >
                        {options[key]}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>

                {/* 
                
                
                eND TESTIN 
                
                
                */}
              </FormControl>
              {TypeOfStrategy()}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              style={(style.button, { fontSize: "initial" })}
              variant="contained"
            >
              Cancel
            </Button>
            <Button
              onClick={(event) => {
                handleSubmit(event);
                handleClose();
              }}
              style={(style.button, { fontSize: "initial" })}
              variant="contained"
              color="primary"
              // className={classes.button}
              autoFocus
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
export default App;
