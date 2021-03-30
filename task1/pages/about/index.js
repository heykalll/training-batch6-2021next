import styles from '../../styles/about.module.css'

function about() {
  return(
    <body>
      <div>
        <p className={styles.bio} >Nama  : Muhammad Haikal</p>
        <p className={styles.bio} >Asal  : Lampung</p>
        <p className={styles.bio} >Email : muhammad.haikal@sirclo.com</p>
    </div>
    </body>
    
  ) 
}

export default about