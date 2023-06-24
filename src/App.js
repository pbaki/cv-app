import "./styles/App.css";
import GeneralInfo from "./components/general-info";
import Summary from "./components/summary";
import Education from "./components/education";
import Experience from "./components/experience";

function App() {
  return (
    <div className="App">
      <GeneralInfo />
      <Summary />
      <Education />
      <Experience />
    </div>
  );
}

export default App;
