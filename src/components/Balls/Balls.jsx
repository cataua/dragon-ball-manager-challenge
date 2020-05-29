import React, { useState } from 'react';

import {
  Card as BCard,
  CardImg,
  CardBody,
  CardTitle,
  Badge,
  Col,
  Row,
  FormGroup,
  Label,
  Button,
  Input,
  Modal,
  ModalFooter,
  ModalBody,
  FormFeedback,
} from 'reactstrap';
import { Text, Flex } from 'rebass';

import styled from 'styled-components';

const Card = styled(BCard)`
  height: 280px;
  margin: 5px 0px;
`;

const Balls = ({ dragonBalls, profile }) => {
  const ballsList = [...dragonBalls]
  const [list, setList] = useState(ballsList);
  const [balls, setBalls] = useState(ballsList);
  const [modal, setModal] = useState(false);
  const [currentBall, setBall] = useState(null);
  const [ballcode, setBallcode] = useState('');
  const [codigoInvalido, setCodigoInvalido] = useState(false);

  const toggle = () => setModal(!modal);

  const validateBall = (ball) => {
    setBall(ball)
    setModal(true)
  }

  const filterByMe = () => {
    return balls.filter((ball) => ball.owner === profile.id);
  };

  const filterNotMe = () => {
    return balls.filter((ball) => ball.owner !== profile.id);
  };

  const filter = (value) => {
    const cases = {
      me: () => setList(filterByMe()),
      all: () => setList(balls),
      notme: () => setList(filterNotMe()),
    };
    return cases[value]();
  };

  const handlerBallcode = (code) => {
    setBallcode(code)
  }

  const updateList = (actualBall) => {
    const codigoValido = actualBall.ballcode === ballcode;
    if (codigoValido) {
      const newList = balls.map((ball) => {
        console.log('Ball id = id? ',actualBall.id, ball.id, (ball.id === actualBall.id))
        if(ball.id === actualBall.id) return {
          ...ball,
          owner: profile.id
        }
        return ball
      })
      profile.balls.push(actualBall.id)
  
      setBalls(newList)
      setList(newList)
      setModal(false)
      setBallcode(null)
      setCodigoInvalido(false);
    } else {
      setCodigoInvalido(!codigoValido);
    }
  }

  return (
    <>
      <Flex my='10px;' justifyContent='space-between'>
        <Text fontSize='50px'>Esferas</Text>
        <FormGroup>
          <Label for='filter'>Filtrar</Label>
          <Input
            type='select'
            name='select'
            id='filter'
            data-testid="filter"
            onChange={({ target: { value } }) => filter(value)}
          >
            <option value='all'>Todas as esferas</option>
            <option value='me'>Minhas esferas</option>
            <option value='notme'>Não tenho</option>
          </Input>
        </FormGroup>
      </Flex>
      <Row>
        {list.length > 0 ? (
          list.map((ball, i) => (
            <Col sm='3' key={ball.id}>
              <Card>
                <CardImg top width='100%' src={ball.image} alt={ball.name} />
                <CardBody>
                  <CardTitle>{ball.name}</CardTitle>
                  {ball.owner !== profile.id ? (
                    <>
                      <Badge color='danger'>Não encontrada</Badge>
                      <Button size='sm' color='warning' onClick={() => validateBall(ball)}>
                        encontrei
                      </Button>
                    </>
                  ) : (
                    <Badge color='success'>Encontrada</Badge>
                  )}
                </CardBody>
              </Card>
            </Col>
          ))
        ) : (
          <p>Houve algum problema na busca das esferas</p>
        )}
      </Row>
      {/* Validate ball */}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
          <FormGroup>
            <Label for='code'>Insira o código da esfera de {currentBall?.name}:</Label>
            <Input
              type='number'
              name='ballcode'
              id='code'
              value={ballcode}
              invalid={codigoInvalido}
              onChange={({target: { value }}) => handlerBallcode(value)}
              placeholder='Ex: 23412'
            />
            <FormFeedback>Sr. Satan diz que você está tentando trapacear: Código inválido!</FormFeedback>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
        <Button color='success' onClick={() => updateList(currentBall)}>
            Validar
          </Button>
          <Button color='secondary' onClick={toggle}>
            Voltar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Balls;
