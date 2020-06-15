env CDK_NEW_BOOTSTRAP=1 npx cdk bootstrap \
  --profile account2-profile \
  --trust 509771036685 \
  --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess \
  aws://278978401551/us-east-1