import '../globals.css'
import Home from './index'
import { StateProvider } from '@/lib/context/StateContext';

 
export default function MyApp() {
  return (
    <StateProvider>
     <Home />
    </StateProvider>
  )
}
