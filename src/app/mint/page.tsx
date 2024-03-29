"use client"
import React, { useState } from 'react';
import Header from '@/components/Header'
import MintToken from "./content"
import { MoralisProvider } from 'react-moralis';
import { NotificationProvider } from 'web3uikit';
const Mint = () => {


    return (
        <MoralisProvider initializeOnMount={true} serverUrl={'http://localhost:1337/server'} appId={"001"}>
            <NotificationProvider>
                <Header />
                <MintToken />
            </NotificationProvider>
        </MoralisProvider>
    )
}


export default Mint;