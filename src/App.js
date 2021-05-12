import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import LandingContainer from "./components/landing/landingContainer";

function App() {
  return (
    <BrowserRouter>

      <Route path="/" component={LandingContainer}/>
    </BrowserRouter>
  );
}

export default App;
