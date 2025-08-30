variable "aws_region" {
  description = "AWS region to use"
  type        = string
  default     = "ap-south-1"
}

variable "eks_user_name" {
  description = "Name of the IAM user to create"
  type        = string
  default     = "Eks_User"
}

variable "creator_name" {
  description = "Tag to note who initiated the creation"
  type        = string
  default     = "Aditya"
}
