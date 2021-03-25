import { FC } from 'react';
import { PageContainer } from 'components';
import { useHeader } from 'hooks';
import styles from './CreateParty.module.scss';

const CreateParty: FC = () => {
  useHeader({
    title: 'สร้างปาร์ตี้',
  });

  return (
    <PageContainer bodyClassName={styles.body}>
      CreateParty
    </PageContainer>
  );
};

export default CreateParty;
