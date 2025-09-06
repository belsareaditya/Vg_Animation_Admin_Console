locals {
  region = "ap-south-1"
  name   = "aditya-eks-cluster"
  vpc_cidr = "10.123.0.0/16"
  azs      = ["ap-south-1a", "ap-south-1b"]
  public_subnets  = ["10.123.1.0/24", "10.123.2.0/24"]
  tags = {
    Example = local.name
  }
}

provider "aws" {
  region = "ap-south-1"
}
