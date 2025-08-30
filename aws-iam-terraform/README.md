# AWS IAM User (+Policies) for EKS — Terraform

This project creates an IAM user **Eks_User**, attaches the requested AWS-managed policies, and generates an **access key ID** and **secret access key**. Outputs are available via `terraform output` (marked `sensitive`).

> **Policies attached**
>
> - `IAMFullAccess`
> - `AmazonEC2FullAccess`
> - `AmazonEKSClusterPolicy`
> - `AmazonVPCFullAccess`
> - `AWSCloudFormationFullAccess`

> **Security note:** The secret is stored in your Terraform state. Protect your state (e.g., remote state with encryption + access controls). Rotate keys if any doubt of exposure.

## Prereqs
- Terraform >= 1.5
- AWS credentials configured (e.g., via `aws configure`), with permissions to create IAM users, attach policies, and create access keys.
- Region default is `ap-south-1`. Change in `variables.tf` if needed.

## Usage
```bash
cd aws-iam-eks-terraform

# Initialize
terraform init

# Review plan
terraform plan -var="eks_user_name=Eks_User" -var="creator_name=Aditya"

# Apply
terraform apply -auto-approve
```

### Get the keys (in your terminal)
```bash
# Access Key ID
terraform output -raw eks_user_access_key_id

# Secret Access Key
terraform output -raw eks_user_secret_access_key
```
> Tip: Store them to environment variables if you want to use them immediately:
```bash
export AWS_ACCESS_KEY_ID="$(terraform output -raw eks_user_access_key_id)"
export AWS_SECRET_ACCESS_KEY="$(terraform output -raw eks_user_secret_access_key)"
export AWS_DEFAULT_REGION="ap-south-1"
```

---

## EKS (eksctl) — Commands to run separately

> These are **not** run by Terraform. Execute them manually after the IAM user is created and you have credentials exported. Make sure you have `eksctl` and `kubectl` installed, and your AWS CLI is using the new credentials.

### 1) Create EKS cluster (no nodegroup)
(a)
```bash
eksctl create cluster --name=Cloudaseem                       --region=ap-south-1                       --zones=ap-south-1a,ap-south-1b                       --version=1.30                       --without-nodegroup
```

(b)
```bash
eksctl utils associate-iam-oidc-provider     --region ap-south-1     --cluster Cloudaseem     --approve
```

### 2) Create a managed nodegroup
```bash
eksctl create nodegroup   --cluster aditya_server   --region ap-south-1   --name node2   --node-type t3.medium   --nodes 2   --nodes-min 2   --nodes-max 4   --node-volume-size 20   --ssh-access   --ssh-public-key vault_guard   --managed   --asg-access   --external-dns-access   --full-ecr-access   --appmesh-access   --alb-ingress-access
```
> Adjust `--cluster` to the actual EKS cluster name you are targeting (e.g., `Cloudaseem` if you want the nodegroup on that cluster).

The same commands are provided as ready-to-run shell scripts in `./scripts`.

---

## Clean up
```bash
terraform destroy
```
This will remove the IAM user and its access keys (policies detach automatically).
