import styles from './tailwindapp.module.scss';

/* eslint-disable-next-line */
export interface TailwindappProps {}

export function Tailwindapp(props: TailwindappProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Tailwindapp!</h1>
    </div>
  );
}

export default Tailwindapp;
