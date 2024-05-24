import reactLogo from "../assets/react.svg";
import awsLogo from "../assets/aws-logo.svg";
import "../styles/Page1.css";
import { PageChanger } from "./PageChanger";
import { useEffect, useState } from "react";
import userpool from "./userpool";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import * as jose from "jose";

function Page1() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    let user = userpool.getCurrentUser();
    console.log(`user is: ${JSON.stringify(user)}`);

    if (!user) {
      navigate(`/login`);
    }
    // Get user details to populate page
    const clientId = user?.pool?.clientId;
    const username = user?.username;
    console.debug(`username is: ${username}, clientId is: ${clientId}`);

    const idTokenKey = `CognitoIdentityServiceProvider.${clientId}.${username}.idToken`;
    const idToken = user?.storage[idTokenKey];
    const decodedToken = jose.decodeJwt(idToken);
    let userName = user?.username;
    let userEmail = decodedToken.email;
    let userFullName = decodedToken.name;
    console.debug(`decodedToken is: ${JSON.stringify(decodedToken)}`);
    console.log(
      `userName is: ${userName}, userEmail is: ${userEmail}, userFullName is: ${userFullName}`
    );
    setUserEmail(userEmail);
  }, []);

  return (
    <>
      <Box
        display="flex"
        justifyContent="flex-end"
        paddingRight="10px"
        paddingTop="10px"
      >
        <Typography variant="h6">Hi: {userEmail}</Typography>{" "}
        {/* Display the user's email */}
      </Box>
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <div className="col">
            <a href="https://aws.com" target="_blank">
              <img src={awsLogo} className="logo" alt="AWS logo" />
            </a>
          </div>
        </div>
      </div>
      <PageChanger currentPage="1" />
      <h1>Welcome to my TODO List app</h1>
    </>
  );
}

export default Page1;
