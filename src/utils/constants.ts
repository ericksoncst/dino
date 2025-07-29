import { Dimensions } from 'react-native';

export const Constants = {
    MAX_WIDTH: Dimensions.get('window').width,
    MAX_HEIGHT: Dimensions.get('window').height,
    
    DINO_WIDTH: 50,
    DINO_HEIGHT: 50,

    GROUND_Y_OFFSET: 80,
    GROUND_HEIGHT: 24,
    GROUND_WIDTH: 2400,
    GROUND_SPEED: 2,

    CACTUS_WIDTH: 40,
    CACTUS_HEIGHT: 80,
    OBSTACLE_INTERVAL_MIN: 2000,
    OBSTACLE_INTERVAL_MAX: 4000
};