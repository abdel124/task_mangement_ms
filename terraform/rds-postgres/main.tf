provider "aws" {
  region = "us-west-2"  # Replace with your desired AWS region
  profile = "default"
}

# Create a security group for the RDS instance
resource "aws_security_group" "rds_sg" {
  name        = "rds_postgresql_sg"
  description = "Allow PostgreSQL inbound traffic"
  vpc_id      = var.vpc_id  # Reference to your VPC

  # Allow inbound traffic on PostgreSQL port 5432
  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = [var.allowed_ip_range]  # Replace with your allowed IP range
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "rds_postgresql_sg"
  }
}

# Create a subnet group for the RDS instance
resource "aws_db_subnet_group" "rds_subnet_group" {
  name       = "rds_subnet_group"
  subnet_ids = var.subnet_ids  # Subnet IDs from your VPC

  tags = {
    Name = "rds_subnet_group"
  }
}

# Create the RDS PostgreSQL instance
resource "aws_db_instance" "postgresql" {
  allocated_storage    = 20                      # Size in GB
  engine               = "postgres"
  engine_version       = "16.3"                  # Adjust the version as needed
  instance_class       = "db.t3.micro"           # Choose instance class based on your requirements
  db_name                 = var.db_name             # Database name
  username             = var.db_username         # DB username
  password             = var.db_password         # DB password
  port                 = 5432
  publicly_accessible  = true                   # Set to true if public access is needed
  storage_type         = "gp2"                   # General-purpose SSD storage
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  db_subnet_group_name = aws_db_subnet_group.rds_subnet_group.name
  skip_final_snapshot  = true                    # Optional: skip final snapshot when destroying

  # Backup & monitoring configurations
  backup_retention_period = 7                    # Days to retain backups
  backup_window           = "03:00-04:00"        # Daily backup window
  maintenance_window      = "Sun:05:00-Sun:06:00" # Weekly maintenance window
  apply_immediately       = true                 # Apply changes immediately

  # Enable monitoring
  monitoring_interval     = 60                   # Enable enhanced monitoring
  monitoring_role_arn     = aws_iam_role.rds_monitoring_role.arn

  tags = {
    Name = "rds-postgresql"
  }
}

# Create an IAM role for RDS enhanced monitoring
resource "aws_iam_role" "rds_monitoring_role" {
  name = "rds-monitoring-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "monitoring.rds.amazonaws.com"
      }
    }]
  })
}

# Attach monitoring policy to the role
resource "aws_iam_role_policy_attachment" "rds_monitoring_role_policy" {
  role       = aws_iam_role.rds_monitoring_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonRDSEnhancedMonitoringRole"
}