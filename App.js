/*
 ** Test Application Developed For Tipi
 **
 ** @author Mohammad S. Moosapour
 */

/**
 * Importing Installed Packages
 */
import { createStackNavigator, createAppContainer } from "react-navigation";

/**
 * Importing Routes Object Containing :
 *  - Screens
 *  - navigationOptions
 */
import Router from "./components/routing/index";

/**
 * Creating StackNavigator and Exporting createAppContainer
 */
const App = createStackNavigator(Router.Screens, Router.navigationOptions);
export default createAppContainer(App);
