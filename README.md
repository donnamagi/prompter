# README

## Overview

This application simplifies and speeds up repetitive text-based tasks with an LLM – for example, writing tickets for an application. It fetches ready-made templates via the Notion API, allowing users to choose and personalize these templates by filling in only the variable data. Once the template is filled, it's processed by OpenAI's LLM to generate a polished, context-aware response.

To fine-tune the output, users can directly edit the `p` and `ul` tags in the response. Just point to the section you want to change, tell the app what you need, and it'll work with OpenAI's API to replace the section. This ensures the final ticket is ready to copy-pasta without any further rewriting.

This is deployed, and can be viewed at [https://www.donnamagi.com/prompts](https://www.donnamagi.com/prompts).

### Using the Application

1. **Choose a Prompt:** Select a pre-written prompt from the options

2. **Fill in the Gaps:** Fill in the placeholders with your specific data

3. **Generate and Refine:** Send the completed prompt to the LLM to generate a response

4. **Finalize the Ticket:** Review and edit specific sections (`p`, `ul` tags) as needed by targeting them directly and stating the desired changes. Your ticket is now ready to be copied (MD format).


## Setup

If you want to run this with your own set of prompts from Notion, you'll have to run it locally. 

Placeholders are detected automatically by the app. Just set all placeholders on Notion between curly braces (for ex. {description} ).

### Prerequisites

- Node.js >= 16.0 
- npm or Yarn

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/donnamagi/prompter.git
   cd prompter
   ```

2. **Install dependencies:**

   ```sh
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**

   Copy `.env.example` to create a `.env` file in the root directory of your project. Both the Notion API and the OpenAI API need some setup on their respective sites. 

   ```sh
    OPENAI_API_KEY=
    NOTION_API_KEY=
    NOTION_PAGE_ID=     ## this is the page you want to pull your templates from. A subpage == template
    NEXT_PUBLIC_FETCH_BASE_URL='prompts/api'     ## leave as-is when developing locally
   ```
  
4. **Start the development server:**

   ```sh
   npm run dev
   # or
   yarn dev
   ```

## License

[MIT License](https://choosealicense.com/licenses/mit/)
