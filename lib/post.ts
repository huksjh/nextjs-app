import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");
console.log(`process.cwd => ${process.cwd()}`);
console.log(`postDirectory => ${postsDirectory}`);

export function getSortedPostsData() {
    const fileNames = fs.readdirSync(postsDirectory);
    console.log(fileNames);
    // [pre-render, ssr, ....]

    const allPostsData = fileNames.map((fileName) => {
        // posts 폴더안에 확장자 md로 끝나는 파일  확장자 지우기
        const id = fileName.replace(/\.md$/, "");

        // 파일 풀경로 생성
        const fullPath = path.join(postsDirectory, fileName);
        // 파일 풀경로 통해 파일 내용 읽기
        const fileContents = fs.readFileSync(fullPath, "utf-8");

        // gray-matter 통해 내용을 Object 형태로 컨버터후 matterResult 로 전달
        const matterResult = matter(fileContents);

        return {
            id, // ****.md 파일 에 확장자 지운 앞부분을 id로 설정
            ...(matterResult.data as { date: string; title: string }),
        };
    });

    // 최종 리턴된 객체를 소트로 정렬 해준다 # 마크다운 date 날짜 기준
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

// posts 폴더안에 파일명만 구해서 리턴
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);

    return fileNames.map((fileName) => {
        // posts 폴더안에 확장자 md로 끝나는 파일  확장자 지우기
        return {
            params: {
                id: fileName.replace(/\.md$/, ""),
            },
        };
    });
}

export async function getPostData(id: string) {
    console.info("getPostData", id);
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf-8");

    // 마크다운파일 obj 형태 생성
    const matterResult = matter(fileContents);

    // 마크다운 파일 html 형태로 리턴
    const processedContent = await remark().use(remarkHtml).process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
        id, // ****.md 파일 에 확장자 지운 앞부분을 id로 설정
        contentHtml,
        ...(matterResult.data as { date: string; title: string }),
    };
}
