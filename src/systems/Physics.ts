import Matter from 'matter-js';

const Physics = (entities, { time, dispatch }) => {
  let engine = entities.physics.engine;
  const delta = Math.min(time.delta, 1000 / 60);

  // --- Verificação de Colisão Manual ---
  const dino = entities.dino;
  const ground1 = entities.ground1;
  const ground2 = entities.ground2;

  const isCollidingWithGround = 
      Matter.Collision.collides(dino.body, ground1.body) ||
      Matter.Collision.collides(dino.body, ground2.body);

  if (isCollidingWithGround) {
    dino.isGrounded = true;
  }

  for (const key in entities) {
    if (key.startsWith('obstacle_')) {
      const obstacle = entities[key];
      if (Matter.Collision.collides(dino.body, obstacle.body)) {
        dispatch({ type: 'game-over' });
        break; 
      }
    }
  }

  Matter.Engine.update(engine, delta);

  return entities;
};

export default Physics;