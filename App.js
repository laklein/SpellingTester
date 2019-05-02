import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './src/navigation/AppNavigator';
import { SQLite } from 'expo';
import _ from 'lodash'

const db = SQLite.openDatabase('spellingTester.db');

export default class App extends React.Component {
  state = {
    databaseInitializationComplete: false,
    isLoadingComplete: false,
    tests: [],
  };

  componentDidMount() {
    this.initializeDatabase()
    this.loadTests()
  }

  initializeDatabase() {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists tests (id integer primary key not null, name text, completed int, score int);'
      )
      tx.executeSql(
        'create table if not exists questions (id integer primary key not null, test_id int, body text, answer text, foreign key(test_id) references tests(id));'
      )
    });
  }

  loadTests() {
    db.transaction(tx => {
      tx.executeSql('select * from tests', [], (tx, { rows: { _array } }) => {
        if (_.isEmpty(_array)) {
          this.createExampleTest()
        }
        let tests = []
        _.map(_array, (row) => {
          tx.executeSql('select * from questions where test_id = ?', [row.id], (tx, { rows: { _array } }) => {
            tests.push({
              id: row.id,
              name: row.name,
              completed: row.completed,
              score: row.score,
              questions: _array,
            })
            this.setState({ tests: tests })
          })
        })
      }, (tx, error) =>
        console.log('Error: ', error)
      )
    })
  }

  createExampleTest() {
    this.exampleInserts()
    this.loadTests()
  }

  exampleInserts() {
    db.transaction(tx => {
      tx.executeSql(`insert into tests (name, completed) values ("Example Test", 0);`, [], (tx, result) => {
        tx.executeSql(`insert into questions (test_id, body, answer) values (${id}, "porcupine", "porcupine");`)
        tx.executeSql(`insert into questions (test_id, body, answer) values (${id}, "watermelon", "watermelon");`)
        tx.executeSql(`insert into questions (test_id, body, answer) values (${id}, "television", "television");`)
      })
    })
  }

  exampleUpdate() {
    db.transaction(tx => {
      tx.executeSql(`update tests set completed = 1 where id = 1;`);
    })
  }

  exampleDelete() {
    db.transaction(tx => {
      tx.executeSql(`delete from tests where id = 1;`)
    })
  }

  exampleDropTables() {
    db.transaction(tx => {
      tx.executeSql(`drop table if exists questions;`)
      tx.executeSql(`drop table if exists tests;`)
    })
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator screenProps={{ tests: this.state.tests }}/>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
