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

export default class TestListScreen extends React.Component {
  static navigationOptions = {
    title: 'CHOOSE TEST',
    headerTitleStyle: {
      width: "90%",
      textAlign: 'center',
      color: "#777"
    }
  }
  constructor(props) {
    super(props)
    this.state = {}
    this.onSelectTest = this.onSelectTest.bind(this)
  }

  onSelectTest(test) {
    const { navigate } = this.props.navigation
    navigate('TakeTest', { currentTest: test, currentQuestion: test.questions[0] })
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.screenProps.tests}
          keyExtractor={item => _.toString(item.id)}
          renderItem={({item}) =>
            <TouchableOpacity style={styles.listItem} onPress={() => this.onSelectTest(item) }>
              <Text style={styles.listText}>{item.name}</Text>
            </TouchableOpacity>
          }
        />
      </View>
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
