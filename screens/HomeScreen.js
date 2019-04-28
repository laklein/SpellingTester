import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'SpellingTester',
  };

  constructor(props) {
    super(props)
    this.state = {}
    this.onTakeTest = this.onTakeTest.bind(this)
  }

  onTakeTest() {
    
  }

  render() {
    const {navigate} = this.props.navigation
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.mainWrapper}>
          <TouchableOpacity style={styles.button} onPress={this.onTakeTest}>
            <Text style={styles.buttonText}>Take Test</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigate('Links')}>
            <Text style={styles.buttonText}>Create Test</Text>
          </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  mainWrapper: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  button: {
    margin: 10,
    padding: 20,
    height: 50,
    width: '100%',
    backgroundColor: 'blue',
  },
  buttonText: {
    color: 'white',
  }
});
