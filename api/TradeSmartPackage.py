

import requests
import json
import numpy as np


data = ' '
with open('./credential.json', 'r') as outfile:
    data = json.load(outfile)


def BEAR_PUT_SPREAD(shortPut, longPut, currentPrice, bidShort, bidLong):
    '''
        DIRECTIONAL : bearish
        SET UP:   long a put + short a put at lower strike from your short strike
        RISK: defined risk , max-loss is what you give up for collateral
        DELTA:  looking to sell both call and put in 25 delta
        RECEIVE: credit
        Structure Return :
        {x : x-coordinate, y : [ price - credits,  0] }
    '''

    # compute credit for this strategy
    # follow structure given by TDAmeritrade  API
    #

    strategy = None
    dataPoint = []
    dataPoint2 = []

    # calculate credit in 100 shares
    shortPut = int(shortPut)
    longPut = int(longPut)
    currentPrice = int(currentPrice)
    bidShort = float(bidShort) * 100
    bidLong = float(bidLong) * 100
    credit = int(bidShort - bidLong)
    maxLoss = shortPut - longPut
    maxLoss = maxLoss * 100
    maxLoss = maxLoss - credit
    breakEvenLoss = int(shortPut - (credit / 100))
    breakEvenProfit = int(shortPut - (credit/100))
    creditY = 0
    lossY = 0
    while breakEvenLoss >= 0:

        if creditY >= credit:
            dataPoint2.append({"x": breakEvenProfit, "y": [
                              0, credit, breakEvenProfit]})
            dataPoint.append(
                {"x": breakEvenLoss, "y": [lossY, 0, breakEvenLoss]})
        elif creditY <= credit:
            dataPoint2.append({"x": breakEvenProfit, "y": [
                              0, creditY, breakEvenProfit]})
            dataPoint.append({"x": breakEvenLoss, "y": [
                             lossY, 0,  breakEvenLoss]})

        lossY -= 1
        creditY += 1
        breakEvenLoss -= 1
        breakEvenProfit += 1

    return (dataPoint2, dataPoint)


def BEAR_CALL_SPREAD(shortStrike, longStrike, date):
    (fromDate, toDate) = date
    '''
        DIRECTIONAL : bullish
        SET UP:   short a put + buy a put at lower strike from your short strike
        RISK: defined risk , max-loss is what you give up for collateral
        DELTA:  looking to sell both call and put in 25 delta
        RECEIVE: credit
    '''
    strategy = None
    dataPoint = []
    return strategy


def getStockPrice(symbol):
    URL = data["finHubAPI"].format(symbol)
    r = requests.get(URL)
    r = r.json()
    print(r)
    return r.get("c")


def getIC(longCall, shortCall, shortPut, longPut, stockPrice):
    '''
    Arguments example passing in:
        longCall =  ( strike, price )
        shortCall =  ( strike, price )
        shortPut = (strike, price)
        longPut = ( strike, price)
    Math for this Iron Condor
        Premium received =  credit spread premium  + put spread credit
        max loss = the width of strikes - credit received
    '''
    lossDataPoints = []
    profitDataPoints = []

    # coonvert string values to np.array
    longCall = np.array([longCall["strike"], longCall["price"]])
    longCall = np.asfarray(longCall, float)

    shortCall = np.array([shortCall["strike"], shortCall["price"]])
    shortCall = np.asfarray(shortCall, float)

    longPut = np.array([longPut["strike"], longPut["price"]])
    longPut = np.asfarray(longPut, float)

    shortPut = np.array([shortPut["strike"], shortPut["price"]])
    shortPut = np.asfarray(shortPut, float)

    # credit calculate
    credits = np.subtract(
        shortCall[1], longCall[1]) + np.subtract(shortPut[1], longPut[1])

    # determine the widest wing either put or call side
    widestWing = np.maximum(
        (longCall[0] - shortCall[0]), (shortPut[0] - longPut[0]))

    # determine max loss, maxloss  = widest wing - credit received
    maxloss = np.multiply(np.subtract(widestWing, credits), -100)
    print(maxloss)

    # within the max profit zone between 2 short strikes

    # profit inthe side put
    profitDownSide = credits
    priceAction = shortPut[0]

    while profitDownSide >= 0:
        profitDataPoints.append(
            {"x": priceAction, "y": [profitDownSide * 100, 0, priceAction]})
        profitDownSide -= 1
        priceAction -= 1

    # max profit in between 2 short strike put and call

    priceAction = shortPut[0]
    while priceAction <= shortCall[0]:
        profitDataPoints.append(
            {"x": priceAction, "y": [credits*100, 0, priceAction]})
        priceAction += 1

    # profit in the call side
    profitUpSide = credits
    priceAction = shortCall[0]
    while profitUpSide >= 0:
        profitDataPoints.append(
            {"x": priceAction, "y": [profitUpSide * 100, 0, priceAction]})
        profitUpSide -= 1
        priceAction += 1

    # loss in the put side

    lossDownside = 0
    zeroZoneProfit = shortPut[0] - credits

    while zeroZoneProfit >= 300:
        if zeroZoneProfit <= longPut[0]:
            lossDataPoints.append(
                {"x": zeroZoneProfit, "y": [maxloss, 0, zeroZoneProfit]})
        else:
            lossDataPoints.append(
                {"x": zeroZoneProfit, "y": [lossDownside*100, 0, zeroZoneProfit]})
        lossDownside -= 1
        zeroZoneProfit -= 1

    lossUpside = 0
    zeroZoneProfit = shortCall[0] + credits

    while zeroZoneProfit <= np.multiply(shortCall[0], 1.02):
        if zeroZoneProfit <= longCall[0]:
            lossDataPoints.append(
                {"x": zeroZoneProfit, "y": [maxloss, 0, zeroZoneProfit]})
        else:
            lossDataPoints.append(
                {"x": zeroZoneProfit, "y": [lossUpside*100, 0, zeroZoneProfit]})
        lossUpside -= 1
        zeroZoneProfit += 1

    sorted_loss = sorted(lossDataPoints, key=lambda x: x["x"])
    sorted_profit = sorted(profitDataPoints, key=lambda x: x["x"])

    return (sorted_profit, sorted_loss)


if __name__ == "__main__":
    print(getStockPrice("TSLA"))
