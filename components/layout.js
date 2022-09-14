import HeaderBar from './header.js'
import styles from './Layout.module.css' 

export default function Layout({ children }) {
  return <>
    <HeaderBar />
    <div id={styles.content}>{children}</div>
    {/* footer? */}
  </>
}
