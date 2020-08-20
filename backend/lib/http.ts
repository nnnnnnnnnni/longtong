import axios from 'axios'
import { IParams } from './interface'
import Axios from 'axios'

export const get = async (params: IParams): Promise<any> => {
    return Axios.get(params.url, params.data)
}

export const post = async (params: IParams): Promise<any> => {
    return Axios.post(params.url, params.data)
}