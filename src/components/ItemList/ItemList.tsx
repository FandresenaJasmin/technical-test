/* eslint-disable @next/next/no-img-element */
'use client';

import { ActionType } from '@/redux/action/tech-action';
import { techReducer, TechState } from '@/redux/reducer/tech-reducer';
import { store } from '@/redux/store/tech-store';
import { memo, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles.css';

/**
 * Here we are 10 tech stacks list.
 * What we expect is to move the items list and add one item (javascript) to the list using redux
 * 
 * @todo:
 * - Add and install redux to the project eg: yarn install redux.
 * - Implement the store, reducer, action.
 * - On click on the button, dispatch an action to add Javascript to the tech list
 *
 */

const ItemList = () => {

    const techs = useSelector((state:TechState)=>{
        return state.techs.items
    })
   
   

    const addJsToTheList = () => {
       store.dispatch({type :ActionType.ADD_ITEM,payload:{name:"Javascript",position:4}})
    }

    return (
        <div>
            <ul>
                {
                    techs?.map((tech:any) => <li key={`${tech.toLowerCase()}`} className="item">{tech}</li>)
                }
            </ul>
            <button className='btn btn-add' onClick={addJsToTheList}>Add Javascript after NodeJs</button>
        </div>
    );
}

export default memo(ItemList);