"use client"

import Home from './home'
import { StateProvider } from '@/context/StateContext';

export default function Main() {
  return (
    <StateProvider>
     <Home />
    </StateProvider>
  )
}
