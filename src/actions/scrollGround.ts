import Matter from 'matter-js';

const SPEED = 2;

const scrollGround = (entities) => {
  const ground = entities.ground.body;
  
  // Move o chão para a esquerda
  Matter.Body.setPosition(ground, {
    x: ground.position.x - SPEED,
    y: ground.position.y
  });

  // Reseta a posição quando sair completamente da tela
  if (ground.position.x < -entities.ground.body.bounds.max.x / 2) {
    Matter.Body.setPosition(ground, {
      x: entities.ground.body.bounds.max.x / 2,
      y: ground.position.y
    });
  }

  return entities;
};

export default scrollGround;