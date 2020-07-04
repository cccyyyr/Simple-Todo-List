import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { withNavigation, navigation } from "react-navigation";

export default function Random({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetch(
      "https://cors-anywhere.herokuapp.com/https://api.penncoursereview.com/v1/depts?token=public"
    )
      .then((response) => response.json())
      .then((json) => setData(json.result.values))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <TextInput
            style={styles.input}
            onSubmitEditing={() => {
              if (inputValue !== "") {
                const newRow = {
                  id: inputValue.slice(0, 1),
                  name: inputValue,
                  path: "/depts/",
                };
                setData((data) => data.concat(newRow));
              }
              setInputValue("");
            }}
            onChangeText={(value) => setInputValue(value)}
            placeholder="Add ur dept here"
            value={inputValue}
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
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Detail", { name: item.name })
                }
              >
                <Text>
                  {item.id}: {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
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
