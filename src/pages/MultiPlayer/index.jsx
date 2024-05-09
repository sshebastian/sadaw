import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './index.module.css';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

function MultiPlayer() {
  const [remainingTime, setRemainingTime] = useState(15);
  const navigate = useNavigate();
  const auth = useAuthUser();
  console.log(auth);

  useEffect(() => {
    let timer;

    const updateTimer = () => {
      setRemainingTime((prevTime) => prevTime - 1);
    };

    timer = setInterval(updateTimer, 1000);

    return () => {
      clearInterval(timer);
      setRemainingTime(20);
    };
  }, []);

  useEffect(() => {
    if (remainingTime === 0) {
      setRemainingTime(20);
    }
  }, [remainingTime]);
  useEffect(() => {
    if (!auth) {
      navigate('/auth');
      console.log('User is not logged in.');
    } else {
      console.log('User is logged in.');
    }
  }, [auth]);
  if (!auth) return;

  return (
    <main>
      <Link to='/lobby'>
        <button className={styles.exitButtonM}>
          <img src='video/exist.gif' className={styles.exitGifM} alt='Exit' />
        </button>
      </Link>
      <div className={styles.containerT}>
        <button className={styles.clockButton}>
          <img src='video/clock.gif' className={styles.clockImg} alt='Clock' />
          <div id='timer' className={styles.timerT}>
            {remainingTime}
          </div>
        </button>
      </div>
      <div className={styles.containerTable}>
        <img src='images/table.png' className={styles.tableM} alt='Table' />
        <div className={styles.playerCard1}>Player1</div>
        <div className={styles.playerCard2}>Player2</div>
        <div className={styles.playerCard3}>Player3</div>
        <div className={styles.playerCard4}>Player4</div>
        <div className={styles.playerCard5}>Player5</div>

        <img scr='/images/avatar.png' className={styles.avatar} />
      </div>
    </main>
  );
}

export default MultiPlayer;
