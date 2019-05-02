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
    this.state = {
      answerInput: '',
      answerResult: '',
      currentQuestion: null,
      currentTest: null,
      finished: false,
      score: 0,
      showTests: false,
      submitButtonText: 'Check',
    }
    this.onTakeTest = this.onTakeTest.bind(this)
    this.onSubmitAnswer = this.onSubmitAnswer.bind(this)
    this.onSelectTest = this.onSelectTest.bind(this)
    this.onRetry = this.onRetry.bind(this)
  }

  onSelectTest(test) {
    this.setState({ currentTest: test, currentQuestion: test.questions[0] })
  }

  onTakeTest() {
    this.setState({ showTests: true })
  }

  onSubmitAnswer() {
    const { answerInput, answerResult, currentQuestion, currentTest, submitButtonText } = this.state
    if (submitButtonText === 'Next') {
      const currentIndex = _.findIndex(currentTest.questions, { 'id': currentQuestion.id })
      const nextQuestion = _.nth(currentTest.questions, currentIndex + 1)
      if (_.isNil(nextQuestion)) {
        this.setState({ answerResult: null, currentQuestion: null, finished: true })
      } else {
        this.setState({ answerResult: null, currentQuestion: nextQuestion })
      }
      this.setState({ submitButtonText: 'Check' })
    } else {
      if (_.upperCase(answerInput) === _.upperCase(currentQuestion.answer)) {
        this.setState({ answerResult: 'You are correct!', score: this.state.score + 1 })
      } else {
        this.setState({ answerResult: 'Not quite!' })
      }
      this.setState({ submitButtonText: 'Next' })
    }
    this.setState({ answerInput: '' })
  }

  onRetry() {
    this.setState({
      answerInput: '',
      answerResult: '',
      score: 0,
      currentQuestion: this.state.currentTest.questions[0],
      finished: false,
    })
  }

  renderMenu() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.testButton} onPress={this.onTakeTest}>
          <Text style={styles.buttonText}>Take Test</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.createButton} onPress={() => navigate('Links')}>
          <Text style={styles.buttonText}>Create Test</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderTests() {
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

  renderQuestion() {
    return (
      <View style={styles.container}>
        <View style={styles.question}>
          <Text style={styles.questionText}>Spell {this.state.currentQuestion.body}</Text>
          <TextInput
            autoCorrect={false}
            style={styles.textInput}
            onChangeText={(text) => this.setState({ answerInput: text })}
            value={this.state.answerInput}
          />
          <TouchableOpacity style={styles.submitButton} onPress={this.onSubmitAnswer}>
            <Text style={styles.buttonText}>{this.state.submitButtonText}</Text>
          </TouchableOpacity>
          <Text style={styles.answerResult}>{this.state.answerResult}</Text>
        </View>
      </View>
    )
  }

  renderBody() {
    if (this.state.finished) {
      return (
        <View style={styles.score}>
          <Text style={styles.score}>
            You got {this.state.score}/{this.state.currentTest.questions.length} correct!
          </Text>
          <TouchableOpacity style={styles.submitButton} onPress={this.onRetry}>
            <Text style={styles.buttonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )
    }
    if (!_.isNil(this.state.currentTest)) {
      return (
        this.renderQuestion()
      )
    }
    if (this.state.showTests) {
      return (
        this.renderTests()
      )
    }
    return (
      this.renderMenu()
    )
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        {this.renderBody()}
      </TouchableWithoutFeedback>
    );
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
