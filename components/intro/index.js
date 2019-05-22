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

/**
 * Importing Component Styles from ./components/styles.js
 */
import styles from "../styles";

export default class Intro extends Component {
  render() {
    return (
      <View>
        <Text>Intro Screen</Text>
      </View>
    );
  }
}
