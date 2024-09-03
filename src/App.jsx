import "./css/App.css";
import { useState } from "react";
import InputCon from "./components/InputCon";
import ListArea from "./components/ListArea";

function App() {
  const data = JSON.parse(localStorage.getItem("contactList")) || [];
  let [list, setList] = useState(data);

  return (
    <>
      <h1>연락처 리스트</h1>
      <div className="container">
        <InputCon setList={setList} />
        <ListArea list={list} setList={setList} />
      </div>
    </>
  );
}

export default App;
