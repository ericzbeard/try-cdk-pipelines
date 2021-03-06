import * as apigw from "@aws-cdk/aws-apigateway";
import * as lambda from "@aws-cdk/aws-lambda";
import { CfnOutput, Construct, Stack, StackProps } from "@aws-cdk/core";
import * as path from "path";

/**
 * A stack for our simple Lambda-powered web service
 */
export class MyServiceStack extends Stack {

  public urlOutput: CfnOutput;

  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    // The Lambda function that contains the functionality
    const handler = new lambda.Function(this, "Lambda", {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "handler.handler",
      code: lambda.Code.fromAsset("./build/lambda"),
    });

    // An API Gateway to make the Lambda web-accessible
    const gw = new apigw.LambdaRestApi(this, `MyServiceStack-${id}-Gateway`, {
      description: "Endpoint for a simple Lambda-powered web service",
      handler,
      deployOptions: {
        stageName: id,
      },
    });

    // An output with a well-known name to read it from the integ tests
    this.urlOutput = new CfnOutput(this, "Url", {
      value: gw.url,
    });
  }
}
