import FooterMenu from "@/components/home/FooterMenu"
import MyAccount from "@/components/user/MyAccount"

const OnMyAccount = () => {
    return(
        <>
            <MyAccount />
            <FooterMenu position="absolute" />
        </>
    )
}

export default OnMyAccount