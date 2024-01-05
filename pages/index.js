import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import TemplateButtons from "./components/TemplateButtons";
import Result from "./components/Result";

export default function Home() {
  const [result, setResult] = useState();

  return (
    <div>
      <Head>
        <title>Prompt templates</title>
      </Head>
      <main className={styles.main} >
        {result ? 
          <Result result={result} />
          :
          <TemplateButtons setResult={setResult} />
        }
      </main>
    </div>
  );
}
