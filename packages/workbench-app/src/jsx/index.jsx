import "core-js";
import "regenerator-runtime/runtime.js";

import localForage from "localforage";
import React from "react";
import { Provider } from "react-redux";
import store from "../store/configureStore";
import App from "./containers/app/App.jsx";

localForage.config({
  driver: localForage.LOCALSTORAGE,
  name: "phema-workbench-local",
});

class PhemaWorkbench extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App localForage={localForage} />
      </Provider>
    );
  }
}

export default PhemaWorkbench;
