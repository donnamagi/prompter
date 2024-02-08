import TemplateSearch from "./templateSearch"
 
export default function Page() {
  return (
    <>
      <TemplateSearch />
      <div className='fixed top-2/3 w-2/3 text-center'>
        <p className="text-sm text-zinc-500">
          This app fetches templates from <a className="text-zinc-400 hover:text-zinc-200 text-sm" href="https://www.notion.so/donnamagi/Prompts-API-0578db9a3c3847a795934d65a161ac95?pvs=4" target="_blank">Notion</a>, and checks its content for placeholders. <br />
          After processing, you have the chance to interactively modify the result. <br /> <br />
          The result is a personalized document, ready to be used.
        </p>
      </div>
    </> 
  );
}
