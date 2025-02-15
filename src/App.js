import {Routes, Route } from "react-router-dom";
import DisplayResponse from "./Components/DisplayResponse/displayResponse";
import Layout from "./Components/Layout/layout";
import Home from "./Components/Home/home";

import './App.css';


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout><Home/></Layout>} />
      <Route path='/home/flow_chart' element={<Layout><DisplayResponse/></Layout>} />
    </Routes>
  );
}

export default App;
