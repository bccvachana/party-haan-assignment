import { FC } from 'react';
import { Input, PageContainer } from 'components';
import { useHeader } from 'hooks';
import styles from './CreateParty.module.scss';

const CreateParty: FC = () => {
  useHeader({
    title: 'สร้างปาร์ตี้',
  });

  return (
    <PageContainer bodyClassName={styles.body}>
      <Input
        label="ชื่อปาร์ตี้"
      />
      <Input
        label="จำนวนคนที่ขาด"
        type="number"
      />
      <button
        className={styles.button}
        type="button"
      >
        สร้างปาร์ตี้
      </button>
    </PageContainer>
  );
};

export default CreateParty;
