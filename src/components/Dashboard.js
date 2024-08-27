import React from 'react';
import "../assets/utils.css";

const Dashboard = ({ confirmedWidgets, widgetsData }) => {
  const getWidgetsToDisplay = (category) => {
    const selectedWidgets = confirmedWidgets[category] || [];
    const widgetCards = selectedWidgets.map((widgetId) => {
      const widget = widgetsData[category].find(widget => widget.id === widgetId);
      return (
        <div key={widgetId} className="col-md-4 mb-4">
          <div className="card">
              <h5 className="card-title ps-2">{widget.name}</h5>
              <p className="card-text ps-2">{widget.text}</p>
            <div className="card-body d-flex">
            <img src={widget.image} className="card-img-bottom fixed-image" alt={widget.name} />
              <div>
              <p className="ms-5">Analysis Text</p>
              <p className="ms-5">Analysis Text</p>
              </div>
            </div>
          </div>
        </div>
      );
    });

    // Add empty cards if less than 3 widgets are selected
    while (widgetCards.length < 3) {
      widgetCards.push(
        <div key={`empty-${widgetCards.length}`} className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
              <p className="card-text text-muted">Add Widget</p>
            </div>
          </div>
        </div>
      );
    }

    return widgetCards;
  };

  return (
    <div className="container mt-4">
      {Object.keys(widgetsData).map((category) => (
        <div key={category} className="category-section mb-5">
          <h3>{`${category} Dashboard`}</h3>
          <div className="row">
            {getWidgetsToDisplay(category)}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Dashboard
