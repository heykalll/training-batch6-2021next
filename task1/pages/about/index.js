import styles from '../../styles/about.module.css'
import Link from 'next/link'

function about() {
  return(
    
    <body>
      <h1>
        <Link href="/">Back To Home</Link>
      </h1>
      <div>
        <p className={styles.bio} >Nama  : Muhammad Haikal</p>
        <p className={styles.bio} >Asal  : Lampung</p>
        <p className={styles.bio} >Email : muhammad.haikal@sirclo.com</p>
    </div>
    </body>
    
  ) 
}

export default about