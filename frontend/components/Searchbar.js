import {useState} from 'react'
import styles from './Searchbar.module.css'

export default function SearchBar(props){
    const [search,setSearch] = useState('')

    function localChange(e){
        setSearch(e.target.value)
        props.searchChange(e.target.value)
    }

    return(
        <>
        <input type='text' value={search} onChange={localChange} placeholder="Search blocks here..." className={styles.inputBox} />
        <style jsx>{`
            ::placeholder{
                font-size:1vw;
                font-family:'Be Vietnam Pro';
            }
          `}
        </style>
        </>
    )
}