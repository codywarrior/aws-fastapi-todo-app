import reactLogo from "../assets/react.svg";
import awsLogo from "../assets/aws-logo.svg";
import "../styles/Dashboard.css";
import { Header } from "./Header";
import { useEffect, useState } from "react";
import userpool from "./userpool";
import { useNavigate } from "react-router-dom";
import * as jose from "jose";

function Dashboard() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    let user = userpool.getCurrentUser();
    console.log(`user is: ${JSON.stringify(user)}`);

    if (!user) {
      navigate(`/home`);
    }
    try {
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
    } catch (error) {
      setUserEmail("");
    }
  }, []);

  return (
    <>
      <Header userEmail={userEmail} />
      <div className="container">
        <h1 className="text-align-top">TODOs App</h1>
        <p>TEST</p>
      </div>
    </>
  );
}

export default Dashboard;
