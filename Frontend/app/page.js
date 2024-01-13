import styles from './page.module.css'

export default function Home() {
  return (
      <main className={styles.main}>
        <div className={styles.description}>
          <h1>Welcome to the GenAI Bootcamp, hello!</h1>
        </div>
        <p>This is an example homepage, you can edit this with your content.</p>
        <p>There is also a <a href="chat/">chatbot example</a> which can be used to build your personaized chatbot</p>
      </main>
  )
}