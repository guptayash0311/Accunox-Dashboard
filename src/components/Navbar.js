import React, { useState, useEffect } from 'react';
import "../assets/utils.css";
import widgetsData from "../data/widgets.json";

const Navbar = ({ onConfirm }) => {
  const [widgets] = useState(widgetsData);
  const [selectedWidgets, setSelectedWidgets] = useState({});
  const [confirmedWidgets, setConfirmedWidgets] = useState({});
  const [activeCategory, setActiveCategory] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const savedSelectedWidgets = localStorage.getItem('selectedWidgets');
    if (savedSelectedWidgets) {
      setSelectedWidgets(JSON.parse(savedSelectedWidgets));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedWidgets', JSON.stringify(selectedWidgets));
  }, [selectedWidgets]);

  const handleWidgetToggle = (category, widgetId) => {
    setSelectedWidgets(prevSelectedWidgets => {
      const newSelection = { ...prevSelectedWidgets };

      if (!newSelection[category]) {
        newSelection[category] = [];
      }

      if (newSelection[category].includes(widgetId)) {
        newSelection[category] = newSelection[category].filter(id => id !== widgetId);
      } else {
        newSelection[category].push(widgetId);
      }

      return newSelection;
    });
  };

  const handleConfirmSelection = () => {
    setConfirmedWidgets(prevConfirmedWidgets => {
      const newConfirmed = { ...prevConfirmedWidgets };

      Object.keys(selectedWidgets).forEach(category => {
        if (!newConfirmed[category]) {
          newConfirmed[category] = [];
        }

        newConfirmed[category] = [
          ...newConfirmed[category],
          ...selectedWidgets[category],
        ].slice(0, 3);
      });

      onConfirm(newConfirmed);

      return newConfirmed;
    });

    setSelectedWidgets({});
    toggleSidebar();
  };

  const handleCategoryClick = category => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <h2 className="navbar-brand">CNAPP Dashboard</h2>
          <button
            className="btn btn-sm btn-outline-secondary"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebar"
            aria-controls="sidebar"
            onClick={toggleSidebar}
          >
            Add Widget
          </button>
        </div>
      </nav>

      <div className={`sidebar offcanvas offcanvas-end ${showSidebar ? 'show' : ''}`} tabIndex="-1" id="sidebar" aria-labelledby="sidebarLabel">
        <div className="offcanvas-header bg-primary">
          <h5 className="offcanvas-title " id="sidebarLabel">Add Widget</h5>
          <button type="button" className="btn-close text-reset" onClick={toggleSidebar}></button>
        </div>
        <div className="offcanvas-body">
          <div className="categories">
            {Object.keys(widgets).map(category => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`category-button mx-2 btn btn-outline-secondary ${activeCategory === category ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>

          {activeCategory && (
            <div className="widgets-list mt-3">
              {widgets[activeCategory].map(widget => (
                <div key={widget.id} className="widget-item ">
                  <input
                    type="checkbox"
                    id={`widget-${widget.id}`}
                    checked={
                      (selectedWidgets[activeCategory] && selectedWidgets[activeCategory].includes(widget.id)) ||
                      (confirmedWidgets[activeCategory] && confirmedWidgets[activeCategory].includes(widget.id))
                    }
                    onChange={() => handleWidgetToggle(activeCategory, widget.id)}
                  />
                  <label htmlFor={`widget-${widget.id}`} className='ms-2'>
                    {widget.name}
                    {/* <img src={widget.image} alt={widget.name} style={{ width: '50px', marginLeft: '10px' }} /> */}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="sidebar-actions">
          <button onClick={handleConfirmSelection} className="btn btn-sm btn-outline-success mx-3">Confirm</button>
          <button onClick={toggleSidebar} className="btn btn-sm btn-outline-danger " data-bs-dismiss="offcanvas">Close</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
