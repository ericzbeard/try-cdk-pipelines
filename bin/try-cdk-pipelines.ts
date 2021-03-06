#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { MyServicePipelineStack } from "../lib/my-service-pipeline-stack";

const app = new cdk.App();

new MyServicePipelineStack(app, "MyServicePipeline", {
  env: {
    account: "509771036685",
    region: "us-east-1",
  },
  gitHubTokenSecretArn:
    "arn:aws:secretsmanager:us-east-1:509771036685:secret:github-token-2Yz69k",
  gitHubOwner: "ericzbeard",
  gitHubRepo: "try-cdk-pipelines",
  prodAccount: "278978401551",
});

app.synth();
