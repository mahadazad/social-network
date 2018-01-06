import DataLoader from 'dataloader';
import Follow from '../models/Follow';
import uniq from 'lodash/uniq';

export default () => {
  return new DataLoader(async (ids) => {
    const map = {};
    const result = await Promise.all(uniq(ids).map((id, i) => {
      map[id] = i;
      return Follow.find({ followerId: id });
    }));

    const followingIds = result.map(set => set.map(data => data.followingId));

    return ids.map(id => followingIds[map[id]]);
  });
};
