import "./styles/App.css";
import GeneralInfo from "./components/general-info";
import Summary from "./components/summary";
import Education from "./components/education";

function App() {
  return (
    <div className="App">
      <GeneralInfo />
      <Summary />
      <Education />
    </div>
  );
}

export default App;
