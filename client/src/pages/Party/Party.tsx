import { FC } from 'react';
import { CreatePartyButton, PageContainer } from 'components';
import { useHeader, useUser } from 'hooks';
import {
  get, getOr, isEmpty, map,
} from 'lodash/fp';
import GroupIcon from 'assets/images/group-icon.svg';
import ErrorImg from 'assets/images/modal-error.png';
import { useParty } from './Party.hook';
import styles from './Party.module.scss';

const Party: FC = () => {
  useHeader({
    title: 'ปาร์ตี้ทั้งหมด',
    noBackButton: true,
  });
  const {
    partyImgHeight,
    party,
    handleJoinParty,
  } = useParty();
  const user = useUser();

  return partyImgHeight ? (
    <PageContainer
      containerClassName={styles.container}
      bodyClassName={styles.body}
    >
      {!isEmpty(party) ? map(({
        id,
        name,
        participant,
        totalParticipant,
        imgUrl,
        isFull,
        createdBy,
      }) => {
        const isUserParticipated = getOr(false, `paticipatedParty.${id}`, user);
        const isMyParty = createdBy === get('id', user);
        return (
          <div
            className={styles.partyContainer}
            key={id}
          >
            <div className={styles.party}>
              <div
                className={styles.partyImg}
                style={{
                  height: `${partyImgHeight}px`,
                  backgroundImage: `url(${imgUrl})`,
                }}
              />
              <div className={styles.partyInfo}>
                <div className={styles.partyTitle}>
                  {name}
                </div>
                <div className={styles.partyDetail}>
                  <div className={styles.partyGroup}>
                    <img src={GroupIcon} alt="group-icon" />
                    {participant}
                    /
                    {totalParticipant}
                  </div>
                  {!isMyParty && (
                    <button
                      className={`${styles.partyButton} ${isUserParticipated || isFull ? styles.notActive : ''}`}
                      type="button"
                      onClick={() => handleJoinParty(id)}
                    >
                      {
                        isFull
                          ? 'เต็มแล้ว'
                          : isUserParticipated ? 'เข้าร่วมแล้ว' : 'เข้าร่วม'
                      }
                    </button>
                  )}
                  {(isMyParty && isFull) && (
                    <div className={styles.fullStatus}>
                      เต็มแล้ว
                    </div>
                  )}
                </div>
              </div>
              <div
                className={`${styles.partyBadge} ${isFull ? styles.notActive : ''} ${isMyParty ? styles.myParty : ''}`}
              >
                {
                  isMyParty
                    ? 'ปาร์ตี้ของฉัน'
                    : isFull ? 'เต็ม' : 'ว่าง'
                }
              </div>
            </div>
          </div>
        );
      }, party) : (
        <div className={styles.noParty}>
          <img src={ErrorImg} alt="error-img" />
          ไม่พบปาร์ตี้
        </div>
      )}
      <CreatePartyButton />
    </PageContainer>
  ) : <></>;
};

export default Party;
