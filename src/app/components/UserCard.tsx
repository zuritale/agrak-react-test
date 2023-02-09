import React from 'react';
import { HStack, IconButton, Image, Text, useToast, VStack } from '@chakra-ui/react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useQuery, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import type { User } from '../interfaces/user.interface';
import { routes } from '../consts/routes';
import { deleteUser, fetchAllUsers } from '../consts/api';
import { UserCardColumn } from '../styles/chakra/containers';
import { messages } from '../consts/messages';
import { DEFAULT_AVATAR_URL } from '../consts/defaults';

interface UserCardProps {
  user: User
}

const UserCard: React.FC<UserCardProps> = ({ user }: UserCardProps) => {
  const navigate = useNavigate();

  const { refetch } = useQuery(['users'], fetchAllUsers);

  const toast = useToast({ isClosable: true });

  const updateUser: (id: number) => void = (id: number) => {
    navigate(`${routes.user}/${id}`);
  };

  const { mutate: removeUserMutation, isLoading } = useMutation(async (id: number) => await deleteUser(id), {
    onSuccess: async (data) => {
      await refetch();
      toast({
        title: messages.USER_DELETED,
        status: 'success'
      });
    },
    onError: () => {
      toast({
        title: messages.USERS_DELETE_ERROR,
        status: 'error'
      });
    }
  });

  const removeUser: (id: number) => void = (id: number) => {
    removeUserMutation(id);
  };

  return (
    <VStack sx={UserCardColumn} >
      <HStack
        justify="space-between"
        align="flex-start"
      >
        <Image
          src={user.avatar}
          alt="user avatar"
          boxSize="120px"
          borderRadius="full"
          fallbackSrc={DEFAULT_AVATAR_URL}
        />
        <HStack
          justify="flex-end"
        >
          <IconButton
            onClick={() => { updateUser(user.id); }}
            disabled={isLoading}
            colorScheme="blue"
            aria-label="Update"
            icon={<FiEdit />}
            isRound
          />
          <IconButton
            onClick={() => { removeUser(user.id); }}
            disabled={isLoading}
            colorScheme="red"
            aria-label="Remove"
            icon={<FiTrash2 />}
            isRound
          />
        </HStack>
      </HStack>
      <VStack
        align="flex-start"
      >
        <Text
          wordBreak="break-all"
          fontWeight="bold"
        >
          {user.first_name} {user.second_name}
        </Text>
        <Text
          wordBreak="break-all"
        >
          {user.email}
        </Text>
      </VStack>
    </VStack>
  );
};

export default UserCard;
