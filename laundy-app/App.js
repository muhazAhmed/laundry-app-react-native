import { StatusBar } from "react-native";
import Home from "./screens/Home";
import { Provider } from "react-redux";
import store from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <Home />
      <StatusBar style="auto" />
    </Provider>
  );
}
