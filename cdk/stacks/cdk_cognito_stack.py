import os
from constructs import Construct

# Built-in imports

# External imports
from aws_cdk import (
    Stack,
    Duration,
    RemovalPolicy,
    aws_cognito,
)


class CognitoStack(Stack):
    """
    Class to create the backend resources for Users authentication and authorization
    by leveraging Amazon Cognito for the TODO app solution on AWS.
    """

    def __init__(
        self,
        scope: Construct,
        construct_id: str,
        main_resources_name: str,
        app_config: dict[str],
        **kwargs,
    ) -> None:
        """
        :param scope (Construct): Parent of this stack, usually an 'App' or a 'Stage', but could be any construct.
        :param construct_id (str): The construct ID of this stack (same as aws-cdk Stack 'construct_id').
        :param main_resources_name (str): The main unique identified of this stack.
        :param app_config (dict[str]): Dictionary with relevant configuration values for the stack.
        """
        super().__init__(scope, construct_id, **kwargs)

        # Input parameters
        self.construct_id = construct_id
        self.main_resources_name = main_resources_name
        self.app_config = app_config
        self.deployment_environment = self.app_config["deployment_environment"]

        # Main methods for the deployment
        self.create_cognito_user_pool()

    def create_cognito_user_pool(self):
        """
        Create Cognito User Pool for the TODO app.
        """
        self.user_pool = aws_cognito.UserPool(
            self,
            "Cognito-UserPool",
            user_pool_name=f"{self.main_resources_name}-user-pool-{self.deployment_environment}",
            sign_in_aliases=aws_cognito.SignInAliases(email=True, username=True),
            sign_in_case_sensitive=False,
            self_sign_up_enabled=True,
            auto_verify={
                "email": True,
            },
            user_verification=aws_cognito.UserVerificationConfig(
                email_subject=f"Verify your email for our {self.main_resources_name}!",
                email_body="Thanks for signing up! Your verification code is {####}",
                sms_message="Thanks for signing up! Your verification code is {####}",
                email_style=aws_cognito.VerificationEmailStyle.CODE,
            ),
            # standard_attributes=aws_cognito.StandardAttributes(
            #     fullname=aws_cognito.StandardAttribute(required=True, mutable=False),
            #     address=aws_cognito.StandardAttribute(required=False, mutable=True),
            #     nickname=aws_cognito.StandardAttribute(required=False, mutable=True),
            #     birthdate=aws_cognito.StandardAttribute(required=False, mutable=False),
            # ),
            custom_attributes={
                "isAdmin": aws_cognito.BooleanAttribute(mutable=False),
                "createdAt": aws_cognito.DateTimeAttribute(),
            },
            password_policy=aws_cognito.PasswordPolicy(
                min_length=6,
                require_lowercase=False,
                require_uppercase=False,
                require_digits=False,
                require_symbols=False,
            ),
            account_recovery=aws_cognito.AccountRecovery.EMAIL_ONLY,
            removal_policy=RemovalPolicy.DESTROY,
        )

        self.user_pool.add_domain(
            "Cognito-Domain",
            cognito_domain=aws_cognito.CognitoDomainOptions(
                domain_prefix=f"{self.main_resources_name}-{self.deployment_environment}"
            ),
        )

        self.app_client = self.user_pool.add_client(
            "Cognito-AppClient",
            user_pool_client_name=f"{self.main_resources_name}-app-client-{self.deployment_environment}",
            auth_flows=aws_cognito.AuthFlow(user_password=True),
            o_auth=aws_cognito.OAuthSettings(
                flows=aws_cognito.OAuthFlows(
                    authorization_code_grant=True,
                    implicit_code_grant=True,  # Return tokens directly
                ),
                scopes=[
                    aws_cognito.OAuthScope.EMAIL,
                    aws_cognito.OAuthScope.COGNITO_ADMIN,
                ],
                callback_urls=["https://example.com/callback"],
            ),
            id_token_validity=Duration.hours(8),
            access_token_validity=Duration.hours(8),
        )
