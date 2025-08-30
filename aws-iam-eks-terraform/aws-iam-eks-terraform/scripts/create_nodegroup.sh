#!/usr/bin/env bash
set -euo pipefail

# Create a managed nodegroup
# Change --cluster if needed (e.g., to Cloudaseem)
eksctl create nodegroup   --cluster aditya_server   --region ap-south-1   --name node2   --node-type t3.medium   --nodes 2   --nodes-min 2   --nodes-max 4   --node-volume-size 20   --ssh-access   --ssh-public-key vault_guard   --managed   --asg-access   --external-dns-access   --full-ecr-access   --appmesh-access   --alb-ingress-access
