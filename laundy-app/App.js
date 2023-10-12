import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import store from "./store";
import Testing from "./Testing";
import OtherPage from "./OtherPage";
import StackNavigator from "./StackNavigator";

export default function App() {
  return (
    <Provider store={store}>
      <StackNavigator />
      {/* <Testing/>
      <OtherPage/> */}
      <StatusBar style="auto" />
    </Provider>
  );
}
