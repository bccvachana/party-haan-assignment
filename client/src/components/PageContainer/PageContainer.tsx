import { FC, ReactNode } from 'react';
import styles from './PageContainer.module.scss';

interface IPageContainerProps {
  children: ReactNode;
  containerClassName?: string;
  bodyClassName?: string;
}

const PageContainer: FC<IPageContainerProps> = ({
  children,
  containerClassName,
  bodyClassName,
}) => (
  <div
    className={`${styles.container} ${containerClassName || ''}`}
  >
    <div className={`${styles.body} ${bodyClassName || ''}`}>
      {children}
    </div>
  </div>
);

export default PageContainer;
