import { FC } from 'react';
import { CreatePartyButton, PageContainer } from 'components';
import { useHeader } from 'hooks';
import { map } from 'lodash/fp';
import GroupIcon from 'assets/images/group-icon.svg';
import { useParty } from './Party.hook';
import styles from './Party.module.scss';

const Party: FC = () => {
  useHeader({
    title: 'ปาร์ตี้ทั้งหมด',
    noBackButton: true,
  });
  const { partyImgHeight } = useParty();

  return partyImgHeight ? (
    <PageContainer
      containerClassName={styles.container}
      bodyClassName={styles.body}
    >
      {map(() => (
        <div className={styles.partyContainer}>
          <div className={styles.party}>
            <div
              className={styles.partyImg}
              style={{ height: `${partyImgHeight}px` }}
            />
            <div className={styles.partyInfo}>
              <div className={styles.partyTitle}>
                คอร์สเรียนออนไลน์เขียนโปรแกรม Python Javascript Typescript
              </div>
              <div className={styles.partyDetail}>
                <div className={styles.partyGroup}>
                  <img src={GroupIcon} alt="group-icon" />
                  0/5
                </div>
                <button
                  className={styles.partyButton}
                  type="button"
                >
                  Join
                </button>
              </div>
            </div>
            <div className={styles.partyBadge}>ว่าง</div>
          </div>
        </div>
      ), [...Array(6)])}
      <CreatePartyButton />
    </PageContainer>
  ) : <></>;
};

export default Party;
