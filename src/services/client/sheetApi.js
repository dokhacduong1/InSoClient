import { Del, Get, Post, PostMultiPart } from "../../utils/client/request";

export const createSheet = async (data) => {

    const result = await PostMultiPart(`/sheets/create`, data);
    return result;
}
export const getSheet = async (keyword = '', findAll = 'true') => {

    const result = await Get(`/sheets?keyword=${keyword}&findAll=${findAll}`);
    return result;
}
export const deleteSheet = async (id) => {
    const result = await Del(`/sheets/delete?id=${id}`);
    return result;
}
export const editSheet = async (data) => {

    const result = await PostMultiPart(`/sheets/edit`, data);
    return result;
}

export const printSheet = async (data) => {

    const result = await Post(`/sheets/print`, data);
    return result;
}