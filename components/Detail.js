import React from "react";
import { Text } from "react-native";
// type Props = {
//     name?: string,
// };

export default class Detail extends React.Component {
  render() {
    return (
      <view>
        <Text>{this.props.route.params?.name ?? "hi"}</Text>
      </view>
    );
  }
}
