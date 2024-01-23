
      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "SignInResponse": [
      "SignInFailure",
      "SignInSuccess"
    ],
    "SignUpResponse": [
      "SignUpFailure",
      "SignUpSuccess"
    ]
  }
};
      export default result;
    