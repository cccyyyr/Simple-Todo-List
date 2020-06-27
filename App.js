import * as React from 'react';
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
} from 'react-native';

const image = {uri: "https://i.ibb.co/2g14mT4/dustyblue.jpg"};
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      inputValue: '',
    };
    this.removeTodo = this.removeTodo.bind(this);
  }
  changeText = (value) => {
    this.setState({
      inputValue: value,
    });
  };

  addItem = () => {
    if (this.state.inputValue !== '') {
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
      inputValue: '',
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
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <TouchableOpacity
          style={styles.circle}
          onPress={() => this.removeTodo(this, index)}>
        </TouchableOpacity>
        <Text style={styles.item}>{todo.title}</Text>
      </View>
    ));
    return (
      <View style = {styles.container}>
      <ImageBackground source={image} style={styles.image}>
          <TextInput
            style={styles.input}
            onSubmitEditing={this.addItem}
            onChangeText={this.changeText}
            placeholder="Type here to add a to do."
            value={this.state.inputValue}
            placeholderTextColor={'white'}
            multiline={true}
            autoCapitalize="sentences"
            underlineColorAndroid="white"
            selectionColor={'white'}
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
    flexDirection: "column"
  },
  input: {
    marginTop: 30,
    paddingTop: 10,
    paddingRight: 15,
    paddingLeft: 15,
    fontSize: 40,
    color: 'white',
    fontWeight: '500',
  },
  item: {
    paddingRight: 15,
    paddingLeft: 10,
    fontSize: 34,
    color: 'pink',
    fontWeight: '500',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: 'pink',
    margin: 15,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});
