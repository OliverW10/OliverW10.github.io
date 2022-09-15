import styles from './HeaderBar.module.css'
import Link from 'next/link'

export default function HeaderBar(){
  return <header id={styles.headerbar}>
    <Link href="/"><a className={styles.link}>Home</a></Link>
    <Link href="/projects"><a className={styles.link}>Projects</a></Link>        
    {/* <Link href="/contact"><a className={styles.link}>Contact</a></Link>         */}
  </header>
}