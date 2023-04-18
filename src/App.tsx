import { useState } from "react";
import "./style/App.scss";
import Snils from "./components/Snils";
import Xlsx from "./components/Xlsx";

function App() {
  const [visible, setVisible]: any = useState(true);

  return (
    <div className="Wrapper">
      {visible ? (
        <Snils setVisible={setVisible}></Snils>
      ) : (
        <Xlsx setVisible={setVisible}></Xlsx>
      )}
    </div>
  )
}

export default App
