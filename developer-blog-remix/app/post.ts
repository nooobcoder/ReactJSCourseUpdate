import path from "path"
import fs from "fs/promises";
import parseFrontMatter, {FrontMatterResult} from "front-matter";
import invariant from "tiny-invariant"
import {marked} from "marked";

export type Post = {
    slug: string;
    title: string;
};
export type PostMarkdownAttributes = {
    title: string;
};

// Relative to the server path and not src
let postsPath = path.join(__dirname, "..", "posts")

// Ensure our posts have the proper meta data and get type safety
function isValidPostAttributes(attributes: any): attributes is PostMarkdownAttributes {
    return attributes?.title
}

export async function getPosts() {
    let dir = await fs.readdir(postsPath);
    return Promise.all(
        dir.map(async filename => {
            let file = await fs.readFile(path.join(postsPath, filename))
            let {attributes}: FrontMatterResult<any> = parseFrontMatter(file.toString());
            invariant(isValidPostAttributes(attributes), `${filename} has bad meta data!`)
            return {
                slug: filename.replace(/\.md$/, ""),
                title: attributes.title
            }
        })
    )
}

export async function getPost(slug: string) {
    let filepath = path.join(postsPath, `${slug}.md`)
    let file = await fs.readFile(filepath);
    let {attributes, body}: FrontMatterResult<any> = parseFrontMatter(file.toString());
    invariant(
        isValidPostAttributes(attributes),
        `Post ${filepath} is missing attributes`
    );
    let html = marked(body)
    return {slug, html, title: attributes.title};
}