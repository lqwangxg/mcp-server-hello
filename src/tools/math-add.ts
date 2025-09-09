// src/tools/math-add.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

/**
 * 2つの数値を加算するツールをMCPサーバーに登録する関数。
 *
 * @param server McpServerインスタンス。
 */
export async function registerMathAddTool(server: McpServer): Promise<void> {
  // Register a tool for adding two numbers.
  server.registerTool(
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
}