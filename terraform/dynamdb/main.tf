provider "aws" {
  region = "us-west-2" # Update with your preferred region
}

# Create a DynamoDB Table
resource "aws_dynamodb_table" "tasks" {
  name         = "Tasks"          # Name of the DynamoDB table
  billing_mode = "PAY_PER_REQUEST" # Use on-demand pricing

  # Define the primary key (partition key) and sort key
  attribute {
    name = "userId"
    type = "S" # String type for the userId
  }
  attribute {
    name = "taskId"
    type = "S" # String type for the taskId
  }
  
  hash_key = "userId"  # Primary key
  range_key = "taskId"  # Sort key

  tags = {
    Name = "Tasks"
  }
}