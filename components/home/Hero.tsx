import Link from 'next/link'
import styles from './hero.module.css'

export function Hero() {
  const heroMap = {
    headlineOne: 'aower Ai Document',
    headlineTwo: '通过工作流创建Ai 文档和文档知识库',
    headlineThree: 'Generate By ChatGPT',
    subtitleOne:
      'Ai Document Generate By ChatGPT, ChatGPT can also make mistakes. Please verify important information.',
    // subtitleTwo: '',
    // subtitleThree: '',
    // subtitleFour: '',
    cta: 'Leetcode',
  }

  return (
    <div className={styles.root}>
      <div className="overlay">
        <div className={styles.grid}>
          <div className={styles.gridfade}></div>
          <div className={styles.gridlines}></div>
        </div>
      </div>
      <div className={styles.content}>
        <h1 className={styles.headline}>
          <p className={styles.head}>
            <span></span>
            <span>
              <span className={styles.headlineOne}>{heroMap.headlineOne}</span>
              <br className="max-md:_hidden" />
              <span className={styles.headlineTwo}>{heroMap.headlineTwo}</span>
              <span className={styles.headlineThree}>{heroMap.headlineThree}</span>
              <br className="max-md:_hidden" />
              <span className={styles.pops}>
                <span className={styles.pop}></span>
                <span className={styles.pop}></span>
                <span className={styles.pop}></span>
                <span className={styles.pop}></span>
                <span className={styles.pop}></span>
              </span>
            </span>
            <span></span>
          </p>
        </h1>
        <p className={styles.subtitle}>
          {heroMap.subtitleOne}
          <br className="max-md:_hidden" />
          {/* {heroMap.subtitleTwo}
          <br className="max-md:_hidden" />
          {heroMap.subtitleThree}
          {heroMap.subtitleFour} */}
        </p>
        <br className="max-md:_hidden" />
        <div className={styles.actions}>
          <Link className={styles.cta} href="https://leetcode.aowerleee.online/leetcode/folder_1/leetcode_two_sum">
            {heroMap.cta} <span>↗</span>
          </Link>
          <a
            className={styles.secondaryAction}
            href="https://interview.aowerleee.online/interview/netty/6be002775d0ee75f554d6605f3977fd6ee9979698fcadb6882a6daa4655bb83a"
            target="_blank"
            rel="noopener noreferrer"
          >
            Interview <span>↗</span>
          </a>
        </div>
      </div>
    </div>
  )
}
