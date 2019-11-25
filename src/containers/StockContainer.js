import React, { } from 'react';
import Stock from '../components/Stock'

// class StockContainer extends React.Component {
const StockContainer = (props) => {

  const renderStocks = () => {
    return props.stocks.map(stock => {
      return <Stock
                key={stock.id}
                stock={stock}
                submitStockOrder={props.submitStockOrder}/>
    })
  }

  return (
    <div>
      <h2>Stocks</h2>
      {renderStocks()}
    </div>
  );

}

export default StockContainer;
