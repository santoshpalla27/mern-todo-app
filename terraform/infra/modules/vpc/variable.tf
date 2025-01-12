variable "cidr_block" {
  description = "The CIDR block for the VPC"
  type        = string
}

variable "project_name" {
  description = "The name of the project"
  type        = string
}

variable "public_subnet" {
  description = "The CIDR block for the public subnet"
  type        = string
}
variable "private_subnet" {
  description = "The CIDR block for the private subnet"
  type        = string
}
variable "availability_zones_public" {
  description = "The availability zones to use"
  type        = string
}
variable "availability_zone_private" {
  description = "The availability zone for the private subnet"
  type        = string
}