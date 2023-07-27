"use client"
import React, { useState } from 'react';


import { MoralisProvider } from 'react-moralis';
import { NotificationProvider } from 'web3uikit';
import ConvertBasicTokenToGNFT from './content';
import Header from '@/components/Header';
const Convert = () => {
    return (
        <MoralisProvider initializeOnMount={true} serverUrl={'http://localhost:1337/server'} appId={"001"}>
            <NotificationProvider>
                <Header />
                <ConvertBasicTokenToGNFT />
            </NotificationProvider>
        </MoralisProvider>
    )
}


export default Convert;