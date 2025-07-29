import Matter from 'matter-js';
import { Constants } from '../utils/constants';
import Cactus from '../entities/Cactus';

let obstacleCount = 0;


const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const CactusSystem = (entities, { time, dispatch }) => {
  const engine = entities.physics.engine;
  const world = entities.physics.world;
  const spawner = entities.cactusSpawner;
  const status = entities.gameStatus;

  //Mover e remover cactos existentes
  Object.keys(entities).forEach(key => {
    if (key.startsWith('obstacle_')) {
      const cactus = entities[key];
      // Mover para a esquerda
      Matter.Body.translate(cactus.body, { x: -status.speed, y: 0 });

      // Remover se saiu da tela
      if (cactus.body.position.x < -Constants.CACTUS_WIDTH / 2) {
        Matter.World.remove(world, cactus.body); // Remove o corpo do mundo da física
        delete entities[key]; // Remove a entidade do jogo
      }
    }
  });

  // Gerar novos cactos
  spawner.spawnTimer -= time.delta;
  if (spawner.spawnTimer <= 0) {

    const originalSize = { width: Constants.CACTUS_WIDTH, height: Constants.CACTUS_HEIGHT };

    const hitboxSize = { 
      width: originalSize.width * 0.7, 
      height: originalSize.height * 0.9
    };

    // Resetar o timer com um valor aleatório
    spawner.spawnTimer = randomBetween(Constants.OBSTACLE_INTERVAL_MIN, Constants.OBSTACLE_INTERVAL_MAX);

    // Criar o novo cacto
    const cactusType = randomBetween(1, 3); // Escolhe um dos 3 tipos de cacto
    const newCactusKey = 'obstacle_' + obstacleCount++;
    const newCactus = Cactus(
      world,
      { x: Constants.MAX_WIDTH + (originalSize.width / 2), y: Constants.MAX_HEIGHT - Constants.GROUND_HEIGHT - (originalSize.height / 2) - Constants.GROUND_Y_OFFSET },
       hitboxSize,
        cactusType,
        originalSize 
    );

    entities[newCactusKey] = newCactus;
  }

  return entities;
};

export default CactusSystem;