'use client';

import cx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { Montserrat as Font } from '@next/font/google';
import { Courier_Prime as Mono } from '@next/font/google';
import Provider from '../components/Provider';
import { ThemeToggle } from '../components/ThemeToggle';
import { ThemeContext } from '../components/contexts/ThemeContext';
import { ConnectButton } from '../components/Connect';
import useIntercom from '../components/hooks/useIntercom';
import '../styles/globals.css';
import styles from '../styles/page.module.css';
import '../styles/all.css';
import './welcome.css';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import { useEffect, useState } from 'react';

const font = Font({ subsets: ['latin'], variable: '--main-font' });
const mono = Mono({ subsets: ['latin'], variable: '--font-mono', weight: ['700'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useIntercom('i5qk9adq');

  const [showBtn,setShowBtn] = useState(false)

  useEffect(() => {
    const handleScrollBtnVisibility = () => {
      window.pageYOffset > 200 ? setShowBtn(true) : setShowBtn(false)
    }
    window.addEventListener('scroll',handleScrollBtnVisibility,true)
    return () => {
      window.removeEventListener('scroll',handleScrollBtnVisibility,true)
    }
  },[])

  return (
    <Provider>
      <ThemeContext.Consumer>
        {({ theme }) => (
          <html lang="en" color-scheme={theme} className={theme}>
            <head />
            <body className={cx([font.className])}>
              <div className={styles.bg} />
              <header className={styles.header}>
                <div className="h-inner">
                  <div className={styles.entrypoint}>
                    <Link href="/">
                      <Image className={styles.logo} src="https://wau.io/static/96_96_w.png" alt="WAU Logo" width={80} height={80} />
                      <span>
                        Technical <span>Test</span>
                      </span>
                    </Link>
                  </div>
                  <div className={styles.actions}>
                    <nav>
                      <ul>
                        <li>
                          <Link href="/#instructions" scroll={false}>
                            Instructions
                          </Link>
                        </li>
                        <li>
                          <Link href="/#challenges" scroll>
                            Challenges
                          </Link>
                        </li>
                      </ul>
                    </nav>
                    <ThemeToggle />
                    <ConnectButton />
                  </div>
                </div>
              </header>
              <section className={styles.content}>{children}</section>
              <footer className={cx(styles.footer)}>
               {showBtn &&  <ScrollToTopButton />}
                <div className="f-inner">
                  <p>
                    2023 <Link href="/">WAU I/O</Link> &copy; All rights reserved.
                  </p>
                </div>
              </footer>
            </body>
          </html>
        )}
      </ThemeContext.Consumer>
    </Provider>
  );
}
