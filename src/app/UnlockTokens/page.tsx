"use client"
import React from 'react';
import { MoralisProvider } from 'react-moralis';
import { NotificationProvider } from 'web3uikit';
import UnlockTokensContent from './content';
import Header from '@/components/Header';
const UnlockTokens = () => {
    return (
        <MoralisProvider initializeOnMount={true} serverUrl={'http://localhost:1337/server'} appId={"001"}>
            <NotificationProvider>
                <Header />
                <UnlockTokensContent />
            </NotificationProvider>
        </MoralisProvider>
    )
}


export default UnlockTokens;