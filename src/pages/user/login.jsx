import FooterMenu from "@/components/home/FooterMenu"
import LoginForm from "@/components/user/LoginForm"

const OnLoginForm = () => {
  return (
    <>
      <main>
        <LoginForm />
      </main>
      <FooterMenu position="absolute" />
    </>
  )
}

export default OnLoginForm
