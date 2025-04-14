import {Routes, Route } from "react-router-dom";
import DisplayResponse from "./Components/DisplayResponse/displayResponse";
import Layout from "./Components/Layout/layout";
import Home from "./Components/Home/home";
import Layouth from "./Components/Layoutheader/layouth";

import './App.css';


const App = () => {
  return (
    <Routes>
      <Route path='/Bhoomi_Flow_Craft' element={<Layout><Home/></Layout>} />
      <Route path='/Bhoomi_Flow_Craft/flow_chart' element={<Layouth><DisplayResponse/></Layouth>} />
    </Routes>
  );
}

export default App;
