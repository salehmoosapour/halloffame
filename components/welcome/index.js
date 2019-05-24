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
  TouchableNativeFeedback
} from "react-native";

/**
 * Importing Installed Packages
 */
import shuffleSeed from "shuffle-seed";

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

export default class Welcome extends Component {
  /**
   * Defining global interval variable to assign Interval to it later
   */
  interval = null;

  state = {
    inputNum: "1",
    loadingImage: null,
    images: [firstImage, secondImage, thirdImage, forthImage, fifthImage]
  };

  /**
   * Function used for changing the image & resetting interval after each time user changes the image
   *
   * @param shouldShuffle (optional) - @boolean
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
      loadingImage: array[randomNumber]
    });

    // Resetting the interval
    clearInterval(this.interval);
    this._changeImageInterval();
  };

  /**
   * Handle TextInput Value Change Event
   *
   * @param text - @string
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
  _changeImageInterval() {
    this.interval = setInterval(() => {
      this.chooseRandomImage();
    }, 5000);
  }

  /**
   * Choose a random initial image
   *
   * @noparam
   */
  componentWillMount() {
    this.chooseRandomImage();
  }

  /**
   * Setting interval when component is mounted
   *
   * @noparam
   */
  componentDidMount() {
    this._changeImageInterval();
  }
  render() {
    return (
      <View style={welcomeStyles.container}>
        <Image
          source={this.state.loadingImage}
          style={welcomeStyles.loadingImage}
        />
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
            this.props.navigation.navigate("HomeScreen");
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
