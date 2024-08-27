import React, { useState } from 'react'
import Navbar from './components/Navbar'
import widgetsData from "../src/data/widgets.json";
import Dashboard from './components/Dashboard';

const App = () => {
  const [confirmedWidgets, setConfirmedWidgets] = useState({});

  const handleConfirm = (widgets) => {
    setConfirmedWidgets(widgets);
  };
  return (
    <>
      <Navbar onConfirm={handleConfirm}/>
      <Dashboard confirmedWidgets={confirmedWidgets} widgetsData={widgetsData}/>
    </>
  )
}

export default App
