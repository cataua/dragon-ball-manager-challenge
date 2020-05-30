import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, getByText } from '@testing-library/react'
import Balls from './Balls'
import esferas from '../../mocks/esferas.json';
import { profile } from '../../mocks/profile.json';
import esferaSuccess from '../../mocks/esferasSuccess.json';
import profileSucess from '../../mocks/profileSuccess.json';

it('Should be render component Balls w all balls', () => {
  const { debug } = render(<Balls dragonBalls={esferas.balls} profile={profile} />);
  const totalCards = document.getElementsByClassName('card');
  const totalBalls = esferas.balls.length;
  expect(totalCards.length).toBe(totalBalls);
  })

it('Should be render component Balls w found balls', () => {
  const { getByTestId } = render(<Balls dragonBalls={esferas.balls} profile={profile} />);
  const selectInput = getByTestId('filter')
  const totalCards = document.getElementsByClassName('card');
  const totalBalls = esferas.balls.filter((ball) => ball.owner === profile.id).length;
  fireEvent.change(selectInput, {target: {value: 'me'}});
  expect(totalCards.length).toBe(totalBalls); 
  })

it('Should be render component Balls w not found balls', () => {
  const { getByTestId } = render(<Balls dragonBalls={esferas.balls} profile={profile} />);
  const selectInput = getByTestId('filter')
  const totalCards = document.getElementsByClassName('card');
  const totalBalls = esferas.balls.filter((ball) => ball.owner !== profile.id).length;
  fireEvent.change(selectInput, {target: {value: 'notme'}});
  expect(totalCards.length).toBe(totalBalls); 
})

it('Should be render component Balls w all balls', () => {
  render(<Balls dragonBalls={esferaSuccess.balls} profile={profileSucess.profile} />);
  const totalCards = document.getElementsByClassName('card');
  const totalBalls = esferaSuccess.balls.filter((ball) => ball.owner === profile.id).length;
  expect(totalCards.length).toBe(totalBalls);
})

it('Should be render component Balls w 0 balls', () => {
  const { getByTestId } = render(<Balls dragonBalls={esferaSuccess.balls} profile={profileSucess.profile} />);
  const selectInput = getByTestId('filter')
  const totalCards = document.getElementsByClassName('card');
  const totalBalls = esferaSuccess.balls.filter((ball) => ball.owner !== profile.id).length;
  fireEvent.change(selectInput, {target: {value: 'notme'}});
  expect(totalCards.length).toBe(totalBalls);
})

it('Should be render component Balls w found balls and select to not found balls', () => {
  const { getByTestId } = render(<Balls dragonBalls={esferaSuccess.balls} profile={profileSucess.profile} />);
  const selectInput = getByTestId('filter')
  const totalCards = document.getElementsByClassName('card');
  const totalBalls = esferaSuccess.balls.filter((ball) => ball.owner !== profile.id).length;
  fireEvent.change(selectInput, {target: {value: 'me'}});
  expect(totalCards.length).not.toBe(totalBalls);
})

it('Should be render modal  ', () => {
  const { debug, getAllByText } = render(<Balls dragonBalls={esferas.balls} profile={profile} />);
  const [buttonElement] = getAllByText('Encontrei')//.closest('button');
  const foundButton = buttonElement.closest('button');
  fireEvent.click(foundButton)
  // console.log('Button -> ', foundButton.closest('button'));
  debug();
})