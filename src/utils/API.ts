import * as elasticsearch from 'elasticsearch-browser';
const ESClient = new elasticsearch.Client({
    host: 'https://search-quixcipes-u5h75uljnqooatmnakqcvn3npu.us-west-1.es.amazonaws.com',
    log: 'trace'
});

interface ISearchReqObj {
    query: string;
    size: number;
    from: number;
    options?: any;
}

interface IQueryObj {
    query?: {
        bool?: {
            must?: Array<any>
        }
    };
}

export function searchRecipes(searchReqObj: ISearchReqObj): Promise<any> {
    let queryObj: IQueryObj = {};

    queryObj.query = {};
    queryObj.query.bool = {};
    queryObj.query.bool.must = [];

    if (searchReqObj.options.title) {
        queryObj.query.bool.must = queryObj.query.bool.must.concat(
            searchReqObj.query.split(',').map(item => {
                return { match: { title: item.trim() } };
            })
        );
    }

    if (searchReqObj.options.ingredients) {
        queryObj.query.bool.must = queryObj.query.bool.must.concat(
            searchReqObj.query.split(',').map(item => {
                return { match: { recipe: item.trim() } };
            })
        );
    }

    return ESClient.search({
        index: 'raw',
        type: 'recipe',
        size: searchReqObj.size,
        from: searchReqObj.from,
        body: queryObj
    })
        .then((response) => {
            const filteredRecipes = response.hits.hits.map(item => {
                return item._source;
            });
            return filteredRecipes;
        }).catch(ex => {
            console.error('An error occured searching for: ' + searchReqObj.query, ex);
            return ex;
        });
}