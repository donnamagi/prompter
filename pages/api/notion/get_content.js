import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function (req, res) {
  const { id } = req.body;
  const response = await notion.blocks.children.list({
    block_id: id,
    page_size: 50,
  });

  let templateContent = '';

  for (const block of response.results) {
    switch (block.type) {
      case 'heading_1':
      case 'heading_2':
      case 'heading_3':
      case 'numbered_list_item':
      case 'bulleted_list_item':
        for (const object of block[block.type].rich_text) {
          templateContent += `${object.plain_text}\n`;
        }
        break;
      case 'paragraph':
        for (const object of block.paragraph.rich_text) {
          templateContent += `${object.plain_text}\n`;
        }
        if (block.paragraph.rich_text.length === 0) {
          templateContent += '\n';
        }
        break;
    }
  }

  res.status(200).json(templateContent);
}
