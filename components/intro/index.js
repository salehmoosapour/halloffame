/**
 *
 * Intro Screen
 *
 */

/**
 * Importing React & React Native Components
 */
import React, { Component } from "react";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import AppIntroSlider from "react-native-app-intro-slider";

/**
 * Importing Component Styles from ./components/styles.js
 */
import { introStyles } from "../styles";

/**
 * Loading Intro Slides from JSON
 */
import slides from "./slides.json";

/**
 * Importing Constants
 */
import { ALREADY_LAUNCHED } from "../const";

export default class Intro extends Component {
  // Set a default false state to prevent Intro Screen rendering
  state = {
    firstLaunch: false
  };

  componentWillMount() {
    // Check if application has launched before
    AsyncStorage.getItem(ALREADY_LAUNCHED).then(value => {
      if (value === null) {
        // Store a variable using AsyncStorage so we know app has launched once before
        AsyncStorage.setItem(ALREADY_LAUNCHED, "true");
        this.setState({ firstLaunch: true });
      } else {
        this.props.navigation.replace("WelcomeScreen");
      }
    });
  }

  /**
   * Done Button Click
   * navigate user to welcome screen on clicking Done button
   *
   * @noparam
   */
  _onDoneClick = () => {
    this.props.navigation.navigate("WelcomeScreen");
  };

  /**
   * Render Item
   * custom renderer for rendering our Intro Slides
   *
   * @param item
   */
  _renderItem = item => {
    return (
      <View
        style={[
          introStyles.container,
          { backgroundColor: item.backgroundColor }
        ]}
      >
        <Text style={introStyles.title}>{item.title}</Text>
        <Text>{item.text}</Text>
      </View>
    );
  };

  render() {
    /**
     * Check the default false state to prevent Intro Screen from rendering...
     */
    if (this.state.firstLaunch) {
      return (
        <AppIntroSlider
          slides={slides}
          renderItem={this._renderItem}
          onDone={this._onDoneClick}
        />
      );
    } else {
      return null;
    }
  }
}
