import os
import TradeSmartPackage as Trade
from flask import Flask, request
import ast
import json
from flask_cors import CORS
import ast


app = Flask(__name__)
CORS(app)


@app.route('/', methods=['GET', 'POST'])
def hello():
    return "Hello"


@app.route('/optionTable', methods=['GET', 'POST'])
def table():
    date = request.form.get("date")
    contractType = request.form.get("contractType")
    return {"optionTable": Trade.optionTable(date, contractType)}


@app.route('/option/strategy/bull-put', methods=['GET', 'POST'])
def bullPutData():
    '''
    example: form data request
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


    '''
    dictionary = request.form.to_dict()
    dictionary = ast.literal_eval(dictionary.get("data"))
    dictionary = dictionary.get("option")
    print(dictionary.get("option"))

    shortStrike = dictionary.get("shortPut").get("strike")
    longStrike = dictionary.get("longPut").get("strike")
    symbol = request.form.get("symbol")
    bidShort = dictionary.get("shortPut").get("price")
    bidLong = dictionary.get("longPut").get("price")
    underlyingPrice = request.form.get("underlyingPrice")
    bullPutSpreadLoss, bullPutSpreadProfit = Trade.BULL_PUT_SPREAD(int(float(shortStrike)), int(
        float(longStrike)), int(float(underlyingPrice)), float(bidShort), float(bidLong))
    # return  {"dataPoints": bullPutSpread}

    return {"profitDataPoints": bullPutSpreadProfit, "lossDataPoints": bullPutSpreadLoss, "symbol": symbol}


@app.route('/option/strategy/bear-put', methods=['GET', 'POST'])
def bearPutData():
    '''
    example: form data request
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


    '''
    dictionary = request.form.to_dict()
    dictionary = ast.literal_eval(dictionary.get("data"))
    dictionary = dictionary.get("option")
    print(dictionary.get("option"))

    shortStrike = dictionary.get("shortPut").get("strike")
    longStrike = dictionary.get("longPut").get("strike")
    symbol = request.form.get("symbol")
    bidShort = dictionary.get("shortPut").get("price")
    bidLong = dictionary.get("longPut").get("price")
    underlyingPrice = request.form.get("underlyingPrice")
    bullPutSpreadLoss, bullPutSpreadProfit = Trade.BEAR_PUT_SPREAD(int(float(shortStrike)), int(
        float(longStrike)), int(float(underlyingPrice)), float(bidShort), float(bidLong))
    # return  {"dataPoints": bullPutSpread}

    return {"profitDataPoints": bullPutSpreadProfit, "lossDataPoints": bullPutSpreadLoss, "symbol": symbol}


@app.route('/symbol/price', methods=['GET', 'POST'])
def getPrice():
    return {"quote": Trade.getStockPrice(request.form.get("symbol"))}


@app.route('/example', methods=['GET', 'POST'])
def example():
    print(request.form)
    return "something"


@app.route('/option/strategy/iron-normal', methods=['GET', 'POST'])
def ironCondorNormal():
    dictionary = request.form.to_dict()
    dictionary = ast.literal_eval(dictionary.get("data"))
    dictionary = dictionary.get("option")
    print(dictionary)

    ICProfit, ICLoss = Trade.getIC(dictionary.get("longCall"), dictionary.get("shortCall"), dictionary.get(
        "shortPut"), dictionary.get("longPut"), dictionary.get("underlyingPrice"))
    return {"profitDataPoints": ICProfit, "lossDataPoints": ICLoss, "symbol":  dictionary.get("symbol")}
