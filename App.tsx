import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';
import Dino from './src/components/Dino';
import Ground from './src/components/Ground';
import jump from './src/actions/jump';
import obstacleSpawner from './src/actions/obstacleSpawner';
import physics, { resetCollisionState } from './src/actions/physics';
import scrollGround from './src/actions/scrollGround';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export default function App() {
  const [running, setRunning] = useState(true);
  const [gameEntities, setGameEntities] = useState({});
  const gameEngine = useRef(null);

  const setupWorld = () => {
    const engine = Matter.Engine.create({ enableSleeping: false });
    const world = engine.world;

    const dino = Matter.Bodies.rectangle(50, HEIGHT - 100, 50, 50, { 
      label: 'Dino',
      inertia: Infinity,
      frictionAir: 0.0,
    });
    
    dino.plugin = {
      constrainX: true,
    };
    const ground = Matter.Bodies.rectangle(WIDTH / 2, HEIGHT - 25, WIDTH, 50, {
      isStatic: true,
      label: 'Ground',
    });

    Matter.World.add(world, [dino, ground]);

    return {
      physics: { engine: engine, world: world },
      dino: { body: dino, color: 'green', renderer: Dino },
      ground: { body: ground, color: 'black', renderer: Ground },
    };
  };

  useEffect(() => {
    setGameEntities(setupWorld());
  }, []);

 const restart = () => {
  resetCollisionState();
  const newEntities = setupWorld();
  setGameEntities(newEntities);
  gameEngine.current.swap(newEntities);
  setRunning(true);
};

  return (
    <View style={styles.container}>
      {Object.keys(gameEntities).length > 0 && (
        <GameEngine
          ref={gameEngine}
          style={styles.gameContainer}
          systems={[physics, jump, obstacleSpawner]}
          entities={gameEntities}
          running={running}
          onEvent={(e) => {
            if (e.type === 'game-over') {
              setRunning(false);
            }
          }}
        />
      )}
      {!running && (
        <View style={{ justifyContent: 'space-around', alignItems: 'center',}}>
          <Text style={styles.gameOverText}>Game Over</Text>
          <TouchableOpacity style={styles.fullScreenButton} onPress={restart}>
            <Text style={styles.fullScreenText}>RESTART</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  gameContainer: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, flex: 1 },
  fullScreenButton: {
    position: 'absolute',
    top: HEIGHT / 2 - 50,
    left: WIDTH / 2 - 100,
    width: 200,
    height: 100,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  fullScreenText: { color: 'white', fontSize: 20 },
  gameOverText: { color: 'black', fontSize: 20, marginTop: HEIGHT / 3 },
});
