import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { registerServerTimeTool } from "./src/tools/server-time.js";
import { registerMathAddTool } from "./src/tools/math-add.js";
import { registerConfigUpdaterTool } from "./src/tools/config-updater.js";

// サーバーの共通設定
const SERVER_INFO = {
  name: "multi-mode-mcp-server",
  version: "1.0.0",
  description: "An MCP server supporting multiple transport modes.",
};
// Initialize the MCP server with a name and version.
const mcpServer = new McpServer(SERVER_INFO);

// Register a resource for getting a random joke.
mcpServer.registerResource(
  "joke",
  "joke://{joke}",
  {
    description: "Get a random joke",
    inputSchema: {},
  },
  async () => {
    const jokes = [
      "Why don't scientists trust atoms? Because they make up everything!",
      "Why did the scarecrow win an award? Because he was outstanding in his field!",
      "Why don't programmers like nature? It has too many bugs.",
      "为什么花儿是红的？因为它们看到了玫瑰。",
      "为什么数学书总是很难过？因为它有太多的问题。",
      "程序员为什么喜欢下雨天？因为可以在家里调试代码。",
      "科学家为什么不相信原子？因为它们编造了一切！",
      "稻草人为什么得奖了？因为他在田野里表现出色！",
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
          text: `Hello, ${name} 您好! Hope you're having a fantastic day!`,
        },
      ],
    };
  }
);

// カスタムHTTPトランスポートクラス

// Main function to connect the MCP server to the transport.
async function main() {

  // 非同期関数としてツールを登録
  await registerMathAddTool(mcpServer);
  await registerConfigUpdaterTool(mcpServer);
  await registerServerTimeTool(mcpServer);

  const args = process.argv.slice(2);
  const mode = args.find(arg => arg.startsWith('--mode='))?.split('=')[1] || 'stdio';
  const port = parseInt(args.find(arg => arg.startsWith('--port='))?.split('=')[1] || '8080', 10);

  let transport;

  switch (mode) {
    case 'http':
      // startHttpServer(mcpServer, port);
      console.error(`Starting MCP server in HTTP mode on port ${port}...`);
      break;
    default:
      transport = new StdioServerTransport();
      console.error("Starting MCP server in STDIO mode...");
      await mcpServer.connect(transport);
      break;
  }
  // remove console.log to avoid output to stdout
  //console.log("MCP server is running..."); 
}

// Handle any errors that occur during server operation.
main().catch((error) => {
  // During development, it's okay to log errors to stderr
  console.error("Server error:", error);
  process.exit(1);
});