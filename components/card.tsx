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
    <a className={styles.iconLink} href={props.link} title={props.title}>
      <Image
        className={styles.icon}
        src={props.src} 
        width={30}
        height={30}
      />
    </a>
  }</> 
}


export interface CardProps{
  cardInfo: CardInfo
}

export default function Card(props: CardProps){
  const [active, setActive] = React.useState(false);
  let maxMaxHeight = 150;
  if(typeof props.cardInfo.imgs !== "undefined"){
    maxMaxHeight += props.cardInfo.imgs.height;
  }
  return <div className={styles.card} onClick={()=>setActive(!active)}>
    <div>
      <p className={styles.language}>{props.cardInfo.language}</p>
      <h3 className={styles.title}>{props.cardInfo.title}</h3>
      <p className={styles.info}>{props.cardInfo.info}</p>
      <span className={styles.moreInfoSpan} style={{maxHeight:(active?maxMaxHeight:0)+"px"}}>
        <p className={styles.moreInfo}>{props.cardInfo.more_info}</p>
        <>{typeof props.cardInfo.imgs !== "undefined" &&
            <Image
              src={props.cardInfo.imgs.src}
              width={props.cardInfo.imgs.width}
              height={props.cardInfo.imgs.height}
              objectFit="contain" // maintains aspect ratio
            />
        }</>
      </span><br />
      <CardIcon src="/images/github.png" link={props.cardInfo.repo} title="Repository" />
      <CardIcon src="/images/website.png" link={props.cardInfo.live} title="Live website" />
      <CardIcon src="/images/download.png" link={props.cardInfo.download} title="Download" />
      <CardIcon src="/images/youtube.png" link={props.cardInfo.video} title="Youtube video" />
    </div>
    <span>
      <p className={styles.date}>{props.cardInfo.date.getMonth()+1}/{props.cardInfo.date.getFullYear()}</p>
    </span>
  </div>
}