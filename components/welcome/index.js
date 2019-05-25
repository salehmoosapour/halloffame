/**
 *
 * Welcome Screen
 *
 */
import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableNativeFeedback,
  BackHandler
} from "react-native";

/**
 * Importing Installed Packages
 */
import shuffleSeed from "shuffle-seed";
import Sound from "react-native-sound";
import TimerMixin from "react-timer-mixin";

/**
 * Importing Welcome Screen Styles
 */
import { welcomeStyles } from "../styles";

/**
 * Importing Welcome Screen Loading Images
 */
const firstImage = require("../../assets/images/welcome/first.gif");
const secondImage = require("../../assets/images/welcome/second.gif");
const thirdImage = require("../../assets/images/welcome/third.gif");
const forthImage = require("../../assets/images/welcome/forth.gif");
const fifthImage = require("../../assets/images/welcome/fifth.gif");

/**
 * Loading exit song and initializing sound package
 */
var exitSound = require("../../assets/sounds/exit.mp3");
const sound = new Sound(exitSound, null, e => {
  if (e) console.log(e);
});

// Variable for checking back button presses
let backCount = 0;

export default class Welcome extends Component {
  /**
   * Defining global interval variable to assign Interval to it later
   */
  interval = null;

  state = {
    inputNum: "1",
    currentImage: null,
    images: [firstImage, secondImage, thirdImage, forthImage, fifthImage]
  };

  /**
   * Function used for changing the image & resetting interval after each time user changes the image
   *
   * @boolean shouldShuffle (optional)
   */
  chooseRandomImage = (shouldShuffle = false) => {
    var array = this.state.images;
    if (shouldShuffle) {
      // Shuffle images using seed value
      array = shuffleSeed.shuffle(array, this.state.inputNum);
      this.setState({
        images: array
      });
    }
    // Show random image from shuffled array
    let randomNumber = Math.floor(Math.random() * this.state.images.length);
    this.setState({
      currentImage: array[randomNumber]
    });

    // Resetting the interval
    TimerMixin.clearInterval(this.interval);
    this._changeImageInterval();
  };

  /**
   * Handle TextInput Value Change Event
   *
   * @string text
   */
  _inputValueChange = text => {
    this.setState({
      inputNum: text
    });
  };

  /**
   * Handle Save Button onPress Event
   *
   * @noparam
   */
  _save = () => {
    this.chooseRandomImage(true);
  };

  /**
   * Handle Randomise Button onPress Event
   *
   * @noparam
   */
  _randomise = () => {
    let randomNumber = Math.floor(Math.random() * 9) + 1;
    this.setState({
      inputNum: randomNumber.toString()
    });
    this.chooseRandomImage(true);
  };

  /**
   * Function used to set automatic image change every 5000ms
   *
   * @noparam
   */
  _changeImageInterval = () => {
    this.interval = TimerMixin.setInterval(() => {
      this.chooseRandomImage();
    }, 5000);
  };

  /**
   * BackHandler custom handler function checking if users pressed back twice in 500ms
   */
  _exitHandler = () => {
    backCount++;
    var t = TimerMixin.setTimeout(() => {
      if (backCount == 2) {
        sound.play();
        TimerMixin.clearInterval(this.interval);
        TimerMixin.clearTimeout(t);
        BackHandler.exitApp();
      }
      backCount = 0;
      if (backCount == 0) {
        this.props.navigation.push("HallOfFameScreen");
      }
    }, 500);
    return true;
  };

  /**
   * Setting interval when component is mounted & choose a random initial image
   *
   * @noparam
   */
  componentDidMount() {
    this.chooseRandomImage();
    this._changeImageInterval();
    BackHandler.addEventListener("hardwareBackPress", this._exitHandler);
  }

  /**
   * Clearing interval before app is closed
   */
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this._exitHandler);
    TimerMixin.clearInterval(this.interval);
  }

  render() {
    return (
      <View style={welcomeStyles.container}>
        <View style={welcomeStyles.currentImageWrapper}>
          <Image
            source={this.state.currentImage}
            style={welcomeStyles.currentImage}
          />
        </View>
        <TextInput
          onChangeText={text => this._inputValueChange(text)}
          value={this.state.inputNum}
          style={welcomeStyles.input}
        />
        <View
          style={{
            flexDirection: "row",
            marginTop: 25
          }}
        >
          <TouchableNativeFeedback onPress={this._save}>
            <View style={welcomeStyles.Button}>
              <Text>Save</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={this._randomise}>
            <View style={welcomeStyles.Button}>
              <Text>Randomise</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        <TouchableNativeFeedback
          onPress={() => {
            this.props.navigation.push("HallOfFameScreen");
          }}
        >
          <View style={welcomeStyles.Button}>
            <Text>Go To Hall Of Fame</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}
