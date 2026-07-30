variable "vpc_id" { type = string }
variable "subnet_id" { type = string }
variable "aws_region" { type = string }
variable "aws_account_id" { type = string }
variable "instance_type" {
  type    = string
  default = "t2.micro"
}