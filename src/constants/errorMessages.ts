export default {
  SIGNUP: {
    USER_EXIST: 'User already exist',
  },
  GENERAL: {
    INVALID_JSON: 'The provided json is invalid',
    PAGE_NOT_FOUND: 'Page is not found!',
    INTERNAL_SERVER_ERROR: 'Something broke!',
    BAD_REQUEST: 'Missing arguments!',
    UNPROCESSABLE_ENTITY: 'The entity already exists!',
    DAILY_MAXIMUM_REACHED:
      'You have reached the maximum of resume generations for today!',
    REACHED_MAXIMUM_NUMBER_OF_REQUESTS:
      'Too many requests were sent in one 1 minute!',
    PAYLOAD_TOO_BIG:
      'The profile image is too big. Please replace it or add it at the edit page.',
  },
  USERS: {
    ALREADY_REGISTERD: 'The user is already registered',
    NOT_FOUND: 'The user was not found',
    NOT_AUTHENTICATED:
      'The route can not be accessed because the user is not authenticated.',
    NOT_CONFIRMED: 'The user is not confirmed',
    NOT_NORMAL_USER:
      'Cannot reset password for this user. The user is not registered with email and password.',
    INVALID_RESET_PASSWORD_LINK:
      'The link for resetting the password is not valid. Please try again.',
  },
};
