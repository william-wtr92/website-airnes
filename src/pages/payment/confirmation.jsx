import Button from "@/components/utils/Button"

const Confirmation = () => {
    return <>
        <div className="flex justify-center items-center py-32">
            <div className="space-y-8 w-3/5 lg:w-1/4 lg:space-y-10">
                <h1 className="font-bold text-xl">Commande effectuée !</h1>
                <h2 className="font-bold text-lg">Merci pour votre achat.</h2>
                <p className="font-semibold">
                    Votre commande a bien été enregistrée sous le numéro <a href=""><span
                    className="text-blue-500 underline">XXXXXX</span></a>. Vous pouvez suivre son état depuis votre
                    espace client.
                </p>
                <Button>Continuer mes achats</Button>
            </div>
        </div>
    </>
}

export default Confirmation