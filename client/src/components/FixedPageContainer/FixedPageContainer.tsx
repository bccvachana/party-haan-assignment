import { FC, ReactNode } from 'react';
import PageContainer from 'components/PageContainer/PageContainer';
import styles from './FixedPageContainer.module.scss';

interface IFixedPageContainerProps {
  children: ReactNode;
  containerClassName?: string;
  bodyClassName?: string;
}

const FixedPageContainer: FC<IFixedPageContainerProps> = ({
  children,
  containerClassName,
  bodyClassName,
}) => (
  <PageContainer
    containerClassName={`${styles.container} ${containerClassName || ''}`}
    bodyClassName={`${styles.body} ${bodyClassName || ''}`}
  >
    {children}
  </PageContainer>
);

export default FixedPageContainer;
