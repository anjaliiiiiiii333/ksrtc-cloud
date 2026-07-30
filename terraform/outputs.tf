output "app_url" {
  value       = "http://${module.ec2.instance_public_ip}:3000"
  description = "The public URL to access your deployed application"
}