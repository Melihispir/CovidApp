import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  AuthLoadingScreen,
  Dashboard
} from "./screens";




const Router = createStackNavigator(
  {
    HomeScreen,
    LoginScreen,
    RegisterScreen,
    AuthLoadingScreen,
    Dashboard
  },
  {
    initialRouteName: "AuthLoadingScreen",
    headerMode: "none"
  }
);

export default createAppContainer(Router);
