import { useRouter } from 'next/navigation';

export const logOut = () => {
    // const { push } = useRouter();
console.log("resp chalaaalalalllala");

    localStorage.removeItem("authToken")
    // push("/")
    // location.reload()
    
}