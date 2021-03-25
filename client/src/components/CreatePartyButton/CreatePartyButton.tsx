import { FC } from 'react';
import { Link } from 'react-router-dom';
import { FixedPageContainer } from 'components';
import styles from './CreatePartyButton.module.scss';

const CreatePartyButton: FC = () => (
  <FixedPageContainer>
    <Link
      to="/party/create"
      className={styles.createPartyButton}
    >
      <div className={styles.plus}>
        +
      </div>
    </Link>
  </FixedPageContainer>
);

export default CreatePartyButton;
