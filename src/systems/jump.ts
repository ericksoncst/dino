import Matter from 'matter-js';
import { Dimensions } from 'react-native';

const { height: HEIGHT } = Dimensions.get('window');

const jump = (entities, { touches }) => {
  const dino = entities.dino.body;

  const groundY = HEIGHT - 75;

  touches
    .filter((t) => t.type === 'press')
    .forEach(() => {
      if (Math.abs(dino.velocity.y) < 0.01) {
        Matter.Body.setVelocity(dino, {
          x: dino.velocity.x,
          y: -9,
        });
      }
    });

  const isOnGround = dino.position.y >= groundY - 1;
  entities.dino.isJumping = !isOnGround;

  return entities;
};

export default jump;
