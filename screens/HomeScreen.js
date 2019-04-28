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
    this.onTakeTest = this.onTakeTest.bind(this)
  }

  onTakeTest() {
    
  }

  render() {
    const {navigate} = this.props.navigation
    return (
      <View style={styles.container}>
          <TouchableOpacity style={styles.testButton} onPress={this.onTakeTest}>
          <Text style={styles.buttonText}>Take Test</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.createButton} onPress={() => navigate('Links')}>
          <Text style={styles.buttonText}>Create Test</Text>
          </TouchableOpacity>
      </View>
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
  buttonText: {
    fontSize: 28,
    fontWeight: "600",
    color: 'white',
  }
});
