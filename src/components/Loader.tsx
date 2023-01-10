import { FC } from 'react';
import { FadeLoader } from 'react-spinners';
import styles from '../styles/Loader.module.css';

export const Loader: FC = () => {
  return (
    <div className={styles.wrapper}>
      <FadeLoader color='#DEE2E6' height={20} />
    </div>
  );
};
