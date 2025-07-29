import Matter from 'matter-js';
import { Constants } from '../utils/constants';
import Cactus from '../entities/Cactus';

let obstacleCount = 0; // Contador para dar chaves únicas aos novos cactos

// Função para gerar um número aleatório em um intervalo
const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const CactusSystem = (entities, { time, dispatch }) => {
  const engine = entities.physics.engine;
  const world = entities.physics.world;
  const spawner = entities.cactusSpawner;

  // 1. Mover e remover cactos existentes
  Object.keys(entities).forEach(key => {
    if (key.startsWith('obstacle_')) {
      const cactus = entities[key];
      // Mover para a esquerda
      Matter.Body.translate(cactus.body, { x: -Constants.GROUND_SPEED, y: 0 });

      // Remover se saiu da tela
      if (cactus.body.position.x < -Constants.CACTUS_WIDTH / 2) {
        Matter.World.remove(world, cactus.body); // Remove o corpo do mundo da física
        delete entities[key]; // Remove a entidade do jogo
      }
    }
  });

  // 2. Gerar novos cactos
  spawner.spawnTimer -= time.delta;
  if (spawner.spawnTimer <= 0) {
    // Resetar o timer com um valor aleatório
    spawner.spawnTimer = randomBetween(Constants.OBSTACLE_INTERVAL_MIN, Constants.OBSTACLE_INTERVAL_MAX);

    // Criar o novo cacto
    const cactusType = randomBetween(1, 3); // Escolhe um dos 3 tipos de cacto
    const newCactusKey = 'obstacle_' + obstacleCount++;
    const newCactus = Cactus(
      world,
      // Posição inicial: fora da tela, à direita
      {  x: Constants.MAX_WIDTH + (Constants.CACTUS_WIDTH / 2), 
        y: Constants.MAX_HEIGHT - Constants.GROUND_HEIGHT - (Constants.CACTUS_HEIGHT / 2) - Constants.GROUND_Y_OFFSET // <-- Modifique esta linha
      },
      { width: Constants.CACTUS_WIDTH, height: Constants.CACTUS_HEIGHT },
      cactusType
    );

    entities[newCactusKey] = newCactus;
  }

  return entities;
};

export default CactusSystem;