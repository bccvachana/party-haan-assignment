import { FC } from 'react';
import { usePage } from 'hooks';
import { FixedPageContainer } from 'components';
import styles from './PageLoading.module.scss';

const PageLoading: FC = () => {
  const { isPageLoading } = usePage();

  return (
    <FixedPageContainer
      bodyClassName={`${styles.body} ${isPageLoading ? styles.active : ''}`}
    >
      <div className={styles.loading}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </FixedPageContainer>
  );
};

export default PageLoading;
