#!/bin/bash

####################################################################################################
# STEPS EXECUTED TO DEPLOY THE BACKEND PROJECT
####################################################################################################

# Install Python dependencies with Poetry
pip install poetry
poetry shell
poetry install

# Configure deployment environment
export AWS_DEFAULT_REGION=us-east-1
export DEPLOYMENT_ENVIRONMENT=prod

# Initialize CDK (Cloud Development Kit)
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
cdk bootstrap aws://${ACCOUNT_ID}/us-east-1

# Deploy the backend
cdk deploy "fastapi-todo-app-backend-${DEPLOYMENT_ENVIRONMENT}" --require-approval never
