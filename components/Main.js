import * as React from "react";
import {
  Keyboard,
  StatusBar,
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Button,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { withNavigation, navigation } from "react-navigation";

const image = { uri: "https://i.ibb.co/2g14mT4/dustyblue.jpg" };

class Main extends React.Component {
  static navigationOptions = {
    title: "Todo",
  };

  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      inputValue: "",
    };
    this.removeTodo = this.removeTodo.bind(this);
  }
  changeText = (value) => {
    this.setState({
      inputValue: value,
    });
  };

  addItem = () => {
    if (this.state.inputValue !== "") {
      this.setState((prevState) => {
        const newToDo = {
          title: this.state.inputValue,
          createdAt: Date.now(),
        };

        var todos = this.state.todos.concat(newToDo);

        this.setState({
          todos: todos,
        });
      });
    }
    this.setState({
      inputValue: "",
    });
  };
  removeTodo(index) {
    var todos = this.state.todos.splice(index, 1);
    this.setState({
      todos: todos,
    });
  }

  render() {
    const todos = this.state.todos.reverse().map((todo, index) => (
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <TouchableOpacity
          style={styles.circle}
          onPress={() => this.removeTodo(this, index)}
        ></TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() =>
            this.props.navigation.navigate("Detail", { name: todo.title })
          }
        >
          <Text>{todo.title}</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate("Detail", { name: todo.title })>
          <Text>{todo.title}</Text>
        </TouchableOpacity> */}
      </View>
    ));
    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          <Button
            title="Random"
            onPress={() => this.props.navigation.navigate("Random")}
            color="black"
          />
          <TextInput
            style={styles.input}
            onSubmitEditing={this.addItem}
            onChangeText={this.changeText}
            placeholder="Type here to add a to do."
            value={this.state.inputValue}
            placeholderTextColor={"white"}
            multiline={true}
            autoCapitalize="sentences"
            underlineColorAndroid="white"
            selectionColor={"white"}
            maxLength={30}
            returnKeyType="done"
            autoCorrect={false}
            blurOnSubmit={true}
          />
          <FlatList
            data={todos}
            renderItem={({ item }) => <Text>{item} </Text>}
          />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  input: {
    marginTop: 30,
    paddingTop: 10,
    paddingRight: 15,
    paddingLeft: 15,
    fontSize: 40,
    color: "white",
    fontWeight: "500",
  },
  item: {
    paddingRight: 15,
    paddingLeft: 10,
    fontSize: 34,
    color: "pink",
    fontWeight: "500",
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "pink",
    margin: 15,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default withNavigation(Main);
