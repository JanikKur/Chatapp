import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import ChatRoom from "./pages/ChatRoom";



export default function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/chatroom">
            <ChatRoom />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
