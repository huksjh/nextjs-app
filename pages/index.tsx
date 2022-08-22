import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { getSortedPostsData } from '../lib/post'
import homeStyles from '../styles/Home.module.css'

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
    <div className={homeStyles.container}>
      <Head>
        <title>Your Name</title>
      </Head>

      <section className={homeStyles.headingMd}>
        <p>[huks Introduction]</p>
        <p>(This is a website)</p>
      </section>
      <section className={`${homeStyles.headingMd}${homeStyles.padding1px}`}>
        <h2 className={homeStyles.headingLg}>Blog</h2>
        <ul className={homeStyles.List}>
          {allPostsData.map(({id, title, date}) => 
            <li className={homeStyles.listItem} key={id}>
              <a>{title}</a>
              <br />
              <small className={homeStyles.lightText}>{date}</small>
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