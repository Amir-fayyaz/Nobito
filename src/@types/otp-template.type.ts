export interface OtpTemplate {
  username: string;
  api_key: string;
  template_id: string;
  number: '50002714';
  recipient: string; // reciver
  variables: {
    code: string;
  };
}
