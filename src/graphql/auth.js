import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation Signup(
    $first_name: String!
    $last_name: String!
    $email: String!
    $password: String!
    $password_confirmation: String!
    $timezone: String!
  ) {
    signup(
      first_name: $first_name
      last_name: $last_name
      email: $email
      password: $password
      password_confirmation: $password_confirmation
      timezone: $timezone
    ) {
      message
      errorId
      user {
        id
        name
        email
        email_verified_at
        avatar {
          url
        }
        total_income
        timezone
        currency
        latest_income {
          total
          period {
            month
            year
          }
        }
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!, $cliToken: String) {
    login(email: $email, password: $password, cliToken: $cliToken) {
      message
      errorId
      user {
        id
        name
        email
        email_verified_at
        avatar {
          url
        }
        total_income
        timezone
        currency
        latest_income {
          total
          period {
            month
            year
          }
        }
      }
    }
  }
`;

export const GOOGLELOGIN = gql`
  mutation GoogleLogin($id: ID) {
    googleLogin(id: $id) {
      redirect_url
    }
  }
`;

export const VERIFYGOOGLELOGIN = gql`
  mutation VerifyGoogleLogin($timezone: String!) {
    verifyGoogleLogin(timezone: $timezone) {
      message
      errorId
      user {
        id
        name
        email
        email_verified_at
        avatar {
          url
        }
        total_income
        timezone
        currency
        latest_income {
          total
          period {
            month
            year
          }
        }
      }
    }
  }
`;

export const RESENDVERIFICATIONEMAIL = gql`
  mutation ResendVerificationEmail($id: ID!) {
    resendVerificationEmail(id: $id) {
      message
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout {
      message
    }
  }
`;

export const RESETPASSWORDEMAIL = gql`
  mutation ResetPasswordEmail($email: String!) {
    resetPasswordEmail(email: $email) {
      message
    }
  }
`;

export const RESETPASSWORD = gql`
  mutation ResetPassword(
    $email: String!
    $password: String!
    $password_confirmation: String!
    $token: String!
  ) {
    resetPassword(
      email: $email
      password: $password
      password_confirmation: $password_confirmation
      token: $token
    ) {
      message
    }
  }
`;

export const SENDCHANGEEMAIL = gql`
  mutation SendChangeEmail($email: String!, $token: String!) {
    sendChangeEmail(email: $email, token: $token) {
      errorId
    }
  }
`;

export const RESETEMAIL = gql`
  mutation ResetEmail($email: String!, $token: String!) {
    resetEmail(email: $email, token: $token) {
      message
      errorId
      user {
        id
        name
        email
        email_verified_at
        avatar {
          url
        }
        total_income
        timezone
        currency
        latest_income {
          total
          period {
            month
            year
          }
        }
      }
    }
  }
`;
