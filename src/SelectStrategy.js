import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
// import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function ControlledOpenSelect() {
  const classes = useStyles();
  const [Value, setValue] = React.useState("");
  const [TypeOption, setOption] = React.useState("");

  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  function TypeStrategy() {
    if (Value == 30 || Value == 40 || Value == 10 || Value == 20) {
      return (
        <div>
          <TextField
            id="standard-basic"
            label={"Short Strike " + TypeOption}
            variant="outlined"
          />
          <TextField id="outlined-basic" label="$" variant="outlined" />
          <TextField
            id="standard-basic"
            label={"Long Strike " + TypeOption}
            variant="outlined"
          />
          <TextField id="outlined-basic" label="$" variant="outlined" />
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            aria-label="add"
            className={classes.margin}
          >
            <NavigationIcon className={classes.extendedIcon} />
            Submit
          </Fab>
        </div>
      );
    }

    return <div> {""}</div>;
  }
  return (
    <div>
      {/* <Button className={classes.button} onClick={handleOpen}>
        Select Strategy 
      </Button> */}

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Options</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={Value}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em> None</em>
          </MenuItem>
          <MenuItem value={10}>Bull Put Credit Spread </MenuItem>
          <MenuItem value={20}>Bull Call Debit Spread</MenuItem>
          <MenuItem value={30}>Bear Call Credit Spread</MenuItem>
          <MenuItem value={40}>Bear Put Debit Spread </MenuItem>
        </Select>
        <TypeStrategy />
        {/* <TextField  id="standard-basic" label= {"Short Strike " + TypeOption} variant="outlined" />
            <TextField  id="outlined-basic" label="$" variant="outlined" />
            <TextField  id="standard-basic" label={"Long Strike " + TypeOption}  variant="outlined" />
            <TextField  id="outlined-basic" label="$" variant="outlined" />
            <Fab
              variant="extended"
              size="medium"
              color="primary"
              aria-label="add"
              className={classes.margin}
         

            >
              <NavigationIcon className={classes.extendedIcon}  />
                  Submit
            </Fab> 
              */}
      </FormControl>

      <br />
    </div>
  );
}
