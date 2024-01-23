
      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "FindPasswordResponse": [
      "FindPasswordFailure",
      "FindPasswordSuccess"
    ],
    "ResetPasswordResponse": [
      "ResetPasswordFailure",
      "ResetPasswordSuccess"
    ],
    "SignInResponse": [
      "SignInFailure",
      "SignInSuccess"
    ],
    "SignUpResponse": [
      "SignUpFailure",
      "SignUpSuccess"
    ],
    "VerifyEmailResponse": [
      "VerifyEmailFailure",
      "VerifyEmailSuccess"
    ]
  }
};
      export default result;
    