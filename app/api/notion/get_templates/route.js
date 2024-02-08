import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const blockID = process.env.NOTION_PAGE_ID;

export async function OPTIONS() {
  return NextResponse.json({status: 200});
}

export async function GET() {

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

  return NextResponse.json({templates}, {status: 200});
}
