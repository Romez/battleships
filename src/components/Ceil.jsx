/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';

import { SHIP_TYPE, EMPTY_TYPE, MISS_STATUS, UNKNOW_STATUS, HIT_STATUS, DEAD_STATUS } from '../constants';
import { actions, selectCeilsById } from '../store';

const iconByStatus = {
  [MISS_STATUS]: 'O',
  [HIT_STATUS]: 'V',
  [DEAD_STATUS]: 'X',
  [UNKNOW_STATUS]: ' ',
};

const variantByStatus = {
  [UNKNOW_STATUS]: 'outline-secondary',
  [MISS_STATUS]: 'outline-secondary',
  [HIT_STATUS]: 'outline-warning',
  [DEAD_STATUS]: 'danger',
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

  const icon = iconByStatus[ceil.status];

  return (
    <Button
      disabled={ceil.status !== UNKNOW_STATUS}
      variant={variantByStatus[ceil.status]}
      size="sm"
      onClick={handleOnClick}
    >
      {icon}
    </Button>
  );
};

export default Ceil;
