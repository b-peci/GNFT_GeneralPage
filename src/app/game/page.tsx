"use client"
import React, { useState } from 'react';


import { MoralisProvider } from 'react-moralis';
import { NotificationProvider } from 'web3uikit';
import CreateGame from './content';
import Header from '@/components/Header';
const Game = () => {
    return (
        <MoralisProvider initializeOnMount={true} serverUrl={'http://localhost:1337/server'} appId={"001"}>
            <NotificationProvider>
                <Header />
                <CreateGame />
            </NotificationProvider>
        </MoralisProvider>
    )
}


export default Game;