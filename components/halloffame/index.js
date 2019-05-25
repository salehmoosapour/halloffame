/**
 *
 * Hall of Fame Screen
 *
 */
import React, { Component } from "react";
import { View, FlatList, BackHandler } from "react-native";

/**
 * Importing Installed Packages
 */
import Sound from "react-native-sound";

/**
 * Importing ListItem Component used in FlatList
 */
import ListItem from "./ListItem";

/**
 * Importing this screen styles
 */
import { hallOfFameStyles } from "../styles";

/**
 * Loading exit song and initializing sound package
 */
var exitSound = require("../../assets/sounds/exit.mp3");
const sound = new Sound(exitSound, null, e => {
  if (e) console.log(e);
});

/**
 * Defining a variable to check how many times user has pressed back button
 */
let backCount = 0;

export default class Home extends Component {
  state = {
    people: []
  };

  /**
   * Fetch Most Famous People from API
   *
   * @noparam
   */
  _fetchPeople = () => {
    var people = fetch(
      "https://api.themoviedb.org/3/person/popular?api_key=1f897a27350ff8741d5002104ac8b5d6&language=en-US&page=1"
    )
      .then(res => res.json())
      .then(async data => {
        await data.results.forEach(person => {
          person.profile_path =
            "https://image.tmdb.org/t/p/w470_and_h470_face/" +
            person.profile_path;
        });
        return data.results;
      })
      .catch(e => console.error("Could not fetch people : " + e));
    return people;
  };

  /**
   * Put Sheldon in 3rd place in given array
   *
   * @param array data
   */
  _doSheldon = data => {
    data[2] = {
      name: "Sheldon Cooper",
      known_for: [{ name: "The Big Bang Theory" }],
      profile_path:
        "https://i.pinimg.com/originals/2e/29/c4/2e29c41787d04c4b3de4aa3832566357.jpg"
    };
    return data;
  };

  /**
   * BackHandler custom handler function checking if users pressed back twice in 500ms
   *
   * @noparam
   */
  _exitHandler = () => {
    backCount++;
    setTimeout(() => {
      if (backCount == 2) {
        sound.play();
        BackHandler.exitApp();
      }
      backCount = 0;
      if (backCount == 0) {
        this.props.navigation.push("WelcomeScreen");
      }
    }, 500);
    return true;
  };

  /**
   * Fetch people, Limit them to 5, Put sheldon in 3rd place
   *
   * @noparam
   */
  async componentWillMount() {
    var people = await this._fetchPeople();
    people = people.splice(0, 5);
    people = this._doSheldon(people);
    this.setState({
      people: people
    });
  }

  /**
   * Add BackHandler event listener
   */
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this._exitHandler);
  }

  /**
   * Remove BackHandler event listener
   */
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this._exitHandler);
  }
  render() {
    return (
      <View style={hallOfFameStyles.container}>
        <FlatList
          data={this.state.people}
          style={{ padding: 25 }}
          keyExtractor={item => item.name}
          renderItem={({ item, index }) => (
            <ListItem
              key={index}
              name={item.name}
              image={item.profile_path}
              knownfor={item.known_for}
            />
          )}
        />
      </View>
    );
  }
}
