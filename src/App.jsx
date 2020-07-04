import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Navbar, Row, Col, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { selectCeilsAllIds, selectGameInfo } from './store';
import { Ceil, Info } from './components';
import { GAME_RUNNING, GAME_FINISHED } from './constants';

import './styles.scss';

const App = () => {
  const { t } = useTranslation();
  const ceilsAllIds = useSelector(selectCeilsAllIds);
  const { status: gameStatus, hits, misses } = useSelector(selectGameInfo);

  return (
    <Container className="h-100">
      <Row>
        <Navbar>
          <Navbar.Brand href="/">{t('brand')}</Navbar.Brand>
        </Navbar>
      </Row>
      <Row>
        <Col sm="3" className="mb-4">
          <Info />
        </Col>
        <Col sm="7">
          {gameStatus === GAME_RUNNING && (
            <div className="field">
              {ceilsAllIds.map((ceilId) => (
                <Ceil key={ceilId} ceilId={ceilId} />
              ))}
            </div>
          )}

          {gameStatus === GAME_FINISHED && (
            <Table responsive>
              <tbody>
                <tr>
                  <th>{t('game.totalShots')}</th>
                  <td>{hits + misses}</td>
                </tr>
                <tr>
                  <th>{t('game.hitRate')}</th>
                  <td>{`${_.round((hits / (hits + misses)) * 100, 2)}%`}</td>
                </tr>
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default App;
