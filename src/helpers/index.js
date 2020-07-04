import _ from 'lodash';

import { FIELD_SIZE, SHIP_TYPE, EMPTY_TYPE, UNKNOW_STATUS, SHIPS_SIZES } from '../constants';

const shipDirections = { right: 'right', bottom: 'bottom' };

const getRandomPoint = (max) => ({ x: _.random(max), y: _.random(max) });

const getRandomDirection = () => _.keys(shipDirections)[_.random(shipDirections.length)];

export const makePositionKey = ({ x, y }) => `${x}:${y}`;

const hasCollision = (positions, shipsPositions, fieldSize) => {
  const beginPoint = _.head(positions);
  const endPoint = _.last(positions);

  const isOutOfField = beginPoint.x < 0 || beginPoint.y < 0 || endPoint.x > fieldSize - 1 || endPoint.y > fieldSize - 1;
  if (isOutOfField) {
    return true;
  }

  const allPositions = _.flatten(shipsPositions);

  return !_.isEmpty(
    _.intersectionWith(
      allPositions,
      positions,
      (pos, { x, y }) => _.inRange(pos.x, x - 1, x + 2) && _.inRange(pos.y, y - 1, y + 2),
    ),
  );
};

const generateShipPositions = (shipSize, ships, fieldSize) => {
  const direction = getRandomDirection();
  const point = getRandomPoint(10);

  const ops = {
    [shipDirections.right]: (i) => ({ ...point, x: point.x + i }),
    [shipDirections.bottom]: (i) => ({ ...point, y: point.y + i }),
  };

  const positions = _.concat(point, _.range(1, shipSize).map(ops[direction]));

  if (hasCollision(positions, ships, fieldSize)) {
    return generateShipPositions(shipSize, ships, fieldSize);
  }

  return positions;
};

const generateShips = (fieldSize) => {
  const ships = SHIPS_SIZES.reduce((shipsPositions, shipSize) => {
    return [...shipsPositions, generateShipPositions(shipSize, shipsPositions, fieldSize)];
  }, []);

  const positionMap = ships.reduce((allPositions, shipPositions) => {
    const shipId = _.uniqueId();

    const result = shipPositions.reduce((acc, point) => ({ ...acc, [makePositionKey(point)]: shipId }), {});

    return { ...allPositions, ...result };
  }, {});

  return positionMap;
};

export const generateField = () => {
  const ships = generateShips(FIELD_SIZE);

  const ceils = _.flatMap(_.range(FIELD_SIZE), (y) => _.range(FIELD_SIZE).map((x) => ({ x, y })));
  const result = ceils.reduce((acc, { x, y }) => {
    const ceilId = makePositionKey({ x, y });
    const shipId = ships[ceilId];

    return {
      ...acc,
      [ceilId]: shipId
        ? { type: SHIP_TYPE, shipId, ceilId, status: UNKNOW_STATUS }
        : { type: EMPTY_TYPE, ceilId, status: UNKNOW_STATUS },
    };
  }, {});

  return result;
};
