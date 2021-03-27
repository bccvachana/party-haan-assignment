import { usePage } from 'hooks';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { FixedPageContainer } from 'components';
import ArrowBackIcon from 'assets/images/arrow-back-icon.svg';
import LogoutIcon from 'assets/images/logout-icon.svg';
import userService from 'services/user.service';
import styles from './Header.module.scss';

const Header: FC = () => {
  const {
    header: {
      title,
      noBackButton,
      noLogoutButton,
      noHeader,
    },
  } = usePage();
  const { goBack } = useHistory();

  return !noHeader ? (
    <>
      <FixedPageContainer
        bodyClassName={styles.body}
      >
        <div className={styles.header}>
          <div className={styles.backButtonAndTitle}>
            {!noBackButton && (
              <button
                className={styles.backButton}
                type="button"
                onClick={goBack}
              >
                <img src={ArrowBackIcon} alt="arrow-back-icon" />
              </button>
            )}
            {title}
          </div>
          {!noLogoutButton && (
            <button
              className={styles.logoutButton}
              type="button"
              onClick={userService.logout}
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
