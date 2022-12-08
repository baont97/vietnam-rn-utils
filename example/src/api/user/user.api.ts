import type * as Types from './user.types';

export const getUserList = async (): Promise<Types.GetUserListResult> => {
  try {
    const response = await fetch(
      'https://636ca96eab4814f2b26a5b35.mockapi.io/api/v1/users'
    );
    const responseJSON = response.json();
    return responseJSON;
  } catch (error) {
    return error;
  }
};
