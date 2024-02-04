"use client" 

import TemplateSearch from './templateSearch';
import { StateProvider } from '@/context/StateContext';

export default function Main() {
  return (
    <StateProvider>
      <TemplateSearch />
    </StateProvider>
  )
}
