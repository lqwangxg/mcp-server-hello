import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Initialize the MCP server with a name and version.
const mcpServer = new McpServer({
  name: "tools-with-sample-server",
  version: "1.0.0",
});

// Register a tool for adding two numbers.
mcpServer.registerTool(
  "add",
  {
    description: "Add two numbers together",
    inputSchema: {
      a: z.number().describe("The first number to add."),
      b: z.number().describe("The second number to add."),
    },
  },
  async ({ a, b }) => {
    const result = a + b;
    return {
      content: [
        {
          type: "text",
          text: `The sum of ${a} and ${b} is ${result}.`,
        },
      ],
    };
  }
);

// Register a tool for getting the current server time.
mcpServer.registerTool(
  "get-time",
  {
    description: "Get the current server time",
    inputSchema: {},
  },
  async () => {
    const now = new Date();
    return {
      content: [
        {
          type: "text",
          text: `The current server time is ${now.toLocaleTimeString()}.`,
        },
      ],
    };
  }
);

// Register a resource for getting a random joke.
mcpServer.registerResource(
  "random-joke",
  "random-joke://{joke}",
  {
    description: "Get a random joke",
    inputSchema: {},
  },
  async () => {
    const jokes = [
      "Why don't scientists trust atoms? Because they make up everything!",
      "Why did the scarecrow win an award? Because he was outstanding in his field!",
      "Why don't programmers like nature? It has too many bugs.",
    ];
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    return {
      content: [
        {
          type: "text",
          text: randomJoke,
        },
      ],
    };
  }
);

// Register a prompt for generating a friendly greeting message.
mcpServer.registerPrompt(
  "friendly-greeting",
  {
    title: "Friendly Greeting Prompt",
    description: "Generate a friendly greeting message",
    argsSchema: {
      name: z.string().describe("The name of the person to greet"),
    },
  },
  async ({ name }) => {
    return {
      content: [
        {
          type: "text",
          text: `Hello, ${name}! Hope you're having a fantastic day!`,
        },
      ],
    };
  }
);

// Main function to connect the MCP server to the transport.
async function main() {
  const transport = new StdioServerTransport();
  await mcpServer.connect(transport);
  // remove console.log to avoid output to stdout
  //console.log("MCP server is running..."); 
}

// Handle any errors that occur during server operation.
main().catch((error) => {
  // During development, it's okay to log errors to stderr
  console.error("Server error:", error);
  process.exit(1);
});