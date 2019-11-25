import React, { useEffect } from 'react';
import Stock from '../components/Stock'

const PortfolioContainer = (props) => {

  useEffect(() => {
    renderPortfolio()
  }, [])

  const renderPortfolio = () => {
    return props.portfolioStocks.map(stock => {
      return <Stock stock={stock} key={stock.id}/>
    })
  }
  
  return (
    <div>
      <h2>My Portfolio</h2>
        {
          renderPortfolio()
        }
    </div>
  );

}

export default PortfolioContainer;
