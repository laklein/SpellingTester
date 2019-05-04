import React from 'react';
import {
  FlatList,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import _ from 'lodash';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Manage Tests',
  }

  constructor(props) {
    super(props)
    this.state = {
      testName: '',
    }
    
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <TextInput
          autoCorrect={false}
          style={styles.textInput}
          onChangeText={(text) => this.setState({ testName: text })}
          value={this.state.testName}
        />
        
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  textInput: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
  },
})
