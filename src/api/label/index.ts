import { Get } from "../request";
import { Label } from "./type";

export const getLabelsByName = (name: string) =>{
    return Get<Label[]>(`/label/name/${name}`)
}

export const getLabels = () =>{
    return Get<Label[]>("/label")
}