// src/tools/config-updater.ts

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import fs from 'fs/promises';
import YAML from 'yaml';
import { number } from "zod/v4";

/**
 * config.yamlを更新するツールをMCPサーバーに登録する関数。
 *
 * @param server McpServerインスタンス。
 */
export async function registerConfigUpdaterTool(server: McpServer): Promise<void> {
  server.registerTool(
    "update-config-index",
    {
      description: "Update the index value in the config file by incrementing it.",
      inputSchema:
      {
        filePath: z.string().describe("The path to the YAML configuration file."),
        numberOfIncrements: z.number().min(1).default(1).describe("The number of times to increment the index value."),
      }
    },
    async ({ filePath, numberOfIncrements }) => {
      try {
        // 1. ファイルを非同期で読み込む
        const fileContent = await fs.readFile(filePath, 'utf8');

        // 2. YAMLコンテンツをJavaScriptオブジェクトにパースする
        const config = YAML.parse(fileContent);

        // 3. index値を累加する
        if (config && config.root && typeof config.root.index === 'number') {
          config.root.index += numberOfIncrements;
        } else {
          // パスが存在しない場合は初期化
          config.root = { index: numberOfIncrements };
        }

        // 4. 更新されたオブジェクトをYAMLに変換する
        const newYamlContent = YAML.stringify(config);

        // 5. ファイルに書き込む
        await fs.writeFile(filePath, newYamlContent, 'utf8');

        return {
          content: [
            {
              type: "text",
              text: `Successfully updated ${filePath}. New index value is ${config.root.index}.`,
            },
          ],
        };
      } catch (error) {
        console.error("Failed to update config file:", error);
        return {
          content: [
            {
              type: "text",
              text: `Error: Could not update the config file. Reason: ${error.message}`,
            },
          ],
        };
      }
    }
  );
}