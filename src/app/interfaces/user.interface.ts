export interface User {
  id: number
  first_name: string
  second_name: string
  email: string
  avatar: string
}

export interface UserCreateData {
  first_name: string
  second_name: string
  email: string
  avatar: string
}

export interface UserUpdateData {
  first_name?: string
  second_name?: string
  email?: string
  avatar?: string
}
