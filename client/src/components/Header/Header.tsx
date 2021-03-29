import { usePage } from 'hooks';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { FixedPageContainer } from 'components';
import ArrowBackIcon from 'assets/images/arrow-back-icon.svg';
import LogoutIcon from 'assets/images/logout-icon.svg';
import userService from 'services/user.service';
import { get } from 'lodash/fp';
import { openModal } from 'components/Modal';
import styles from './Header.module.scss';

const Header: FC = () => {
  const { header } = usePage();
  const { goBack } = useHistory();

  return (header && !get('noHeader', header)) ? (
    <>
      <FixedPageContainer
        bodyClassName={styles.body}
      >
        <div className={styles.header}>
          <div className={styles.backButtonAndTitle}>
            {!get('noBackButton', header) && (
              <button
                className={styles.backButton}
                type="button"
                onClick={goBack}
              >
                <img src={ArrowBackIcon} alt="arrow-back-icon" />
              </button>
            )}
            {get('title', header)}
          </div>
          {!get('noLogoutButton', header) && (
            <button
              className={styles.logoutButton}
              type="button"
              onClick={() => {
                openModal({
                  type: 'info',
                  text: 'คุณต้องการออกจากระบบใช่หรือไม่',
                  okText: 'ยืนยัน',
                  onOk: async () => {
                    await userService.logout();
                  },
                });
              }}
            >
              <img src={LogoutIcon} alt="logout-icon" />
            </button>
          )}
        </div>
      </FixedPageContainer>
      <div className={styles.placeHolder} />
    </>
  ) : <></>;
};

export default Header;
