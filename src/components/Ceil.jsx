import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';

import { SHIP_TYPE, EMPTY_TYPE, MISS_STATUS, UNKNOW_STATUS, HIT_STATUS, DEAD_STATUS } from '../constants';
import { actions, selectCeilsById } from '../store';

const iconByStatus = {
  [MISS_STATUS]: '-',
  [HIT_STATUS]: '+',
  [DEAD_STATUS]: 'X',
  [UNKNOW_STATUS]: ' ',
};

const actionsByCeilType = {
  [SHIP_TYPE]: actions.hitAction,
  [EMPTY_TYPE]: actions.missAction,
};

const Ceil = ({ ceilId }) => {
  const dispatch = useDispatch();
  const ceilsById = useSelector(selectCeilsById);
  const ceil = ceilsById[ceilId];

  const handleOnClick = useCallback(() => {
    const action = actionsByCeilType[ceil.type];
    dispatch(action({ ceil }));
  }, [dispatch, ceil]);

  return (
    <Button
      disabled={ceil.status !== UNKNOW_STATUS}
      size="sm"
      variant="light"
      className="rounded-0 border"
      onClick={handleOnClick}
    >
      {ceil.type === SHIP_TYPE && ceil.status === UNKNOW_STATUS ? 1 : iconByStatus[ceil.status]}
    </Button>
  );
};

export default Ceil;
