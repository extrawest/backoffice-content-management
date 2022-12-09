import styles from './antapp.module.scss';

/* eslint-disable-next-line */
export interface AntappProps {}

export function Antapp(props: AntappProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Antapp!</h1>
    </div>
  );
}

export default Antapp;
