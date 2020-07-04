import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table, ProgressBar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { selectGameInfo, actions } from '../store';
import { GAME_IDLE, SHIPS_SIZES } from '../constants';
import { generateField } from '../helpers';

const Info = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { status: gameStatus, hits } = useSelector(selectGameInfo);

  const handleStart = useCallback(() => {
    const ceils = generateField();
    dispatch(actions.startGame({ ceils }));
  }, [dispatch]);

  const progress = _.round((hits / _.sum(SHIPS_SIZES)) * 100);

  return (
    <div className="">
      <Table responsive>
        <tbody>
          <tr>
            <th>{t('game.status')}</th>
            <td>{t(`game.statuses.${gameStatus}`)}</td>
          </tr>
        </tbody>
      </Table>

      {gameStatus !== GAME_IDLE && (
        <ProgressBar animated now={progress} className="mb-2" label={t('game.progress', { progress })} />
      )}

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
