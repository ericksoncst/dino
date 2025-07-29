import React, { Component } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';
import { Constants } from './src/utils/constants';
import Dino from './src/entities/Dino';
import Ground from './src/entities/Ground';
import Physics from './src/systems/Physics';
import TouchControl from './src/systems/TouchControl';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.gameEngine = null;
    this.entities = this.setupWorld();
  }

  setupWorld = () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;

    world.gravity.y = 1.0;

    let dino = Dino(
        world,
        { x: Constants.MAX_WIDTH / 4, y: Constants.MAX_HEIGHT / 2 },
        { width: Constants.DINO_WIDTH, height: Constants.DINO_HEIGHT }
    );

    let ground = Ground(
        world,
        { x: Constants.MAX_WIDTH / 2, y: Constants.MAX_HEIGHT - (Constants.GROUND_HEIGHT / 2) },
        { width: Constants.MAX_WIDTH, height: Constants.GROUND_HEIGHT }
    );

    return {
      physics: { engine: engine, world: world },
      dino: dino,
      ground: ground,
    };
  };

  render() {
    return (
      <View style={styles.container}>
         <SafeAreaView style={styles.container}>
          <StatusBar hidden={true} />
          <GameEngine
            ref={ref => { this.gameEngine = ref; }}
            style={styles.gameContainer}
            systems={[Physics, TouchControl]} 
            entities={this.entities}
          />
      </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gameContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});