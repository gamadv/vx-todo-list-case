import styles from './styles.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.headerContainer}>
      <section>
        <div>
          <h1>VX CASE</h1>
        </div>
        <div>
          <h2>My ToDo List !</h2>
        </div>
        <div>
          <h3>:D</h3>
        </div>
      </section>
    </header>
  );
};

export default Header;
