import Layout from '../components/layout.js'
import styles from "./Projects.module.css"
import Card from "../components/card"
import React from 'react'
import { Language, CardInfo, allProjects, allLanguages } from '../components/projectData'
import { removeItem } from '../util'

interface LanguageCheckboxProps{
  languages: Language[],
  name: Language,
  callback: (val: Language[])=>void,
}

function LanguageCheckbox(props: LanguageCheckboxProps){
  const clickCallback = (e:any)=>{
    if(e.target.checked){
      console.log(props.languages.concat(props.name))
      // needs to call slice to make a copy and trigger re-render
      const arrCopy = props.languages.slice().concat(props.name)
      props.callback(arrCopy)
    }else{
      console.log(removeItem(props.languages, props.name))
      props.callback(removeItem(props.languages, props.name).slice())
    }
  }
  return <label>
    {props.name}
    <input type="checkbox" checked={props.languages.includes(props.name)} onChange={clickCallback}></input>
  </label>
}

type sortTypes = "Date" | "Coolness"
// maps between sortType and the carInfo attribute to sort by
// type makes typescript happy with indexing
const sortTypeMap: { [key: string]: keyof CardInfo } = {
  "Date":"date",
  "Coolness":"coolness"
}

interface ProjectFilterProps{
  sortType: sortTypes,
  sortTypeCallback: (val: sortTypes)=>void,
  showAll: boolean,
  filterCallback: (val: boolean)=>void,
  languages: Language[],
  languageCallback: (val: Language[])=>void,
}
function ProjectFilters(props: ProjectFilterProps){
  return <span id={styles.filtersSpan}>
    <label>Sort by:{' '}
      <select onChange={(e)=>props.sortTypeCallback(e.target.value as sortTypes)} id={styles.sortSelect}>
        <option value="Date">Recent</option>
        <option value="Coolness">Size</option>
      </select>
    </label>
    <details id={styles.languageTitle} className="noselect">
      <summary>
       Language ⌄
      </summary>
      <div id={styles.languageSelection}>
        {allLanguages.map((l)=>{
          return <LanguageCheckbox key={l} name={l} languages={props.languages} callback={props.languageCallback} />
        })}
      </div>
    </details>
    <label>
      Show all:
      <input type="checkbox" onChange={(e)=>props.filterCallback(e.target.checked)}></input>
    </label>
  </span>
}


interface CardListProps{
  cards: CardInfo[],
}
function CardList(props: CardListProps){
  return <div id={styles.cardContainer}>
    {props.cards.map((card)=><Card key={card.title} cardInfo={card} />)}
  </div>
}

export default function Projects(){
  const [sortType, setSortType] = React.useState("Date" as sortTypes)
  const [languageFilter, setLanguageFilter] = React.useState(["Other"] as Language[])
  // const [languageFilter, setLanguageFilter] = React.useState(["Python", "Javascript", "C/C++", "Other"] as Language[])
  const [coolnessFilter, setCoolnessFilter] = React.useState(false)

  const coolnessCutoff = coolnessFilter?0:5
  const sortAttr = sortTypeMap[sortType];
  const projects = allProjects.filter((c)=>languageFilter
    .includes(c.language))
    .filter((c)=>c.coolness>=coolnessCutoff)
    .sort((a,b)=>(b[sortAttr] as any)-(a[sortAttr] as any));
  // typescript is overrated anyway

  return <Layout title="/Projects">
    <div id={styles.outerContainer}>
      <div id={styles.projectContainer}>
        <ProjectFilters
          sortTypeCallback={setSortType}
          sortType={sortType}
          filterCallback={setCoolnessFilter}
          showAll={coolnessFilter}
          languageCallback={(x)=>{console.log(x);setLanguageFilter(x)}}
          languages={languageFilter}
        />
        <CardList cards={projects}/>
      </div>
    </div>
  </Layout>
}