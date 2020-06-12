env CDK_NEW_BOOTSTRAP=1 npx cdk bootstrap \
  --profile account1-profile \
  --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess \
  aws://509771036685/us-east-1