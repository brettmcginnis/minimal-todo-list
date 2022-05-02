import * as readline from "readline";
import { App, TFile, getAllTags } from "obsidian";
import { createReadStream } from "fs";
// import { Tag } from "../Tag";

export function getAllVaultTags(app: App): Set<string> {
    const files = app.vault.getMarkdownFiles();
    const result = new Set<string>();
    for (let file of files) {
        const tags = getAllTags(app.metadataCache.getCache(file.path)) || [];
        if (!tags.length) continue;
        for (let tag of tags) {
            console.log({tag})
            // Lower case tags as get fetch them
            result.add(tag.toLocaleLowerCase());
        }
    }
    return result;
}

function hasTag(tags: string[], value: string): boolean {
    if (!tags.length || !Array.isArray(tags)) return false;
    return tags.some((v) => v.toLocaleLowerCase() === value.toLocaleLowerCase());
}
/**
 * Returns a Set of files that contain a given tag
 * @param app - Obsidian app object
 * @param tag - Tag to find
 * @returns
 */
export function getAllFilesMatchingTag(app: App, tag: string): Set<TFile> {
    const files = app.vault.getMarkdownFiles();
    const result: Set<TFile> = new Set();
    for (let file of files) {
        const tags = getAllTags(app.metadataCache.getCache(file.path)) || [];
        if (hasTag(tags, tag)) {
            result.add(file);
        }
    }

    return result;
}

async function getAllLines(path: string): Promise<Array<string>>{
    const rl = readline.createInterface({
        input: createReadStream(path),
        crlfDelay: Infinity
    })

    rl.on('line', (line) => {
        console.log(line)
    })

    rl.on('close',() => {
        console.log('closed')
    })


    return new Array<string>()
}

// // const contents = fs.readFileSync(`${}/${f.path}`, 'utf8');
// console.log(`
// ${f.name}
// created: ${new Date(f.stat.ctime).toLocaleDateString()}
// size: ${f.stat.size}
// `)

// console.log({thing: f.vault.getFiles()})
// TODO Set<TFile> to Array
// Await nested async
// Parse file
// find row with tag
// see if row has an id of some sort
export async function getAllTagLines(app: App, tag: string): Promise<Array<string>> {
    const tags = getAllTags(app.metadataCache.getCache(file.path)) || [];
    const files = getAllFilesMatchingTag(app, tag)

    files.forEach(f => {
        const path = `${app.vault.adapter.basePath}/${f.path}`
        // does work
        // try {
        //     const stuff = await getAllLines(path)
        //     console.log(stuff)
        // } catch (error) {
        //     console.error(error)
        // }

        console.log(f)
        // console.log(`
        // Name: ${f.name}
        // created: ${new Date(f.stat.ctime).toLocaleDateString()}
        // isEmpty: ${f.stat.size == 0}
        // path: ${path}
        // getResourcePath: ${app.vault.adapter.getResourcePath(f.path)}
        // vault: 
        // `)
    })




    return new Array<string>()
}
