/* eslint-disable @next/next/no-img-element */
'use client';

import { memo } from 'react';
import './styles.css';

/**
 * This component represents a preview of an item, the target output is an HTML markup that looks like /images/card.png
 * See `/cards` page for the output
 *
 * @todo:
 * - setup the HTML markup by replacing <img /> below by yours
 * - put and set all necessary css as you want in ./styles.css the main entry class is `preview-card`
 *
 * you can find all assets to use in /public/images and /public/icons
 */

function CardPreview() {

  const InfoItem = ({label,value})=> {
    return <div className='info-item-container' >
      <p className='info-item-label'>{label}</p>
      <p className='info-item-value'>{value}</p>
    </div>
  }

  const FeatureItem = ({label,value})=> {
    return <div className='feature-item-container' >
      <div className='feature-fake-check-box'>
      </div>
      <div className='feature-info-container'>
        <p className='feature-item-label'>{label}</p>
        <p className='feature-item-value'>{value}</p>
      </div>
    </div>
  }

  const infoItems = [
    {
      label:"Platform",
      value : "PS5"
    },
    {
      label:"Release",
      value : "Fall 2020"
    },
    {
      label:"Price",
      value : "$50"
    }
  ]

  const featureItems = [
    {
      label:"Futuristic",
      value : "Design"
    },
    {
      label:"Built-in",
      value : "Microphone"
    }
  ]

  return (
    <>
    <div className="preview-card">
      <div className='card-header'>
        <img className='back-arrow' alt="fake card" src="/images/right_arrow.png" />  
        <div className='cart-btn'>
          <img className='cart-icon' alt="fake card" src="/images/shopping_cart.png" />  
        </div>
      </div>
      <div className='info-item-list-container'>
        {infoItems.map((item,index)=>(<InfoItem key={index} label={item.label.toUpperCase()} value={item.value}/>))}
      </div>
      <img className='card-image' alt="fake card" src="/images/ps5.png" />
      <div className='description-container'>
        <p className='description-title'>
          Dual Sense
        </p>
        <p className='description-content'>
          DualSense also adds a build-in microphone array, which will enable players to easily chat with friends without a headset...
        </p>
        <div className='description-feature-item-list-container'>
            {featureItems.map((item,index)=>(<FeatureItem {...item} key={index} />))}
        </div>
        <div className='description-buy-btn-container'>
          <p className='description-price'>0.78TH</p>
          <div className='description-buy-btn'>
            <button className='buy-btn'>Buy</button> 
            <div className='divider-vertical'></div>
            <img className='buy-arrow-icon'  src="/images/right_arrow.png" />  
          </div>
        </div>
      </div>
    </div>
    </>
    
  );
}


export default memo(CardPreview);
