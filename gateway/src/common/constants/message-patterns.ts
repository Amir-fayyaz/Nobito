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
  GET_ALL_POSITIONS = 'get_all_position',
  FIND_ONE_BY_ID = 'get_position_by_id',
  UPDATE_POSITION = 'update_position',
  DELETE_POSITION = 'delete_position',
}

export enum JwtMessagePattern {
  VERIFY_TOKEN = 'verify_token',
}

export enum PersonnelMessagePattern {
  CREATE_PERSONNEL = 'create_personnel',
  GET_ALL_PERSONNEL = 'get_all_personnel',
  GET_PERSONNEL_BY_ID = 'get_personnel_by_id',
  UPDATE_PERSONNEL = 'update_personnel',
  DELETE_PERSONNEL = 'delete_personnel',
}

export enum DoctorMessagePattern {
  CREATE_DOCTOR = 'create_doctor',
  UPDATE_DOCTOR = 'update_doctor',
  FIND_ALL_DOCTOR = 'find_all_doctor',
  FIND_ONE_DOCTOR = 'find_one_doctor',
  DELETE_DOCTOR = 'delete_doctor',
}
