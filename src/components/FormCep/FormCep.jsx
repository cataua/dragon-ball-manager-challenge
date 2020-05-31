import React, { useState } from 'react';
import axios from 'axios';
import { Box, Flex } from 'rebass'
import {
  Label,
  Input,
} from '@rebass/forms';

const FormCep = () => {
  const initialAddress = {
    logradouro: '',
    bairro: ''
  }
  const [ cep, setCep ] = useState('')
  const [ address, setAddress ] = useState(initialAddress)

  const fetchCep = async (cep) => {
    const cepResult = await axios.get(`https://viacep.com.br/ws/${cep}/json/`, {
      crossdomain: true });
    if (!cepResult.data.erro) {
      const { logradouro, bairro } = cepResult.data
      setAddress({ logradouro, bairro })
    } 
  }

  const handleCepField = async (value) => {
    if(value.length === 8) {
      setCep(cep)
      await fetchCep(value)
    }
  }

  return (
    <Box as='form' onSubmit={(e) => e.preventDefault()} py={3} width='500px'>
      <Flex mx={-2} mb={3}>
        <Box width={1 / 2} px={2}>
        <Label htmlFor='cep'>Cep</Label>
          <Input
            id='cep'
            name='cep'
            placeholder="CEP"
            onChange={({ target : { value } }) => handleCepField(value)}
          />
        </Box>
        <Box width={1 / 2} px={2}>
        <Label htmlFor='bairro'>Bairro</Label>
          <Input
            id='bairro'
            name='bairro'
            placeholder="bairro"
            value={address.bairro}
            onChange={({ target : { value } }) => setAddress({...address, bairro: value})}
          />
        </Box>
        <Box width={1 / 2} px={2}>
        <Label htmlFor='logradouro'>Logradouro</Label>
          <Input
            id='logradouro'
            name='logradouro'
            placeholder="logradouro"
            value={address.logradouro}
            onChange={({ target : { value } }) => setAddress({...address, logradouro: value})}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default FormCep;
