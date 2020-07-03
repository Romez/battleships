import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Navbar, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { selectCeilsAllIds, selectGameInfo } from './store';
import { Ceil, Info } from './components';
import { GAME_RUNNING } from './constants';

import './styles.scss';

const App = () => {
  const { t } = useTranslation();
  const ceilsAllIds = useSelector(selectCeilsAllIds);
  const { status: gameStatus } = useSelector(selectGameInfo);

  return (
    <Container className="h-100">
      <Row>
        <Navbar>
          <Navbar.Brand href="#home">{t('brand')}</Navbar.Brand>
        </Navbar>
      </Row>
      <Row>
        <Col sm="3">
          <Info />
        </Col>
        <Col sm="9">
          {gameStatus === GAME_RUNNING && (
            <div className="field">
              {ceilsAllIds.map((ceilId) => {
                return <Ceil key={ceilId} ceilId={ceilId} />;
              })}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default App;
