// IPOCard.js
import React from "react";
import "./IPOCard.css";

const IPOCard = ({ ipo, onCardClick }) => {
  const handleCardClick = () => {
    onCardClick(ipo);
  };

  return (
    <>
      <article className="cta">
        <div className="cta__text-column">
          <div id="ipo-tetx" className="text-center">
            {ipo.companyName}
          </div>
          <p className="card-text">Symbol: {ipo.symbol}</p>
          <p className="card-text">Offering Date: {ipo.offeringDate}</p>
          <p className="card-text">
            {" "}
            Price Range: ${ipo.priceRangeLow} - ${ipo.priceRangeHigh}
          </p>
          <p className="card-text">Minimum Investment: ${ipo.priceRangeLow}</p>
        </div>
      </article>
    </>
  );
};

export default IPOCard;
