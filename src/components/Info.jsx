import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { selectGameInfo, selectCeilsById, selectShipsInfoById, selectShipsInfoAllIds, actions } from '../store';
import { GAME_IDLE } from '../constants';
import { generateField } from '../helpers';

const Info = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { status: gameStatus, misses, hits } = useSelector(selectGameInfo);
  const shipsById = useSelector(selectShipsInfoById);
  const shipsAllIds = useSelector(selectShipsInfoAllIds);
  const ceilsById = selectCeilsById;

  const handleStart = useCallback(() => {
    const ceils = generateField();
    dispatch(actions.startGame({ ceils }));
  }, [dispatch]);

  return (
    <div className="">
      <Table responsive>
        <tbody>
          <tr>
            <th>{t('game.status')}</th>
            <td>{t(`game.statuses.${gameStatus}`)}</td>
          </tr>
          <tr>
            <th>{t('game.misses')}</th>
            <td>{misses}</td>
          </tr>
          <tr>
            <th>{t('game.hits')}</th>
            <td>{hits}</td>
          </tr>
        </tbody>
      </Table>

      {gameStatus === GAME_IDLE && (
        <Button onClick={handleStart} className="d-block">
          {t('game.start')}
        </Button>
      )}

      {gameStatus !== GAME_IDLE && (
        <Button onClick={handleStart} className="d-block">
          {t('game.restart')}
        </Button>
      )}
    </div>
  );
};

export default Info;
