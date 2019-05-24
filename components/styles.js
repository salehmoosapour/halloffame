import { StyleSheet, Dimensions } from "react-native";

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
  loadingImage: {
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
