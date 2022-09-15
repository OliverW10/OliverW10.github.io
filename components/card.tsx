import React from 'react'
import styles from './Card.module.css'
import {CardInfo} from './projectData'
import Image from 'next/image'

interface CardIconProps{
  src: string,
  link?: string,
  title: string,
}

function CardIcon(props: CardIconProps){
 return <>
  {typeof props.link !== 'undefined' && 
    <a className={styles.iconLink} href={props.link} title={props.title}><Image className={styles.icon} src={props.src} width={22} height={22}/></a>
  }</> 
}


export interface CardProps{
  cardInfo: CardInfo
}

export default function Card(props: CardProps){
  return <div className={styles.card}>
    <div>
      <p className={styles.language}>{props.cardInfo.language}</p>
      <h3 className={styles.title}>{props.cardInfo.title}</h3>
      <p>{props.cardInfo.info}</p>
      <span>
        <p>{props.cardInfo.more_info}</p>
        <CardIcon src="/images/github.png" link={props.cardInfo.repo} title="Repository" />
        <CardIcon src="/images/website.png" link={props.cardInfo.live} title="Live website" />
        <CardIcon src="/images/download.png" link={props.cardInfo.download} title="Download" />
        <CardIcon src="/images/youtube.png" link={props.cardInfo.video} title="Youtube video" />
      </span>
    </div>
    <span>
      <p className={styles.date}>{props.cardInfo.date.getMonth()}/{props.cardInfo.date.getFullYear()}</p>
      {typeof props.cardInfo.img !== 'undefined' && 
        <Image src={props.cardInfo.img}
        height={64}
        width={64}/>
      }
    </span>
  </div>
}