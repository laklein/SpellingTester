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

export default class TakeTestScreen extends React.Component {
  static navigationOptions = {
    title: 'TAKE TEST',
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
      currentQuestion: this.props.navigation.getParam('currentQuestion'),
      finished: false,
      score: 0,
      submitButtonText: 'Check',
    }
    this.onSubmitAnswer = this.onSubmitAnswer.bind(this)
    this.onRetry = this.onRetry.bind(this)
  }

  

  onSubmitAnswer() {
    const { answerInput, answerResult, currentQuestion, submitButtonText } = this.state
    const currentTest = this.props.navigation.getParam('currentTest')
    if (submitButtonText === 'Next') {
      const currentIndex = _.findIndex(currentTest.questions, { 'id': currentQuestion.id })
      const nextQuestion = _.nth(currentTest.questions, currentIndex + 1)
      if (_.isNil(nextQuestion)) {
        this.setState({ answerResult: null, currentQuestion: null, finished: true })
      } else {
        this.setState({ answerResult: null, currentQuestion: nextQuestion })
      }
      this.setState({ answerInput: '', submitButtonText: 'Check' })
    } else {
      if (_.toUpper(answerInput) === _.toUpper(currentQuestion.answer)) {
        this.setState({ answerResult: 'You are correct!', score: this.state.score + 1 })
      } else {
        this.setState({ answerResult: 'Not quite!' })
      }
      this.setState({ submitButtonText: 'Next' })
    }
  }
  onRetry() {
    this.setState({
      answerInput: '',
      answerResult: '',
      score: 0,
      currentQuestion: this.props.navigation.getParam('currentTest').questions[0],
      finished: false,
    })
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
            You got {this.state.score}/{this.props.navigation.getParam('currentTest').questions.length} correct!
          </Text>
          <TouchableOpacity style={styles.submitButton} onPress={this.onRetry}>
            <Text style={styles.buttonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )
    }
    return (
      this.renderQuestion()
    )
  }
  render() {
    return (
      this.renderBody()
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
