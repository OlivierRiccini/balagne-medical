export interface IContentSection {
    title?: { text: string, styleOptions?: string };
    paragraphes: { text: string, styleOptions?: string }[];
    images?: { url: string, styleOptions?: string }[];
    styleOptions?: string;
}

export interface IContentChapter {
    title?: { text: string, styleOptions?: string };
    sections: IContentSection[];
}

export interface IContent {
    chapters: IContentChapter[];
}
