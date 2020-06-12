import { Construct, Stage, Environment } from '@aws-cdk/core';
import { MyServiceStack } from './my-service-stack';
import { StageProps } from '@aws-cdk/core';

/**
 * Deployable unit of web service app
 */
export class MyServiceStage extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    new MyServiceStack(this, `${id}-WebService`, {});
  }
}