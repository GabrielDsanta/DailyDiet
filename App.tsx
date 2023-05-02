import { useFonts, NunitoSans_400Regular, NunitoSans_700Bold } from '@expo-google-fonts/nunito-sans';
import { NativeBaseProvider } from 'native-base'
import { StatusBar } from 'react-native';

import { Routes } from './src/routes';
import { Loading } from '@components/Loading';
import { DailyDietContextProvider } from '@contexts/DailyDietContext';


export default function App() {
  const [fontsLoadead] = useFonts({ NunitoSans_400Regular, NunitoSans_700Bold })

  return (
    <NativeBaseProvider>
      <StatusBar
        barStyle='dark-content'
        backgroundColor='transparent'
        translucent
      />
      <DailyDietContextProvider>
        {fontsLoadead ? <Routes /> : <Loading />}
      </DailyDietContextProvider>
    </NativeBaseProvider>
  );
}
