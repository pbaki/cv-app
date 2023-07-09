import "./styles/App.css";
import GeneralInfo from "./components/general-info";
import Summary from "./components/summary";
import Education from "./components/education";
import Experience from "./components/experience";
import AdminLogin from "./firebaseConfig";

function App() {
  return (
    <>
      <div className="App">
        <div className="leftContainer">
          <GeneralInfo />
        </div>
        <div className="rightContainer">
          <Summary />
          <Education />
          <Experience />
        </div>
      </div>
      <div className="login">
        <AdminLogin />
      </div>
    </>
  );
}

export default App;
