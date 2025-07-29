import Matter from 'matter-js';

const Physics = (entities, { time, dispatch }) => { // 1. Garanta que 'dispatch' está aqui
  let engine = entities.physics.engine;
   const delta = Math.min(time.delta, 1000 / 60);

  Matter.Events.on(engine, 'collisionStart', (event) => {
    let pairs = event.pairs;

    pairs.forEach((pair) => {
      const { bodyA, bodyB } = pair;

      // Colisão para poder pular de novo
      if ((bodyA.label === 'Dino' && bodyB.label === 'Ground') ||
          (bodyA.label === 'Ground' && bodyB.label === 'Dino')) {
        entities.dino.isGrounded = true;
      }

      // 2. Colisão de Game Over
      if ((bodyA.label === 'Dino' && bodyB.label === 'Obstacle') ||
          (bodyA.label === 'Obstacle' && bodyB.label === 'Dino')) {
        // Envia um evento para o GameEngine
        dispatch({ type: "game-over" });
      }
    });
  });

  Matter.Engine.update(engine, delta);

  return entities;
};

export default Physics;