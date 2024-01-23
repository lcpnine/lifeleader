
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
    