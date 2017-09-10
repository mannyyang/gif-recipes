export const Opts = {
    baseServiceUrl: process.env.NODE_ENV === 'production' ? 'http://quixcipes.com:9200/raw/recipe' : 'http://localhost:9200/raw/recipe',
    processedServiceUrl: process.env.NODE_ENV === 'production' ? 'http://quixcipes.com:9200/processed/recipe' : 'http://localhost:9200/processed/recipe',
    query: {
        size: 12
    }
};