import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Namesh Singh</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
        <Link href="/">Namesh Singh</Link>
        </h1>

      </main>

      <footer className={styles.footer}>
       Footer
      </footer>
    </div>
  );
}
