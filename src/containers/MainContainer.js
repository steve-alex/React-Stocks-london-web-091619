import React, { useEffect, useState } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'


const BASE_URL = `http://localhost:3000`
const STOCKS_URL = `${BASE_URL}/stocks`


const MainContainer = () => {
  const [stocks, setStocks] = useState([]);
  const [displayStocks, setDisplayStocks] = useState([]);
  const [portfolioStocks, setPortfolioStocks] = useState([]);

  useEffect(() => {
    getStockData();
  }, [])

  const getStockData = () => {
    return fetch(`${STOCKS_URL}`)
      .then(resp => resp.json())
      .then(stockData => {
        setStocks(stockData)
        setDisplayStocks(stockData)
      })
  }

  const userOwnsStock = (stock) => {
    if (portfolioStocks.includes(stock)) {
      return true
    }
    return false
  }

  const submitStockOrder = (stock) => {
    if (userOwnsStock(stock)) {
      sellStock(stock)
    } else {
      buyStock(stock)
    }
  }

  const sellStock = (stock) => {
    setPortfolioStocks(portfolioStocks.filter(pStock => pStock !== stock))
  }

  const buyStock = (stock) => {
    setPortfolioStocks([...portfolioStocks, stock])
  }

  const sortStocks = (sorting) => {
    if (sorting === "Alphabetically"){
      setDisplayStocks(displayStocks.sort((a,b) => a.name > b.name ? 1 : -1))
    } else if (sorting === "Price"){
      setDisplayStocks(displayStocks.sort((a,b) => a.price > b.price ? 1 : -1))
    }
  }

  const filterStocks = (filter) => {
    if (filter === "Tech"){
      setDisplayStocks(stocks.filter(stock => stock.type === "Tech"))
    } else if (filter === "Sportswear") {
      setDisplayStocks(stocks.filter(stock => stock.type === "Sportswear"))
    } else if (filter === "Finance") {
      setDisplayStocks(stocks.filter(stock => stock.type === "Finance"))
    }
  }

  return (
    <div>
      <SearchBar filterStocks={filterStocks} sortStocks={sortStocks}/>
        <div className="row">
          <div className="col-8">
            <StockContainer stocks={displayStocks} submitStockOrder={submitStockOrder}/>
          </div>
          <div className="col-4">
            <PortfolioContainer portfolioStocks={portfolioStocks}/>
          </div>
        </div>
    </div>
  );

}

export default MainContainer;
