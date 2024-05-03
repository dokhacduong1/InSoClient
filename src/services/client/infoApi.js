import { Del, Get, Post } from "../../utils/client/request";

export const createInfo = async (data) => {

    const result = await Post(`/info/create`, data);
    return result;
}
export const editInfo = async (data) => {

    const result = await Post(`/info/edit`, data);
    return result;
}
export const getInfo = async (keyword = '', findAll = 'true') => {

    const result = await Get(`/info?keyword=${keyword}&findAll=${findAll}`);
    return result;
}
export const deleteInfo = async (id) => {
    const result = await Del(`/info/delete?id=${id}`);
    return result;
}
