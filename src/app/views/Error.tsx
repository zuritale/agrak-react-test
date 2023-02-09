import React from 'react';
import {
  Heading,
  Button,
  Flex,
  Image
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { FaRedoAlt } from 'react-icons/fa';
import { fetchAllUsers } from '../consts/api';
import { messages } from '../consts/messages';
import { DEFAULT_ERROR_BANNER } from '../consts/defaults';

const Error: React.FC = () => {
  const { refetch } = useQuery(['users'], fetchAllUsers);

  return (
    <Flex flexDirection="column" align="center" px="4" >
      <Heading
        size='xl'
        pb="5"
        textAlign="center"
      >
        {messages.ERROR_PLACEHOLDER}
      </Heading>
      <Image
        src={DEFAULT_ERROR_BANNER}
        alt="error screen"
        maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '30vw' }}
        borderRadius="md"
        fallbackSrc={DEFAULT_ERROR_BANNER}
      />
      <Button
        onClick={() => { void refetch(); }}
        leftIcon={<FaRedoAlt />}
        colorScheme="blue"
        my="5"
      >
        {messages.RETRY}
      </Button>
    </Flex>
  );
};

export default Error;
