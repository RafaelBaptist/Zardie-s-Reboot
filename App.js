import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numero: 300,
      botao: "Start",
      lastTime: null,
    };

    this.timer = null;

    this.start = this.start.bind(this);
    this.clear = this.clear.bind(this);
    this.formatTime = this.formatTime.bind(this);
  }

  start() {
    if (this.timer != null) {
      clearInterval(this.timer);
      this.timer = null;
      this.setState({ botao: "Start" });
    } else {
      this.timer = setInterval(() => {
        this.setState((prevState) => {
          if (prevState.numero > 0) {
            return { numero: prevState.numero - 1 };
          } else {
            clearInterval(this.timer);
            this.timer = null;
            return { botao: "Start" };
          }
        });
      }, 1000);
      this.setState({ botao: "Stop" });
    }
  }

  clear() {
    if (this.timer != null) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.setState({
      lastTime: this.formatTime(this.state.numero),
      numero: 300,
      botao: "Start",
    });
  }

  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: this.state.numero < 60 ? "#ff6961" : "#b7d5e5" },
        ]}
      >
        <Image
          style={styles.rebootImage}
          source={require("./assets/src/Reboot.png.png")}
        />
        <Text style={styles.timer}>{this.formatTime(this.state.numero)}</Text>

        <View style={styles.btnArea}>
          <TouchableOpacity style={styles.btn} onPress={this.start}>
            <Text style={styles.btnText}>{this.state.botao}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={this.clear}>
            <Text style={styles.btnText}>Clear</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.lastTimer}>
          <Text style={styles.textLast}>Last Timer: {this.state.lastTime}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b7d5e5",
    alignItems: "center",
    justifyContent: "center",
  },
  timer: {
    marginTop: -160,
    color: "#FFF",
    fontSize: 65,
    fontWeight: "bold",
  },
  btnArea: {
    flexDirection: "row",
    marginTop: 85,
    height: 40,
  },
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 40,
    margin: 17,
    borderRadius: 12,
  },
  btnText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00aeef",
  },
  lastTimer: {
    marginTop: 40,
  },
  textLast: {
    fontSize: 25,
    fontStyle: "italic",
    color: "white",
  },
  rebootImage: {
    maxWidth: 300,
    maxHeight: 300,
  },
});

export default App;
