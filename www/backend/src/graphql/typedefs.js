import path from 'path';
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';

const types = fileLoader(path.join(__dirname, './typedefs'), { extensions: ['.graphql'] });

export default mergeTypes(types);
