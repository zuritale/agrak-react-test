import React, { useEffect, useState } from 'react';
import {
  VStack,
  Image,
  Heading,
  Flex,
  Button,
  HStack,
  useToast
} from '@chakra-ui/react';
import { useQuery, useMutation } from 'react-query';
import { FaRedoAlt } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import type { AxiosResponse } from 'axios';

import { addUser, fetchAllUsers, updateUser } from '../consts/api';
import CustomInput from '../components/CustomInput';
import { DEFAULT_AVATAR_URL } from '../consts/defaults';
import { routes } from '../consts/routes';
import type { UserCreateData, User } from '../interfaces/user.interface';
import { VSTackColumn } from '../styles/chakra/containers';
import { messages } from '../consts/messages';

const defaultUserData: UserCreateData = {
  first_name: '',
  second_name: '',
  email: '',
  avatar: ''
};

const AddUser: React.FC = () => {
  const [user, setUser] = useState<UserCreateData>(defaultUserData);

  const navigate = useNavigate();

  const toast = useToast({ isClosable: true });

  const goHome: () => void = () => {
    navigate(routes.home);
  };

  const { id } = useParams();

  const { data: currentUser, refetch } = useQuery(
    ['users'],
    fetchAllUsers,
    { select: (users) => users.find((user: any) => user.id === id) }
  );

  const editMode = Boolean(id ?? false);

  const [imageLoading, setImageLoading] = useState<boolean>(false);

  const userMutationParams = {
    onSuccess: async (data: AxiosResponse) => {
      const userAction = editMode ? messages.USER_UPDATED : messages.USER_CREATED;
      console.log('suxes', data);
      await refetch();
      goHome();
      toast({
        title: userAction,
        status: 'success'
      });
    },
    onError: () => {
      toast({
        title: messages.USERS_DATA_ERROR,
        status: 'error'
      });
    }
  };

  const generateAvatar: () => void = () => {
    setUser({ ...user, avatar: `${routes.multiavatarUrl}/${new Date().getTime()}.png` });
    setImageLoading(true);
  };

  useEffect(() => {
    const hasUser = Boolean(currentUser ?? false);
    if (hasUser) {
      const { id: currentId, ...currentUserData } = currentUser as User;
      console.log('ccurr/USD', currentUserData);
      setUser(currentUserData);
    }
  }, [currentUser]);

  const handleChange: ($event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void =
  ($event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = $event.target;
    setUser({ ...user, [name]: value });
  };

  const { mutate: addUserMutation, isLoading: isCreationLoading } =
    useMutation(async () => await addUser(user), userMutationParams);

  const { mutate: updateUserMutation, isLoading: isUpdateLoading } =
    useMutation(async (id: string) => await updateUser(id, user), userMutationParams);

  const {
    first_name,
    second_name,
    email,
    avatar
  } = user;

  const loading = isCreationLoading || isUpdateLoading;

  const saveUserData: () => void = () => {
    if (editMode) updateUserMutation(id as string);
    else addUserMutation();
  };

  const isValid: () => boolean = () => Object.values(user).every((value: string) => value !== '');

  return (
    <Flex flexDirection="column" align="center" >
      <Heading
        size='xl'
      >
        {editMode ? messages.USER_UPDATE : messages.USER_ADD}
      </Heading>
      <VStack
        sx={VSTackColumn}
      >
        <Image
          src={avatar}
          alt="user avatar"
          boxSize="140px"
          borderRadius="full"
          fallbackSrc={DEFAULT_AVATAR_URL}
          onLoad={() => { setImageLoading(false); }}
        />
        <Button
          isLoading={imageLoading}
          onClick={generateAvatar}
          leftIcon={<FaRedoAlt />}
          colorScheme='blue'
        >
          {messages.GENERATE_AVATAR}
        </Button>

        <CustomInput
          disabled={loading}
          label={messages.FIRST_NAME}
          value={first_name}
          handleChange={handleChange}
          name="first_name"
        />
        <CustomInput
          disabled={loading}
          label={messages.SECOND_NAME}
          value={second_name}
          handleChange={handleChange}
          name="second_name"
        />

        <CustomInput
          disabled={loading}
          label={messages.EMAIL}
          value={email}
          handleChange={handleChange}
          name="email"
          type="email"
        />

        <HStack pt="5">
          <Button
            isDisabled={!isValid()}
            isLoading={loading}
            onClick={saveUserData}
            colorScheme='green'
          >
            {messages.SAVE}
          </Button>
          <Button
            isLoading={loading}
            onClick={goHome}
            colorScheme='red'
          >
            {messages.CANCEL}
          </Button>
        </HStack>
      </VStack>
    </Flex>
  );
};

export default AddUser;
