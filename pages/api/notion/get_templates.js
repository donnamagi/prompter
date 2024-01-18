import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const blockID = process.env.NOTION_PAGE_ID;

export default async function (req, res) {

  var templates = []
  const response = await notion.blocks.children.list({
    block_id: blockID,
    page_size: 50,
  });

  for (const block of response.results) {
    if (block.type === 'child_page') {
      const prompt_object = block.child_page
      templates.push({title: prompt_object.title, id: block.id});
    }
  }
  res.status(200).json(templates);
}

