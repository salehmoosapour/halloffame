import { StyleSheet } from "react-native";

/**
 * Styles used for Hall Of Fame Screen
 */
exports.hallOfFameStyles = new StyleSheet.create({
  container: {
    backgroundColor: "#EFEFEF"
  },
  listItem: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FFF",
    marginBottom: 15,
    borderRadius: 15,
    overflow: "hidden"
  },
  listItemImageWrapper: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  listItemImage: {
    width: 120,
    height: 100
  },
  listItemDetailsWrapper: {
    flex: 0.7,
    padding: 25
  },
  listItemName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000"
  },
  listItemKnownFor: {
    fontSize: 14,
    fontWeight: "200",
    color: "#777"
  }
});

/**
 * Styles used for Welcome Screen
 */
exports.welcomeStyles = new StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  input: {
    height: 50,
    width: 100,
    backgroundColor: "#efefef",
    borderRadius: 5,
    marginTop: 15,
    padding: 5
  },
  currentImageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 100,
    overflow: "hidden",
    marginBottom: 50
  },
  currentImage: {
    width: 100,
    height: 100
  },
  Button: {
    backgroundColor: "#efefef",
    padding: 15,
    margin: 15,
    borderRadius: 15
  }
});

/**
 * Styles used for Intro Screen
 */
exports.introStyles = new StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold"
  }
});
