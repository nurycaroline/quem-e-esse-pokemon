import styles from './home.module.scss'

export default function Home () {
  return (
    <div className={styles.homepage}>
      <h2>Quem é esse</h2>
      <h1>Pokémon</h1>
      <h1>?</h1>

      <button>Começar</button>
      <p>desenvolvido por <a href="https://github.com/nurycaroline">@NuryCaroline</a></p>
    </div>
  )
}
