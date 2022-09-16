import HeaderBar from './header.js'
import Head from 'next/head'
import styles from './Layout.module.css' 

export default function Layout(props) {
  return <>
    <Head>
      <title>{props.title}</title>
    </Head>
    <HeaderBar />
    <div id={styles.content}>{props.children}</div>
    {/* footer? */}
  </>
}
