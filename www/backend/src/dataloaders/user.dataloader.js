import DataLoader from 'dataloader';
import User from '../models/User';

export default () => {
  return new DataLoader(async (ids) => {
    const users = await User.find({ _id: ids });
    const usersMap = users.reduce((map, user) => {
      map[user._id] = user;
      return map;
    }, {});

    return ids.map(id => usersMap[id]);
  });
};
