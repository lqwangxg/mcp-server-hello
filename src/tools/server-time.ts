// src/tools/get-time.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

/**
 * 現在のサーバー時間を取得するツールをMCPサーバーに登録する関数。
 *
 * @param server McpServerインスタンス。
 */
export async function registerServerTimeTool(server: McpServer): Promise<void> {
  // Register a tool for getting the current server time.
  server.registerTool(
    "server-time",
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
}