import httpClient from '../http/http.client';
import type { User, UserCreateData, UserUpdateData } from '../interfaces/user.interface';
import type { AddUserAPICall, DeleteUserAPICall, FetchUsersAPICall, UpdateUserAPICall } from '../types/api.type';

const APIRoutes = {
  users: '/users'
};

export const fetchAllUsers: FetchUsersAPICall = async () => {
  const { data }: { data: User[] } = await httpClient.get(APIRoutes.users);
  return data;
};

export const addUser: AddUserAPICall = async (userData: UserCreateData) => {
  const res = await httpClient.post(APIRoutes.users, userData);
  return res;
};

export const updateUser: UpdateUserAPICall = async (id: string, userData: UserUpdateData) => {
  const res = await httpClient.put(`${APIRoutes.users}/${id}`, userData);
  return res;
};

export const deleteUser: DeleteUserAPICall = async (id: number) => {
  const res = await httpClient.delete(`${APIRoutes.users}/${id}`);
  return res;
};
