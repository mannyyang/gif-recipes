import axios from 'axios';

interface ISearchReqObj {
    query: string;
    size: number;
    from: number;
    options?: any;
}

export function searchRecipes(searchReqObj: ISearchReqObj): Promise<any> {
    return axios.get(`//dev.quixcipes.com/recipe?recipe_contains=${searchReqObj.query}`)
        .catch(ex => {
            return ex;
        });
}

export function getRawRecipes() {
    return axios.get('//dev.quixcipes.com/recipe')
        .catch(ex => {
            return ex;
        });
}