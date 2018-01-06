import userLoader from './user.dataloader';
import totalFollowersLoader from './total-followers.dataloader';
import followersLoader from './followers.dataloader';
import totalFollowingsLoader from './total-followings.dataloader';
import followingsLoader from './followings.dataloader';

export default (app) => {
  return {
    userLoader: userLoader(),
    totalFollowersLoader: totalFollowersLoader(),
    followersLoader: followersLoader(),
    totalFollowingsLoader: totalFollowingsLoader(),
    followingsLoader: followingsLoader(),
  };
};
