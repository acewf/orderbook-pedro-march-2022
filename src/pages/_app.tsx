import type { AppProps } from 'next/app'
import '../styles/globals.css'
import NoSSR from 'react-no-ssr';
import { FpsView } from "react-fps";


function MyApp({ Component, pageProps }: AppProps) {

  return (
    <NoSSR >
      <Component {...pageProps} />
      <FpsView />
    </NoSSR>
  )
}

export default MyApp
