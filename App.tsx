import React, { Component } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';
import { Constants } from './src/utils/constants';
import Dino from './src/entities/Dino';
import Ground from './src/entities/Ground';
import Physics from './src/systems/Physics';
import TouchControl from './src/systems/TouchControl';
import GroundMovement from './src/systems/GroundMovement';
import CactusSystem from './src/systems/CactusSystem';
import AnimationSystem from './src/systems/AnimationSystem';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.gameEngine = null;
    this.entities = this.setupWorld();

    this.state = {
        running: false,
        gameOver: false
    };
  }

  setupWorld = () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;

    // world.gravity.y = 1.0;

    const dinoSize = { width: Constants.DINO_WIDTH, height: Constants.DINO_HEIGHT };
    const dinoHitbox = { 
        width: dinoSize.width * 0.8, 
        height: dinoSize.height * 0.9 
    };

    let dino = Dino(
       world,
        { x: Constants.MAX_WIDTH / 4, y: Constants.MAX_HEIGHT / 2 },
        dinoHitbox,
        dinoSize
    );

    // let ground = Ground(
    //     world,
    //     { x: Constants.MAX_WIDTH / 2, y: Constants.MAX_HEIGHT - (Constants.GROUND_HEIGHT / 2) },
    //     { width: Constants.MAX_WIDTH, height: Constants.GROUND_HEIGHT }
    // );

     let ground1 = Ground(
        world,
        { x: Constants.GROUND_WIDTH / 2, y: Constants.MAX_HEIGHT - (Constants.GROUND_HEIGHT / 2) - Constants.GROUND_Y_OFFSET }, // <-- Modifique esta linha
        { width: Constants.GROUND_WIDTH, height: Constants.GROUND_HEIGHT }
    );

    // O chão 2
    let ground2 = Ground(
        world,
        { x: Constants.GROUND_WIDTH + (Constants.GROUND_WIDTH / 2), y: Constants.MAX_HEIGHT - (Constants.GROUND_HEIGHT / 2) - Constants.GROUND_Y_OFFSET }, // <-- Modifique esta linha
        { width: Constants.GROUND_WIDTH, height: Constants.GROUND_HEIGHT }
    );

    let cactusSpawner = {
        spawnTimer: Constants.OBSTACLE_INTERVAL_MIN,
        renderer: null
    };

    return {
      physics: { engine: engine, world: world },
      dino: dino,
      // ground: ground,
      ground1: ground1,
      ground2: ground2,
      cactusSpawner: cactusSpawner
    };
  };

  onEvent = (e) => {
      if (e.type === "game-over") {
          this.setState({ running: false, gameOver: true });
      }
  }

  reset = () => {
    this.gameEngine.swap(this.setupWorld());
    this.setState({ running: true, gameOver: false });
  }

  render() {
    return (
      <View style={styles.container}>
         <SafeAreaView style={styles.container}>
          <StatusBar hidden={true} />
          <GameEngine
            ref={ref => { this.gameEngine = ref; }}
            style={styles.gameContainer}
            systems={[Physics, TouchControl, GroundMovement, CactusSystem, AnimationSystem]}
            entities={this.entities}
            running={this.state.running}
            onEvent={this.onEvent}
          />
          {!this.state.running && (
              <TouchableOpacity style={styles.fullScreenButton} onPress={this.reset}>
                  <View style={styles.gameOverContainer}>
                      <Text style={styles.gameOverText}>{this.state.gameOver ? "Game Over" : "Welcome 🦖"}</Text>
                      <Text style={styles.restartText}>{this.state.gameOver ? "Tap to Restart" : "Start Game"}</Text>
                  </View>
              </TouchableOpacity>
          )}
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
    flex: 1,
  },
  fullScreenButton: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  gameOverContainer: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
  },
  gameOverText: {
    fontSize: 48,
    color: 'white',
    fontWeight: 'bold',
  },
  restartText: {
    fontSize: 20,
    color: 'white',
    marginTop: 10,
  }
});