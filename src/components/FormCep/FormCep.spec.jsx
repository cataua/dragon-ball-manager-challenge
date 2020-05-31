import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import FormCep from './FormCep';

it('Should render normal', () => {
  const {debug} = render(<FormCep />);
  debug()
})