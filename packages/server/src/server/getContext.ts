import { getAllDataLoaders } from '../modules/loader/loaderRegister';

const getContext = () => {
  const dataloaders = getAllDataLoaders();

  return { dataloaders } as const;
};

export { getContext };
