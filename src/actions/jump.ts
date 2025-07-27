import Matter from 'matter-js';

const jump = (entities, { touches }) => {
  let dino = entities.dino.body;

  touches
    .filter((t) => t.type === 'press')
    .forEach(() => {
      const velocityY = dino.velocity.y;

      // Só pula se estiver no chão
      if (Math.abs(velocityY) < 0.01) {
        Matter.Body.setVelocity(dino, {
          x: dino.velocity.x,
          y: -10, // valor negativo = sobe
        });
      }
    });

  return entities;
};

export default jump;
