# MCP Server Hello

This project implements a Model Context Protocol (MCP) server that provides a "summarize" tool. This tool leverages a Large Language Model (LLM) to generate concise summaries of provided text. It's designed to be used with the Gemini CLI as an MCP server.

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

This server acts as an MCP server for the Gemini CLI. Once the server is running, the Gemini CLI can connect to it and utilize the registered "summarize" tool.

To use the "summarize" tool from the Gemini CLI, you would typically interact with the CLI in a way that triggers tool execution. For example:

```bash
# Example of how you might invoke the summarize tool via Gemini CLI (actual command may vary)
gemini-cli --tool summarize --text "Your long text here that needs summarizing."
```

The Gemini CLI will communicate with this MCP server to execute the `summarize` tool and return the LLM-generated summary.
