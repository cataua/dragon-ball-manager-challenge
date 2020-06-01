import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormCep from './FormCep';

it('Should render normal', () => {
  const {getByPlaceholderText} = render(<FormCep />);
  const inputCEP = getByPlaceholderText('CEP').closest('input');
  const inputLogradouro = getByPlaceholderText('logradouro').closest('input');
  const inputBairro = getByPlaceholderText('bairro').closest('input');
  
  expect(inputCEP).toBeVisible();
  expect(inputLogradouro).toBeVisible();
  expect(inputBairro).toBeVisible();
})

it('Should render and return not found when type not exist cep', async () => {
  const notFoundText = 'CEP não encontrado';
  const { debug, getByPlaceholderText, getByText, getByRole } = render(<FormCep />)
  const inputCEP = await getByPlaceholderText('CEP').closest('input');
  const inputLogradouro = getByPlaceholderText('logradouro').closest('input');
  const inputBairro = getByPlaceholderText('bairro').closest('input');

  await fireEvent.change(inputCEP, {target: {value: 123}})
  // const errorReturn = getByText(notFoundText).closest('span');
  // expect(inputCEP).toHaveAttribute('value','36770000');
  // expect(inputLogradouro.value).toBeNull();
  // expect(inputBairro.value).toBeNull();
  // expect(errorReturn).toBeVisible();
  debug();
})