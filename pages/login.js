import {getProviders,signIn} from 'next-auth/react'
import Image from 'next/image'
import Head from 'next/head'
function Login({providers}) {
    return (
        <>
        <Head>
        <title>Spotify V2</title>
        <link rel="icon" href="/favicon.png"/>
        </Head>
        <div className="flex flex-col items-center min-h-screen w-full justify-center">
            <div className="mb-5 relative">
            <Image width={256} height={256} src="https://www.iconsdb.com/icons/preview/black/spotify-xxl.png" alt="spotify logo" />
            </div>
             
            {Object.values(providers).map((provider)=>(
                <div key={provider.name}>
                    <button className="bg-black text-white p-5 rounded-full"
                    onClick={()=> signIn(provider.id,{callbackUrl : "/"})}>
                        Login with {provider.name}</button>
                </div>
            ))}
        </div>
        </>
    )
}

export default Login

export async function getServerSideProps(){
    const providers=await getProviders();
    return {
        props:{
            providers,
        }
    }
}