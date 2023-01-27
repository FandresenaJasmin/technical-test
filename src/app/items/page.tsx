/* eslint-disable @next/next/no-img-element */
'use client';

import { ItemList } from '@/components/ItemList';
import { store } from '@/redux/store/tech-store';
import { memo } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import './styles.css';

function ItemPage() {
    return (
        <div className='item-page'>
            <ReduxProvider store={store}>
                <ItemList />
            </ReduxProvider>
        </div>
    );
}

export default memo(ItemPage);