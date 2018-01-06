import path from 'path';
import { fileLoader, mergeResolvers } from 'merge-graphql-schemas';

const resolvers = fileLoader(path.join(__dirname, './resolvers'), { extensions: ['.js'] });

export default mergeResolvers(resolvers);
