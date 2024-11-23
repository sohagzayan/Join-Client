export interface UserAuth {
  id: string;
  name: string;
  email: string;
}

export interface LoginResponse {
  statusCode: number;
  message: string;
  success: boolean;
  token: string;
}

export interface LoginErrorResponse {
  data: {
    errorMessages: { path: string; message: string }[];
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
}

export type LoginAPIResponse = {
  data: {
    message: string;
    statusCode: number;
    success: boolean;
    token: string;
  };
};
// | {
//     error: {
//       data: {
//         errorMessages: { path: string; message: string }[];
//         message: string;
//         stack: string;
//         success: boolean;
//       };
//       status: number;
//     };
//   };

// export interface LoginAPIResponse {
//   data?: LoginResponse;
//   error?: LoginErrorResponse;
// }

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
  role: string | null;
}

export interface RegisterResponse {
  data: {
    email: string;
    id: string;
    password: string;
    phoneNumber: string;
    profileImage: string;
    role: string;
  };
  message: string;
  statusCode: number;
  success: boolean;
}
