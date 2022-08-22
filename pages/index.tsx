import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { getSortedPostsData } from '../lib/post'
import styles from '../styles/Home.module.css'

const Home = ({allPostsData}:{
  allPostsData:{
    date: string
    title: string
    id: string
  }[]
  /**
   * allPostsData 데이터는
   * [] 배열안에 {date:'', title:'', id:'' } 오브젝트 형태로 데이터가 담겨있다는 뜻
   */
}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Your Name</title>
      </Head>

      <section className={styles.headingMd}>
        <p>[huks Introduction]</p>
        <p>(This is a website)</p>
      </section>
      <section className={`${styles.headingMd}${styles.padding1px}`}>
        <h2 className={styles.headingLg}>Blog</h2>
        <ul className={styles.List}>
          {allPostsData.map(({id, title, date}) => 
            <li className={styles.listItem} key={id}>
              <a>{title}</a>
              <br />
              <small className={styles.lightText}>{date}</small>
            </li>
          )}
        </ul>
      </section>
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props:{
      allPostsData
    }
  }
}