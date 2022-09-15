import Layout from '../components/layout.js'
import styles from "./Projects.module.css"
import Card from "../components/card"
import React from 'react'
import { Language, CardInfo, allProjects } from '../components/projectData'

type sortTypes = "Date" | "Coolness"
// maps between sortType and the cardInfo attribute to sort by
// type makes typescript happy with indexing
const sortTypeMap: { [key: string]: keyof CardInfo } = {
  "Date":"date",
  "Coolness":"coolness"
}

interface ProjectFilterProps{
  sortTypeCallback: (val: sortTypes)=>void,
  filterCallback: (val: boolean)=>void,
  languageCallback: (val: Language[])=>void,
}
function ProjectFilters(props: ProjectFilterProps){
  return <span id={styles.filtersSpan}>
    <label>Sort by:{' '}
      <select onChange={(e)=>props.sortTypeCallback(e.target.value as sortTypes)}>
        <option value="Date">Recent</option>
        <option value="Coolness">Size</option>
      </select>
    </label>
    <label>
      Language
      {/* <select multiple>
        <option selected>Python</option>
        <option selected>Javascript</option>
        <option selected>C++</option>
        <option selected>C</option>
        <option selected>Other</option>
      </select> */}
    </label>
    <label title="Even the not so great ones">
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
  const [sortType, setSortType] = React.useState("Date")
  const [languageFilter, setLanguageFilter] = React.useState(["Python", "Javascript", "C/C++", "Other"] as Language[])
  const [coolnessFilter, setCoolnessFilter] = React.useState(false)

  const coolnessCutoff = coolnessFilter?0:5
  const sortAttr = sortTypeMap[sortType];
  const projects = allProjects.filter((c)=>languageFilter
    .includes(c.language))
    .filter((c)=>c.coolness>=coolnessCutoff)
    .sort((a,b)=>(b[sortAttr] as any)-(a[sortAttr] as any));
  // typescript is overrated anyway

  return <Layout>
    <ProjectFilters sortTypeCallback={setSortType} filterCallback={setCoolnessFilter} languageCallback={setLanguageFilter} />
    <CardList cards={projects}/>
  </Layout>
}