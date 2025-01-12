module "vpc" {
  source = "./modules/vpc"
  cidr_block = "10.0.0.0/16"
  project_name = "three-tier-project"
  public_subnet = "10.0.1.0/24"
  availability_zones_public = "us-east-1a"
  private_subnet = "10.0.2.0/24"
  availability_zone_private = "us-east-1b"
}
module "iam" {
  source = "./modules/iam"
}
module "ec2" {
  source = "./modules/ec2"
  instance_ami = "ami-05576a079321f21f8"
  instance_type = "t2.micro"
  subnet_id = module.vpc.public_subnet_id
  instance_name = "ansible-instance"
  iam_instance_profile = module.iam.instance_profile
  security_group_id = module.vpc.allow_ssh_sg_id
  key_name = "santosh"
}

module "ec2-1" {
  source = "./modules/ec2"
  instance_ami = "ami-05576a079321f21f8"
  instance_type = "t2.large"
  subnet_id = module.vpc.public_subnet_id
  instance_name = "main-instance"
  iam_instance_profile = module.iam.instance_profile
  security_group_id = module.vpc.main_server_sg_id
  key_name = "santosh"
}



