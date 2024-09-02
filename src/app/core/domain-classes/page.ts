import { Module } from "./module";

export interface Page {
    id?: string;
    moduleId?: string;
    name: string;
    url?: string;
    module?:Module,
    showInDevice?:boolean,
    showInWeb?:boolean
}
