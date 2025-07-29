import Matter from 'matter-js';
import { Constants } from '../utils/constants';

const GroundMovement = (entities, { time }) => {
  const engine = entities.physics.engine;
  const speed = entities.gameStatus.speed;

  // Itera sobre os dois pedaços de chão
  for (let i = 1; i <= 2; i++) {
    const ground = entities['ground' + i];

    if (ground) {
      // Move o chão para a esquerda
      Matter.Body.translate(ground.body, { x: -speed, y: 0 });

      // Verifica se o chão saiu completamente da tela pela esquerda
      // A posição é o centro do corpo, então verificamos se o centro mais metade da largura é < 0
      if (ground.body.position.x <= -Constants.GROUND_WIDTH / 2) {
        // Teletransporta o chão para a direita, depois do outro pedaço de chão
        // A nova posição x será a posição atual + o dobro da largura do chão
        Matter.Body.setPosition(ground.body, {
          x: ground.body.position.x + Constants.GROUND_WIDTH * 2,
          y: ground.body.position.y
        });
      }
    }
  }

  return entities;
};

export default GroundMovement;