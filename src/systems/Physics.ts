import Matter from 'matter-js';

const Physics = (entities, { time, dispatch }) => {
  let engine = entities.physics.engine;

  Matter.Events.on(engine, 'collisionStart', (event) => {
    let pairs = event.pairs;

    pairs.forEach((pair) => {
      const { bodyA, bodyB } = pair;
      if ((bodyA.label === 'Dino' && bodyB.label === 'Ground') ||
          (bodyA.label === 'Ground' && bodyB.label === 'Dino')) {
        entities.dino.isGrounded = true;
      }
    });
  });

  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;