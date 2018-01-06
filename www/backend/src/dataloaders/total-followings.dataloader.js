import DataLoader from 'dataloader';
import Follow from '../models/Follow';
import uniq from 'lodash/uniq';

export default () => {
  return new DataLoader(async (ids) => {
    const map = {};
    const result = await Promise.all(uniq(ids).map((id, i) => {
      map[id] = i;
      return Follow.aggregate([{ $match: { followerId: id } }, { $group: { _id: null, count: { $sum: 1 } } }]);
    }));

    return ids.map(id => result[map[id]][0].count);
  });
};
