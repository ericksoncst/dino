import Matter from 'matter-js';

let hasCollided = false;
let listenerAttached = false;

const physics = (entities, { time, dispatch }) => {
  const engine = entities.physics.engine;

  const delta = Math.min(time.delta, 1000 / 60);
  Matter.Engine.update(engine, delta);

  const dino = entities.dino.body;
  dino.position.x = 50;
  dino.velocity.x = 0;

  if (!listenerAttached) {
    Matter.Events.on(engine, 'collisionStart', (event) => {
      event.pairs.forEach((pair) => {
        const labels = [pair.bodyA.label, pair.bodyB.label];
        if (!hasCollided && labels.includes('Dino') && labels.includes('Obstacle')) {
          hasCollided = true;
          dispatch({ type: 'game-over' });
        }
      });
    });
    listenerAttached = true;
  }

  return entities;
};

export const resetCollisionState = () => {
  hasCollided = false;
  listenerAttached = false;
};

export default physics;
