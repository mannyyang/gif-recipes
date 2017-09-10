import * as elasticsearch from 'elasticsearch-browser';
const ESClient = new elasticsearch.Client({
    host: process.env.NODE_ENV === 'production' ? 'http://quixcipes.com:9200' : 'http://localhost:9200',
    log: 'trace'
});

interface SearchReqObj {
    query: string;
    size: number;
    from: number;
    options?: any;
}

interface QueryObj {
    query?: {
        bool?: {
            must?: Array<any>
        }
    }
}

export function searchRecipes(searchReqObj: SearchReqObj): Promise<any> {
    let queryObj: QueryObj = {};

    queryObj.query = {};
    queryObj.query.bool = {};
    queryObj.query.bool.must = [];

    if (searchReqObj.options.title) { 
        queryObj.query.bool.must = queryObj.query.bool.must.concat(
            searchReqObj.query.split(',').map(item => {
                return { match: { title: item.trim() } }
            })
        );
    }

    if (searchReqObj.options.ingredients) { 
        queryObj.query.bool.must = queryObj.query.bool.must.concat(
            searchReqObj.query.split(',').map(item => {
                return { match: { recipe: item.trim() } }
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