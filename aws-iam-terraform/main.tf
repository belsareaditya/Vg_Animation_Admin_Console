module "iam_user" {
  source        = "./modules/iam_user"
  user_name     = var.eks_user_name
  creator_name  = var.creator_name
}

output "eks_user_access_key_id" {
  description = "Access key ID for the IAM user"
  value       = module.iam_user.access_key_id
  sensitive   = true
}

output "eks_user_secret_access_key" {
  description = "Secret access key for the IAM user"
  value       = module.iam_user.secret_access_key
  sensitive   = true
}

output "eks_user_console" {
  description = "Console sign-in URL for the account (informational)"
  value       = "https://console.aws.amazon.com/"
}
