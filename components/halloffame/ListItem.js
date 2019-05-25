/**
 * FlatList Item used for rendering Famous People
 */
import React, { Component } from "react";
import { Text, View, Image } from "react-native";

/**
 * Importing Hall Of Fame Styles
 */
import { hallOfFameStyles } from "../styles";

export default class ListItem extends Component {
  render() {
    return (
      <View style={hallOfFameStyles.listItem}>
        <View style={hallOfFameStyles.listItemImageWrapper}>
          <Image
            source={{ uri: this.props.image }}
            style={hallOfFameStyles.listItemImage}
          />
        </View>
        <View style={hallOfFameStyles.listItemDetailsWrapper}>
          <Text style={hallOfFameStyles.listItemName}>{this.props.name}</Text>
          <Text style={hallOfFameStyles.listItemKnownFor}>
            {this.props.knownfor.map((i, k) => (
              <Text key={k}>{i.name ? i.name : i.title}</Text>
            ))}
          </Text>
        </View>
      </View>
    );
  }
}
