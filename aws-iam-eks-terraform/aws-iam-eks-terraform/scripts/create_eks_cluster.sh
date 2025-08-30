#!/usr/bin/env bash
set -euo pipefail

# Create EKS cluster without nodegroup
eksctl create cluster --name=EKS_Cluster                      --region=ap-south-1                       --zones=ap-south-1a,ap-south-1b                       --version=1.30                       --without-nodegroup

# Associate OIDC
eksctl utils associate-iam-oidc-provider     --region ap-south-1     --cluster Cloudaseem     --approve
