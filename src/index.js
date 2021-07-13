import ReactDOM from "react-dom";
import App from "./Components/App";
import store from "./Components/Redux/store";
import "./style.css";
import { Provider } from "react-redux";
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
