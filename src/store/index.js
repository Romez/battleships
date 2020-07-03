/* eslint-disable no-param-reassign */
import { combineReducers } from 'redux';
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

import {
  MISS_STATUS,
  DEAD_STATUS,
  HIT_STATUS,
  GAME_IDLE,
  GAME_RUNNING,
  SHIP_TYPE,
  GAME_FINISHED,
  SHIPS_SIZES,
} from '../constants';

const totalShipsCeilsCount = _.sum(SHIPS_SIZES);

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    status: GAME_IDLE,
    hits: 0,
    misses: 0,
    ships: {
      byId: {},
      allIds: [],
    },
  },
  reducers: {
    startGame: (state, { payload }) => {
      state.status = GAME_RUNNING;

      const ships = _.values(payload.ceils)
        .filter(({ type }) => type === SHIP_TYPE)
        .reduce((acc, ceil) => ({ ...acc, [ceil.shipId]: [...(acc[ceil.shipId] || []), ceil.ceilId] }), {});

      state.ships.byId = ships;
      state.ships.allIds = _.keys(ships);
    },
    missAction: (state) => {
      state.misses += 1;
    },
    hitAction: (state) => {
      state.hits += 1;
      if (totalShipsCeilsCount === state.hits) {
        state.status = GAME_FINISHED;
      }
    },
  },
});

const ceilsSlice = createSlice({
  name: 'ceils',
  initialState: {
    byId: {},
    allIds: [],
  },
  extraReducers: {
    [gameSlice.actions.startGame]: (state, { payload }) => {
      const { ceils } = payload;
      state.byId = ceils;
      state.allIds = _.keys(ceils);
    },
    [gameSlice.actions.missAction]: (state, { payload }) => {
      const { ceilId } = payload.ceil;
      state.byId[ceilId].status = MISS_STATUS;
    },
    [gameSlice.actions.hitAction]: (state, { payload }) => {
      const { ceilId, shipId } = payload.ceil;

      state.byId[ceilId].status = HIT_STATUS;

      const allShipCeils = _.values(state.byId).filter((ceil) => ceil.shipId === shipId);
      if (_.every(allShipCeils, ({ status }) => status === HIT_STATUS)) {
        allShipCeils.forEach((c) => {
          c.status = DEAD_STATUS;
        });
      }
    },
  },
});

export const actions = {
  ...ceilsSlice.actions,
  ...gameSlice.actions,
};

export default combineReducers({
  ceils: ceilsSlice.reducer,
  game: gameSlice.reducer,
});

export const selectCeilsById = (store) => store.ceils.byId;

export const selectCeilsAllIds = (store) => store.ceils.allIds;

export const selectGameInfo = (store) => store.game;

export const selectShipsInfoById = (store) => store.game.ships.byId;

export const selectShipsInfoAllIds = (store) => store.game.ships.allIds;
