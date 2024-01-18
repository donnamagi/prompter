import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function (req, res) {

  const response = await notion.blocks.children.list({
    block_id: req.body.id,
    page_size: 50,
  });

  var template_content = ''

  for (const block of response.results) {
    if (block.type === 'paragraph' && block.paragraph.rich_text[0]) {
      template_content += block.paragraph.rich_text[0].plain_text;
    }
  }

  res.status(200).json(template_content);
}
