#!/bin/bash

####################################################################################################
# STEPS EXECUTED TO CREATE THE FRONTEND PROJECT
####################################################################################################

# Create React App with Vite
npm create vite@latest
# ✔ Project name: … frontend
# ✔ Select a framework: › React
# ✔ Select a variant: › JavaScript + SWC

# Move to the project directory
cd frontend

# Install dependencies
npm install

# Run locally
npm run dev


# TEMP:
export AWS_DEFAULT_REGION=us-east-1
export DEPLOYMENT_ENVIRONMENT=prod
export VITE_APP_USER_POOL_ID=us-east-1_kb8Flfhjj
export VITE_APP_CLIENT_ID=38f90lessb4g124cq7blacto6h
export DEPLOYMENT_ENVIRONMENT=prod
export VITE_COGNITO_HOSTED_UI_ENDPOINT=https://fastapi-todo-app-prod.auth.us-east-1.amazoncognito.com/oauth2/authorize\?client_id\=38f90lessb4g124cq7blacto6h\&response_type\=token\&scope\=aws.cognito.signin.user.admin+email+openid\&redirect_uri\=https%3A%2F%2Fxoqmhabsi7.execute-api.us-east-1.amazonaws.com%2Fprod%2Fapi%2Fv1%2Fdocs
