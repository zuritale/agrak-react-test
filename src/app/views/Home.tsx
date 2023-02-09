import React, { useEffect } from 'react';
import {
  Heading,
  Button,
  Flex
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { FaPlusCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { fetchAllUsers } from '../consts/api';
import type { User } from '../interfaces/user.interface';
import { routes } from '../consts/routes';
import UserCard from '../components/UserCard';
import { messages } from '../consts/messages';
import Error from './Error';
import SkeletonCards from '../components/SkeletonCards';

const Home: React.FC = () => {
  const { data: users, error, isLoading, refetch } = useQuery(['users'], fetchAllUsers);

  const navigate = useNavigate();

  const onAddUser: () => void = () => {
    navigate(routes.user);
  };

  useEffect(() => {
    void refetch();
  }, []);

  const hasError = Boolean(error ?? false);

  if (hasError) return (<Error />);

  return (
    <Flex flexDirection="column" align="center" px="4" pb="10" >
      <Heading
        size='xl'
      >
        {messages.USERS_LIST}
      </Heading>
      <Button
        onClick={onAddUser}
        leftIcon={<FaPlusCircle />}
        colorScheme="green"
        my="5"
      >
        {messages.NEW_USER}
      </Button>
      {isLoading && (
        <SkeletonCards />
      )}
      {users?.map((user: User, index: number) => (
        <UserCard key={`user-${index}`} user={user} />
      ))}
    </Flex>
  );
};

export default Home;
