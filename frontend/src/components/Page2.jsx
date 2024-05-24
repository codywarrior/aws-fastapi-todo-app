import { PageChanger } from "./PageChanger";
import { useEffect, useState } from "react";
import userpool from "./userpool";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import * as jose from "jose";

function Page2() {
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
        <h1>
          My Awesome <span className="badge text-bg-success">TODO</span> App
        </h1>
      </div>
      <form>
        <div className="form-group">
          <div className="form-row">
            <label htmlFor="newItem" className="h3">
              New Item:
            </label>
            <input
              type="text"
              id="newItem"
              className="form-control"
              aria-describedby="newItemHelp"
              placeholder="Enter item"
            />
            <small id="newItemHelp" className="form-text text-muted">
              Add items to your TODO list!
            </small>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <div>
        <br></br>
      </div>

      <div className="container">
        <h3>Todo Items:</h3>
        <div className="list-group">
          <div className="container">
            <div className="list-group-item d-flex align-items-center justify-content-between">
              <label className="p mb-0">
                <input type="checkbox" className="mr-2" /> ITEM
              </label>
              <button className="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <br></br>
        <br></br>
        <br></br>
      </div>
      <PageChanger currentPage="2" />
    </>
  );
}

export default Page2;
