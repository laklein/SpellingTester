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

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'SPELLING TESTER',
    headerTitleStyle: {
      width: "90%",
      textAlign: 'center',
      color: "#777"
    }
  };

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.testButton} onPress={() => navigate('TestList')}>
            <Text style={styles.buttonText}>Take Test</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.createButton} onPress={() => navigate('Links')}>
            <Text style={styles.buttonText}>Create Test</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  testButton: {
    flex: 1,
    backgroundColor: "#42C5F4",
    alignItems: "center",
    justifyContent: "center"
  },
  createButton: {
    flex: 1,
    backgroundColor: "#48D654",
    alignItems: "center",
    justifyContent: "center"
  },
  answerResult: {
    color: "#48D654"
  },
  buttonText: {
    fontSize: 28,
    fontWeight: "600",
    color: 'white',
  },
  listItem: {
    backgroundColor: "#42C5F4",
    alignItems: 'center',
    padding: 20,
  },
  listText: {
    fontSize: 28,
    fontWeight: '400',
  },
  question: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionText: {
    fontSize: 28,
    fontWeight: '400',
  },
  score: {
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    fontSize: 28,
    fontWeight: '300',
  },
  submitButton: {
    margin: 10,
    height: 40,
    width: 100,
    backgroundColor: "#48D654",
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
