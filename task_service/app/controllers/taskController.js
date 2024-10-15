const AWS = require('aws-sdk');

// Configure DynamoDB
AWS.config.update({
    region: "us-west-2", // Update with your preferred region
});
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "Tasks"; // Replace with your DynamoDB table name

// Create a new task
exports.createTask = async (req, res) => {
    const { userId, title, description } = req.body;
    
    const task = {
        userId,
        taskId: AWS.util.uuid.v4(), // Generate a unique task ID
        title,
        description,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    const params = {
        TableName: TABLE_NAME,
        Item: task,
    };

    try {
        await dynamoDB.put(params).promise();
        res.status(201).json(task);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: "Could not create task" });
    }
};

// Get all tasks by user ID
exports.getTasksByUserId = async (req, res) => {
    const { userId } = req.params;

    const params = {
        TableName: TABLE_NAME,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
            ":userId": userId,
        },
    };

    try {
        const data = await dynamoDB.query(params).promise();
        res.status(200).json(data.Items);
    } catch (error) {
        console.error("Error retrieving tasks:", error);
        res.status(500).json({ error: "Could not retrieve tasks" });
    }
};

// Get a specific task by user ID and task ID
exports.getTaskById = async (req, res) => {
    const { userId, taskId } = req.params;

    const params = {
        TableName: TABLE_NAME,
        Key: {
            userId,
            taskId,
        },
    };

    try {
        const data = await dynamoDB.get(params).promise();
        if (!data.Item) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json(data.Item);
    } catch (error) {
        console.error("Error retrieving task:", error);
        res.status(500).json({ error: "Could not retrieve task" });
    }
};

// Update a specific task by user ID and task ID
exports.updateTask = async (req, res) => {
    const { userId, taskId } = req.params;
    const { title, description, completed } = req.body;

    const params = {
        TableName: TABLE_NAME,
        Key: {
            userId,
            taskId,
        },
        UpdateExpression: "set title = :title, description = :description, completed = :completed, updatedAt = :updatedAt",
        ExpressionAttributeValues: {
            ":title": title,
            ":description": description,
            ":completed": completed,
            ":updatedAt": new Date().toISOString(),
        },
        ReturnValues: "UPDATED_NEW",
    };

    try {
        const data = await dynamoDB.update(params).promise();
        res.status(200).json(data.Attributes);
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: "Could not update task" });
    }
};

// Delete a specific task by user ID and task ID
exports.deleteTask = async (req, res) => {
    const { userId, taskId } = req.params;

    const params = {
        TableName: TABLE_NAME,
        Key: {
            userId,
            taskId,
        },
    };

    try {
        await dynamoDB.delete(params).promise();
        res.status(204).send(); // No content to send back
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Could not delete task" });
    }
};
