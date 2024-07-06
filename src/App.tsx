import { useState } from "react";
import Button from "./components/Button";

function App() {
  const [message, setMessage] = useState(
    "Let's learn more about testing in React"
  );

  const changeMessage = () => {
    setMessage("You're learning about testing in");
  };

  return (
    <div>
      <h1>Hello world!</h1>
      <p>{message}</p>
      <Button disabled onClick={changeMessage}>
        Change Message
      </Button>
    </div>
  );
}

export default App;
