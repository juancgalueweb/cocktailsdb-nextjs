import { FC } from 'react';
import { HashLoader } from 'react-spinners';
import styles from '../styles/Loader.module.css';

export const Loader: FC = () => {
  return (
    <div className={styles.wrapper}>
      <HashLoader color='#eeeeee' size={80} />
    </div>
  );
};
