import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function OPTIONS() {
  return NextResponse.json({status: 200});
}

export async function POST(req) {

  try {
    const json = await req.json();
    const response = await notion.blocks.children.list({
      block_id: json.id,
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
    return NextResponse.json({content: templateContent}, {status: 200});

  } catch (e) {
    console.log(e);
    return NextResponse.json({ status: 400}, {statusText: "Bad Request"});
  }
}
