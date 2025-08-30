variable "user_name" {
  description = "Vault_Guard_User"
  type        = string
}

variable "creator_name" {
  description = "Tag to note who initiated the creation"
  type        = string
  default     = "Aditya"
}

resource "aws_iam_user" "this" {
  name = var.user_name
  tags = {
    CreatedBy = var.creator_name
    Purpose   = "EKS access"
  }
}

# Attach required AWS managed policies
locals {
  policy_arns = [
    "arn:aws:iam::aws:policy/IAMFullAccess",
    "arn:aws:iam::aws:policy/AmazonEC2FullAccess",
    "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy",
    "arn:aws:iam::aws:policy/AdministratorAccess",
    "arn:aws:iam::aws:policy/AmazonVPCFullAccess",
    "arn:aws:iam::aws:policy/AWSCloudFormationFullAccess",
  ]
}

resource "aws_iam_user_policy_attachment" "attachments" {
  for_each   = toset(local.policy_arns)
  user       = aws_iam_user.this.name
  policy_arn = each.value
}

# Create access keys (NOTE: secret is stored in state)
resource "aws_iam_access_key" "this" {
  user = aws_iam_user.this.name
}

output "user_name" {
  value = aws_iam_user.this.name
}

output "access_key_id" {
  value     = aws_iam_access_key.this.id
  sensitive = true
}

output "secret_access_key" {
  value     = aws_iam_access_key.this.secret
  sensitive = true
}
