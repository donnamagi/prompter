import '../globals.css'
import Home from './index'
import { StateProvider } from '@/context/StateContext';

 
export default function MyApp() {
  return (
    <StateProvider>
     <Home />
    </StateProvider>
  )
}
