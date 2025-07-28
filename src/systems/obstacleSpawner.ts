import Matter from 'matter-js';
import { Dimensions } from 'react-native';
import Obstacle from '../entities/Obstacle';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const cactusTypes = [
  require('../assets/images/cactus_1.png'),
  require('../assets/images/cactus_2.png'),
  require('../assets/images/cactus_3.png'),
];

let nextObstacleTime = 0;

const obstacleSpawner = (entities, { time, dispatch }) => {
  const world = entities.physics.world;

  if (time.current >= nextObstacleTime) {
    const obstacleWidth = 20;
    const obstacleHeight = 60;
    const x = WIDTH + obstacleWidth / 2;
    const groundHeight = 50;
    const y = HEIGHT - groundHeight - obstacleHeight / 2;

    const obstacle = Matter.Bodies.rectangle(
      x,
      y,
      obstacleWidth,
      obstacleHeight,
      { isStatic: true, label: 'Obstacle' }
    );

    Matter.World.add(world, [obstacle]);

    const randomIndex = Math.floor(Math.random() * cactusTypes.length);
    const cactusImage = cactusTypes[randomIndex];

    entities['obstacle_' + time.current] = {
      body: obstacle,
      color: 'red',
      renderer: Obstacle,
      image: cactusImage,
    };

    nextObstacleTime = time.current + 1500;
  }

  Object.keys(entities).forEach((key) => {
    if (key.startsWith('obstacle_')) {
      const obstacle = entities[key].body;
      Matter.Body.translate(obstacle, { x: -2, y: 0 });

      if (obstacle.position.x < -50) {
        Matter.World.remove(world, obstacle);
        delete entities[key];
      }
    }
  });

  return entities;
};

export default obstacleSpawner;
