import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";

import reduxStore from "./redux/redux";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={reduxStore}>
    <App />
  </Provider>
);
