import Image from 'next/image';
import styles from './page.module.css';

export default async function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
      </div>
    </main>
  );
}
