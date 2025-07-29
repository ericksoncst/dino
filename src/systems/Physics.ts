import Matter from 'matter-js';

const Physics = (entities, { time, dispatch }) => {
  let engine = entities.physics.engine;
   const delta = Math.min(time.delta, 1000 / 60);

  Matter.Events.on(engine, 'collisionStart', (event) => {
    let pairs = event.pairs;

    pairs.forEach((pair) => {
      const { bodyA, bodyB } = pair;

      if ((bodyA.label === 'Dino' && bodyB.label === 'Ground') ||
          (bodyA.label === 'Ground' && bodyB.label === 'Dino')) {
        entities.dino.isGrounded = true;
      }

      if ((bodyA.label === 'Dino' && bodyB.label === 'Obstacle') ||
          (bodyA.label === 'Obstacle' && bodyB.label === 'Dino')) {
        dispatch({ type: "game-over" });
      }
    });
  });

  Matter.Engine.update(engine, delta);

  return entities;
};

export default Physics;