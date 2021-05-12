import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import LandingContainer from "./components/landing/landingContainer";
import Header from "./components/header/header"
function App() {
  return (
    <BrowserRouter>
      <Header user={true}/>
      <Route path="/" component={LandingContainer}/>
    </BrowserRouter>
  );
}

export default App;
