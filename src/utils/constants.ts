// import { Dimensions } from 'react-native';

// export const Constants = {
//     MAX_WIDTH: Dimensions.get('window').width,
//     MAX_HEIGHT: Dimensions.get('window').height,
    
//     DINO_WIDTH: 50,
//     DINO_HEIGHT: 50,

//     GROUND_Y_OFFSET: 80,
//     GROUND_HEIGHT: 24,
//     GROUND_WIDTH: 2400,
//     GROUND_SPEED: 2,

//     CACTUS_WIDTH: 40,
//     CACTUS_HEIGHT: 80,
//     OBSTACLE_INTERVAL_MIN: 2000,
//     OBSTACLE_INTERVAL_MAX: 4000
// };

// src/utils/constants.js (Aprimorado)

import { Dimensions } from 'react-native';

// Dimensões base do jogo, para calcular a escala (semelhante ao 800x200 do projeto web)
const BASE_GAME_WIDTH = 800;
const BASE_GAME_HEIGHT = 200;

const getScaleRatio = () => {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    // Calcula a proporção de escala para encaixar o jogo na tela, mantendo a proporção
    const widthRatio = screenWidth / BASE_GAME_WIDTH;
    const heightRatio = screenHeight / BASE_GAME_HEIGHT;
    
    // Usa a menor proporção para garantir que tudo caiba na tela
    return Math.min(widthRatio, heightRatio) * 1.5; // Multiplicador para ajustar o tamanho geral
};

const SCALE_RATIO = getScaleRatio();

// Configuração dos diferentes tipos de cactos, com seus tamanhos base
const CACTI_CONFIG = [
  { width: 48 / 1.5, height: 70 / 1.5, type: 1 }, // Cacto tipo 1
  { width: 98 / 1.5, height: 70 / 1.5, type: 2 }, // Cacto tipo 2
  { width: 68 / 1.5, height: 50 / 1.5,  type: 3 }, // Cacto tipo 3
];

export const Constants = {
    MAX_WIDTH: Dimensions.get('window').width,
    MAX_HEIGHT: Dimensions.get('window').height,
    SCALE_RATIO,
    CACTI_CONFIG,
    
    DINO_WIDTH: 50,
    DINO_HEIGHT: 50,

    GROUND_Y_OFFSET: 80,
    GROUND_HEIGHT: 24,
    GROUND_WIDTH: 2400, // Largura do asset da imagem do chão
    GROUND_SPEED: 2,

    OBSTACLE_INTERVAL_MIN: 2000,
    OBSTACLE_INTERVAL_MAX: 4000
};