import { AuthenticationProvider } from '../context/AuthenticationContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <AuthenticationProvider>
  <Component {...pageProps} />
  </AuthenticationProvider>
  )
}


export default MyApp
