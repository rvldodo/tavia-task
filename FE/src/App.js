import React, { useState } from "react";
import "./styles.css";

export default function ListingAd({ pic, title, address, description }) {
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const maskPhoneNumbers = (description) => {
    return description.replace(/\d{4}\b/g, "XXXX");
  };

  const handleDescriptionToggle = () => {
    if (!showDescription) {
      const maskedDesc = maskPhoneNumbers(description);
      setMaskedDescription(maskedDesc);
    }
    toggleDescription();
  };

  return (
    <div className="App">
      <img className="mainPic" width="300" height="500" src={pic} />
      <div className="mainContent">
        <h1>{title}</h1>
        <p className="address">{address}</p>
        <button onClick={toggleDescription}>
          {showDescription ? "Hide description" : "See description"}
        </button>
        {showDescription && (
          <p className="description">
            {description.replace(
              /\b(\d{4})\d{4}\b|\b(\d{4}) \d{4}\b/g,
              (match, p1, p2) => {
                if (p1) {
                  return p1 + " XXXX";
                } else if (p2) {
                  return p2 + " XXXX";
                }
              },
            )}
          </p>
        )}
      </div>
    </div>
  );
}
