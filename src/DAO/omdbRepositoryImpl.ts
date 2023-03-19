import {Movie} from "../models/Movie";
import {OmdbRepository} from "./omdbRepository";
import {URL} from "url";
import * as querystring from "querystring";
import axios, {isCancel, AxiosError, AxiosResponse} from "axios";
import {pino} from "pino";
import {Service} from "typedi";

@Service()
export class OmdbRepositoryImpl implements OmdbRepository{
    private hostname:string = "https://www.omdbapi.com/";
    private apiKey:string = <string>process.env.OMDB_APIKEY

    getByTile(title:string): Promise<Movie | null>{

        const queryParams = {
            apiKey: this.apiKey,
            t: title
        }
        const queryString = querystring.stringify(queryParams);
        const url = new URL(`${this.hostname}?${queryString}`)

        return axios.get(url.toString())
            .then((response:AxiosResponse) => <Movie>response.data)
            .catch((error:AxiosError) => {
                pino().error(error)
                return null
            })

    }
}