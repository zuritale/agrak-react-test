
import type { AxiosResponse } from 'axios';

import type { User, UserCreateData, UserUpdateData } from '../interfaces/user.interface';

export type FetchUsersAPICall = () => Promise<User[]>;

export type AddUserAPICall = (userData: UserCreateData) => Promise<AxiosResponse>;

export type UpdateUserAPICall = (id: string, userData: UserUpdateData) => Promise<AxiosResponse>;

export type DeleteUserAPICall = (id: number) => Promise<AxiosResponse>;
