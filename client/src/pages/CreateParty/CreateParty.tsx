import { FC } from 'react';
import { Input, PageContainer } from 'components';
import { useHeader } from 'hooks';
import styles from './CreateParty.module.scss';
import { useCreateParty } from './CreateParty.hook';

const CreateParty: FC = () => {
  useHeader({
    title: 'สร้างปาร์ตี้',
  });

  const {
    isDisableSubmit,
    formRef,
    onChange,
    handleCreateParty,
  } = useCreateParty();

  return (
    <PageContainer bodyClassName={styles.body}>
      <form
        className={styles.form}
        ref={formRef}
        onChange={onChange}
        onSubmit={handleCreateParty}
      >
        <Input
          label="ชื่อปาร์ตี้"
          name="name"
        />
        <Input
          label="จำนวนคนที่ขาด"
          type="number"
          name="numPeople"
          min={2}
        />
        <button
          className={`${styles.button} ${isDisableSubmit ? styles.disabled : ''}`}
          type="submit"
          formNoValidate
        >
          สร้างปาร์ตี้
        </button>
      </form>
    </PageContainer>
  );
};

export default CreateParty;
