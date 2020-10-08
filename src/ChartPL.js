import CanvasJSReact from './asset/canvasjs-3.0/canvasjs.react.js';
import   React, {Component, useEffect, useState} from 'react'; 
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SelectStrategy from './SelectStrategy'
import SelectTr from './SelectTr'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';

//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;





const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));


export default function ChartPL ( props) {
    const [ profit1, setProfit] = useState ([])
    const [ loss1, setLoss] = useState ([])
    const [symbol1, setSymbol] = useState("")
    var form = new FormData();
    const classes = useStyles();
    const loss = props.lossPoints
    const profit = props.profitPoints
    const credit  = props.credit.toFixed(2)
    const maxLoss = props.maxLoss.toFixed(2)
    const symbol = props.symbol
    function BasicTextFields() {

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField  hidden id="standard-basic" label="Standard" />
            <TextField id="filled-basic" label="Filled" variant="filled" />
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </form>
        );
    }
  

       
      const options = {
			theme: "dark2",
			animationEnabled: true,
			exportEnabled: true,
			title:{
				text: symbol
            },
       subtitles: [{
              text: "Credit: $" + credit
              },
              {
              text: "Max Loss: $" + (maxLoss*100)
              }],
			axisY: {
				title: "Profit/Loss",
				suffix: "$"
			},
			// axisX: {
			// 	valueFormatString: "MMM YYYY"
			// },
			data: [
			  { 
            type: "rangeSplineArea",
            xValueFormatString: "Profit",
            yValueFormatString: "#0.## ",
            toolTipContent: " <span style=\"color:#6D78AD\">{x}</span><br><b>$</b> {y[0]}<br><b>Strike:</b> {y[2]}",
            dataPoints: profit
        },
        {
            type: "rangeSplineArea",
            xValueFormatString: "Loss",
            yValueFormatString: "#0.## ",
            toolTipContent: " <span style=\"color:#6D78AD\">{x}</span><br><b>$</b> {y[1]}<br><b>Strike:</b> {y[2]}",
            dataPoints: loss
        }
        
        ]
            
     }

     return (
        <div  style = {{ width: "70%", margin: "10%"}}className= "chartPLContainer">
         
          <CanvasJSChart options = {options}
              /* onRef = {ref => this.chart = ref} */
          />
        </div>
      );
    }
  