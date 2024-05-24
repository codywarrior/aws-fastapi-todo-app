import { CognitoUserPool } from "amazon-cognito-identity-js";
const poolData = {
  UserPoolId: import.meta.env.VITE_APP_USER_POOL_ID,
  ClientId: import.meta.env.VITE_APP_CLIENT_ID,
};
console.debug(`poolData: ` + JSON.stringify(poolData));
const userpool = new CognitoUserPool(poolData);
export default userpool;
