KSRTC Automated AWS Deployment (Next.js + Docker + Terraform)
This repository contains a Next.js application that is fully containerized and deployed to
Amazon Web Services (AWS) using an automated CI/CD pipeline and Infrastructure as Code
(IaC).
Architecture &amp; Tech Stack
• Frontend: Next.js (React)
• Containerization: Docker
• CI/CD: GitHub Actions
• Infrastructure as Code: Terraform
• Cloud Provider (AWS): ECR (Container Registry), EC2 (Compute), VPC (Networking), IAM
(Security)
How It Works
This project eliminates manual cloud provisioning and deployments.
1. Continuous Integration: Pushing code to the main branch triggers a GitHub Actions
workflow (ci.yml) that builds a new Docker image and pushes it to AWS ECR.
2. Continuous Deployment: A parallel Terraform workflow (terraform.yml) initializes and
provisions the required AWS infrastructure (VPC, Subnets, Security Groups, IAM Roles, and
an EC2 instance).
3. Automated Bootstrapping: The EC2 instance uses a user_data script to automatically
install Docker, authenticate with AWS, pull the latest image from ECR, and run the container
on port 3000.
Repository Structure
├── .github/workflows/
│ ├── ci.yml # Docker build and ECR push pipeline
│ └── terraform.yml # Terraform infrastructure pipeline
├── terraform/ # Infrastructure as Code
│ ├── modules/ # VPC and EC2 resource definitions
│ ├── main.tf # Root Terraform configuration
│ ├── variables.tf # AWS account and region variables
│ └── outputs.tf # Outputs the final EC2 Public IP
├── src/ # Next.js Application Source Code
├── Dockerfile # Container build instructions
└── package.json # Node dependencies
Local Development
To run this application locally on your machine:

# 1. Clone the repository
git clone https://github.com/SreedanSKumar/ksrtc-dockerised.git
cd ksrtc-dockerised
# 2. Install dependencies
npm install
# 3. Start the development server
npm run dev
Open http://localhost:3000 with your browser.
Cloud Deployment Setup
To deploy this infrastructure yourself, you must configure the following GitHub Repository
Secrets:
• AWS_ACCESS_KEY_ID: Your AWS IAM user access key.
• AWS_SECRET_ACCESS_KEY: Your AWS IAM user secret key.
• AWS_ACCOUNT_ID: Your 12-digit AWS account number.
Once these secrets are set, simply push a commit to the main branch. GitHub Actions will
handle the entire build and provisioning process.
Teardown (Avoid AWS Charges)
This project provisions live AWS resources that incur hourly charges. When you are finished
running the application, you must destroy the infrastructure.
Run this locally from the root terraform/ directory:
terraform init
terraform destroy -var=&quot;aws_account_id=YOUR_ACCOUNT_ID&quot; -auto-
approve
Verify in your AWS Console that the EC2 instance and VPC have been successfully
terminated.
