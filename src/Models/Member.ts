import { Evenement } from "./Evenement";
import { Article } from "./Publication";

export interface Member
{
    id:string,
    cin:string,
    nom:string,
    type:string,
    cv:string,
    createdDate:string,
    tab_pub:Article[],
    tab_event:Evenement[],
}