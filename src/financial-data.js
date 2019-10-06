const data = [
    {
        ticker: 'AAPL',
        delta: 200000,
        spot: 200
    },
    {
        ticker: 'FB',
        delta: 40000,
        spot: 80
    },
    {
        ticker: 'MSFT',
        delta: 250000,
        spot: 185
    },
    {
        ticker: 'GOOG',
        delta: 120000,
        spot: 400
    },
    {
        ticker: 'AMZN',
        delta: 25000,
        spot: 135
    },
    {
        ticker: 'T',
        delta: 258000,
        spot: 310
    }
]

const schema = [
    {
        name: 'ticker',
        header: 'Ticker'
    },
    {
        name: 'delta',
        header: 'Delta'
    },
    {
        name: 'spot',
        header: 'Spot'
    },
    {
        name: 'shares',
        header: 'Shares'
    }
]

export {data, schema}