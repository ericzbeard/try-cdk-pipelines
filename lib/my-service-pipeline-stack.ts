import * as codepipeline from "@aws-cdk/aws-codepipeline";
import * as codepipelineActions from "@aws-cdk/aws-codepipeline-actions";
import { Construct, SecretValue, Stack, StackProps } from "@aws-cdk/core";
import { AppDeliveryPipeline, CdkBuilds } from "./app-delivery";
import * as secrets from "@aws-cdk/aws-secretsmanager";
import { MyServiceStage } from "./my-service-stage";

/**
 * Stack configuration properties.
 */
export interface MyServicePipelineStackProps extends StackProps {
  readonly gitHubTokenSecretArn: string;
  readonly gitHubOwner: string;
  readonly gitHubRepo: string;
  readonly prodAccount: string;
}

/**
 * The stack that defines the application pipeline
 */
export class MyServicePipelineStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    props: MyServicePipelineStackProps
  ) {
    super(scope, id, props);

    const secret = secrets.Secret.fromSecretAttributes(this, "GitHubSecret", {
      secretArn: props.gitHubTokenSecretArn,
    });

    const pipeline = new AppDeliveryPipeline(this, "Pipeline", {
      // The pipeline name
      pipelineName: "MyServicePipeline",

      // Where the source can be found
      source: new codepipelineActions.GitHubSourceAction({
        actionName: "GitHub",
        output: new codepipeline.Artifact(),
        oauthToken: secret.secretValue,
        owner: props.gitHubOwner,
        repo: props.gitHubRepo,
        trigger: codepipelineActions.GitHubTrigger.POLL,
      }),

      // How it will be built
      build: CdkBuilds.standardNpmBuild(),
    });

    // This is where we add the application stages
    pipeline.addApplicationStage(
      new MyServiceStage(this, "PreProd", {
        env: { account: props.env!.account, region: props.env!.region },
      })
    );

    pipeline.addApplicationStage(
      new MyServiceStage(this, "Prod", {
        env: { account: props.prodAccount, region: props.env!.region },
      })
    );
  }
}
