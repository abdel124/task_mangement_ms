output "rds_endpoint" {
  description = "RDS PostgreSQL endpoint"
  value       = aws_db_instance.postgresql.endpoint
}

output "rds_port" {
  description = "RDS PostgreSQL port"
  value       = aws_db_instance.postgresql.port
}

output "rds_security_group_id" {
  description = "RDS security group ID"
  value       = aws_security_group.rds_sg.id
}
