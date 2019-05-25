import HallOfFame from "../../components/halloffame/index";
import Intro from "../../components/intro/index";
import Welcome from "../../components/welcome/index";

export default (Screens = {
  IntroScreen: {
    screen: Intro
  },
  WelcomeScreen: {
    screen: Welcome
  },
  HallOfFameScreen: {
    screen: HallOfFame
  }
});
