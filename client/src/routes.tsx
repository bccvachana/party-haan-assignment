import {
  Login,
  Register,
  Party,
  CreateParty,
} from 'pages';

export const publicRoutes = [
  {
    path: '/login',
    PageComponent: Login,
  },
  {
    path: '/register',
    PageComponent: Register,
  },
];

export const privateRoutes = [
  {
    path: '/party',
    PageComponent: Party,
  },
  {
    path: '/party/create',
    PageComponent: CreateParty,
  },
];
