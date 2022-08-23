import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';
import {getAllPostIds, getPostData} from '../../lib/post';

import postsStyle from "../../styles/Posts.module.css"
const Post = ({postData}:{
    postData: {
        id: string
        contentHtml: string
        date: string
        title: string
    }
}) => {
    return (
        <div className={postsStyle.container}>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article className={postsStyle.article}>
                <h1 className={postsStyle.title}>{postData.title}</h1>
                <div className={postsStyle.date}>{postData.date}</div>
                <div dangerouslySetInnerHTML={{__html:postData.contentHtml}}></div>
            </article>
        </div>
    );
};

export default Post;

// 동적 라우팅을 사용할 때, 어떤 페이지를 미리 Static으로 빌드할 지 정하는 api
export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds();
    console.log('paths', paths);
    // paths [ { params: { id: 'pre-render' } }, { params: { id: 'ssr' } } ]
    return {
        paths,
        fallback: false
    }
    
}

// 동적 라우팅의 경로 이름을 가져온다.
export const getStaticProps: GetStaticProps = async ({params}) => {
    console.log('getStaticProps', params.id);
    // 
    const postData = await getPostData(params.id as string)
    console.log('postData', postData);
    return {
        props: {
            postData
        }
    }
    
}