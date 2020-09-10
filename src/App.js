import React, { useEffect, useState} from 'react';

import logo from './logo.svg';
import './App.css';
import Menu from './MenuCard'
import ActiveListDaily from './ActiveListDaily'
import ChartPL from "./ChartPL"
import axios  from 'axios'
import SelectTr from './SelectTr'



function App() {


  return (
    <div className="App">
          {/* <div className="marketOutLook"> */}
            {/* <div className="marketChild"> */}
                {/* <Menu /> */}
            {/* </div> */}
          {/* <div className="marketChild"> */}
          {/* <ActiveListDaily /> */}
          {/* </div> */}
          {/* </div> */}
          < ChartPL/>
          <SelectTr />
    </div>
  );
}

export default App;
