import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
            </Head>

            <section className={styles.headingMd}>
                <p>[Your Self Introduction]</p>
                <p>(This is a website)</p>
            </section>
            <section className={`${styles.headingMd} ${styles.padding1px}`}>
                <h2 className={styles.headingLg}>Blog</h2>
                <ul className={styles.list}></ul>
            </section>
        </div>
    );
}
