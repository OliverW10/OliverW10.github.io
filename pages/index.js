import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import styles from "./Home.module.css"
import Canvas from '../components/canvas'

export default function Home() {

  return (
    <Layout>
      <p contentEditable="true" id={styles.text} onChange={e=>console.log(e)}>idk whats meant to go on a home page<br />
      you can draw what you think should go here<br />
      </p>
      <Canvas />
      <div hidden>
        Some things I know a bit about
        <ul>
          <li>Frontend web development: Javascript/Typescript, React</li>
          <li>Robotcs: Python, C++</li>
          <li>Game development: Javascript, Python, C#</li>
          <li>Backend web development: Javascript, PostgreSQL</li>
        </ul>
      </div>
    </Layout>
  )
}
