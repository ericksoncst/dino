import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';
import Dino from './src/components/Dino';
import Obstacle from './src/components/Obstacles';
import jump from './src/actions/jump';


const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export default function App() {
  const [running, setRunning] = useState(true);
  const [gameEntities, setGameEntities] = useState({});

  const gameEngine = useRef(null);

const physics = (entities, { time }) => {
  if (!entities.physics || !entities.physics.engine) {
    return entities;
  }

  let engine = entities.physics.engine;
  const delta = Math.min(time.delta, 1000 / 60);

  Matter.Engine.update(engine, delta);

  return entities;
};


useEffect(() => {
  const engine = Matter.Engine.create({ enableSleeping: false });
  const world = engine.world;

  const dino = Matter.Bodies.rectangle(50, HEIGHT - 100, 50, 50, { label: 'Dino' });
  const ground = Matter.Bodies.rectangle(WIDTH / 2, HEIGHT - 25, WIDTH, 50, {
    isStatic: true,
    label: 'Ground',
  });

  Matter.World.add(world, [dino, ground]);

  setGameEntities({
    physics: { engine: engine, world: world },
    dino: { body: dino, color: 'green', renderer: Dino },
    ground: { body: ground, color: 'brown', renderer: Obstacle },
  });
}, []);



  return (
    <View style={styles.container}>
      {Object.keys(gameEntities).length > 0 && (
        <GameEngine
          ref={gameEngine}
          style={styles.gameContainer}
          systems={[physics, jump]}
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
        <TouchableOpacity
          style={styles.fullScreenButton}
          onPress={() => {
            setRunning(true);
          }}
        >
          <Text style={styles.fullScreenText}>RESTART</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
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
  },
  fullScreenText: { color: 'white', fontSize: 20 },
});
