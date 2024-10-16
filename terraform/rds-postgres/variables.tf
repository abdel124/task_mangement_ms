variable "vpc_id" {
  description = "VPC ID where the RDS instance will be deployed"
  type        = string
}

variable "subnet_ids" {
  description = "Subnet IDs for RDS subnet group"
  type        = list(string)
}

variable "allowed_ip_range" {
  description = "CIDR block for allowed IPs (e.g., office IPs) to access the DB"
  type        = string
}

variable "db_name" {
  description = "Database name"
  type        = string
}

variable "db_username" {
  description = "Master DB username"
  type        = string
}

variable "db_port" {
  description = "Master DB username"
  type        = string
}

variable "db_password" {
  description = "Master DB password"
  type        = string
  sensitive   = true
}

variable "instance_class" {
  description = "RDS instance type (e.g., db.t3.micro)"
  type        = string
  default     = "db.t3.micro"
}
