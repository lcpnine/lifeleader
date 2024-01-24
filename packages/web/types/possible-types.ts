
      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "DeleteAccountResponse": [
      "DeleteAccountFailure",
      "DeleteAccountSuccess"
    ],
    "FindPasswordResponse": [
      "FindPasswordFailure",
      "FindPasswordSuccess"
    ],
    "RecommendationResponse": [
      "RecommendationFailure",
      "RecommendationSuccess"
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
    