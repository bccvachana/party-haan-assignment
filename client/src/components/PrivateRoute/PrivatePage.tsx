import { FC, ReactNode } from 'react';

interface IPrivatePageProps {
  children: ReactNode;
}

const PrivatePage: FC<IPrivatePageProps> = ({
  children,
}) => {
  console.log('PrivatePage');

  return true && (
    <>
      {children}
    </>
  );
};

export default PrivatePage;
