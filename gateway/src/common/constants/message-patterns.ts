export enum UserMessagePattern {
  GETALLUSERS = 'get_all_users',
  GET_USER_BY_ID = 'get_user_by_id',
  CREATE_USER = 'create_user',
}

export enum AuthMessagePattern {
  REGISTER_BY_PHONE = 'register_by_phone',
  VERIFY_BY_PHONE = 'verify_by_phone',
  REGISTER_BY_EMAIL = 'register_by_email',
  VERIFY_BY_EMAIL = 'verify_by_email',
}

export enum RoleMessagePattern {
  CREATE_ROLE = 'create_role',
  GET_ALL_ROLES = 'find_all_roles',
  FIND_ROLE_BY_ID = 'find_one_by_id',
  UPDATE_ROLE = 'update_role',
  DELETE_ROLE = 'remove_role',
}

export enum PositionMessagePattern {
  CREATE_POSITION = 'create_position',
}
