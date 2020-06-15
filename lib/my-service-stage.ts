import { Construct, Stage, Environment, CfnOutput } from "@aws-cdk/core";
import { MyServiceStack } from "./my-service-stack";
import { StageProps } from "@aws-cdk/core";

/**
 * Deployable unit of web service app
 */
export class MyServiceStage extends Stage {

  public urlOutput: CfnOutput;

  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    const stack = new MyServiceStack(this, id, {});

    this.urlOutput = stack.urlOutput;
  }
}
