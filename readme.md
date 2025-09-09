# MCP Server Hello

This project implements a Model Context Protocol (MCP) server that provides several tools, resources, and prompts. It's designed to be used with the Gemini CLI as an MCP server.

## Available Functionalities

*   **`add` tool:** Adds two numbers together.
*   **`get-time` tool:** Returns the current server time.
*   **`random-joke` resource:** Provides a random joke.
*   **`friendly-greeting` prompt:** Generates a friendly greeting message given a name.

## Installation

To set up the project, follow these steps:

1.  **Clone the repository (if applicable):**
    ```bash
    # If this project is part of a larger repository, clone it first.
    # git clone <repository-url>
    # cd mcp-server-hello
    ```

2.  **Install dependencies:**
    Navigate to the project root directory and install the required Node.js packages:
    ```bash
    npm install
    ```

## How to Run

To run the MCP server:

1.  **Build the TypeScript project:**
    ```bash
    npm run build
    ```

2.  **Start the server:**
    ```bash
    npm start
    ```
    The server will start and listen for connections. You won't see much output on the console as `console.log` has been removed to avoid interfering with the MCP protocol. Errors will be logged to `stderr`.

## Deployment

This server is intended to be run as a background process, typically managed by a process manager or as part of a larger system. Ensure that the `npm run build` step is executed before starting the server in a production environment.

## Usage with Gemini CLI
1. create `./.gemini/settings.json` for Gemini CLI
    ```json
    {
    "mcpServers": {
        "my-mcp": {
        "command": "node",
        "args": ["./dist/server.js"],
        "transport": "stdio"
        }
    }
    }
    ```
2. check mcp server status by `/mcp list` after gemini-cli start  
   - This server acts as an MCP server for the Gemini CLI. 
   - Once the server is running, the Gemini CLI can connect to it and utilize the registered tools, resources, and prompts.

   ```bash
    ℹConfigured MCP servers:
    
    🟢 my-mcp - Ready (2 tools, 1 prompt)
        Tools:
        - add
        - get-time

        Prompts:
        - friendly-greeting


    💡 Tips:
        • Use /mcp desc to show server and tool descriptions
        • Use /mcp schema to show tool parameter schemas
        • Use /mcp nodesc to hide descriptions
        • Use /mcp auth <server-name> to authenticate with OAuth-enabled servers
        • Press Ctrl+T to toggle tool descriptions on/off   
   ```  

## Test of tools, resources, and prompts by Gemini-cli
The Gemini CLI will communicate with this MCP server to execute the requested functionality and return the results.
1. invoke the 'add' tool 
   ```bash
   #prompt1: 
   > result of add 123456,456789 
    ✓  add (summarize-mcp MCP Server) {"b":456789,"a":123456}        
    The sum of 123456 and 456789 is 580245.   
   #result of add 123456,456789 
   ✦ 580245

   #prompt2: 
   > add 123,456 
    ✓  add (summarize-mcp MCP Server) {"b":456,"a":123}       
    The sum of 123 and 456 is 579.   
   ✦ 579
   ```  
2. invoke the 'get-time' tool
   ```bash
   #prompt: 
   >  what time now? 
    ✓  get-time (summarize-mcp MCP Server) {}       
    The current server time is 14:28:32. 
   ✦ The current time is 14:28:32. 
   ```  
3. invoke the 'random-joke' resource
   ```bash
   #prompt: 
   >  tell me a joke 
   ✦ Why don't scientists trust atoms?    
   Because they make up everything 
   ```  
4. invoke the 'friendly-greeting' prompt
   ```bash
   #prompt
   > friendly-greeting to wangxg 
   ✦ Hello, wangxg! It's a pleasure to meet you. I hope you're having a fantastic day
   ```