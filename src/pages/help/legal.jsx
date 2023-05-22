const LegalPage = () => {
  return (
    <div>
      <h1 className="flex justify-center my-20 font-bold lg:text-2xl">
        Mentions légales
      </h1>
      <div className="mx-4 flex flex-col justify-center gap-5 lg:mx-20">
        <div>
          <p>
            Le présent site est édité par Airneis, SAS au capital de [montant du
            capital social], immatriculée au Registre du Commerce et des
            Sociétés d'Edimbourg sous le numéro SC1234567890, dont le siège
            social est situé à l'adresse suivante :{" "}
            <span className="font-bold">
              Airneis 10 Rue des Érables Edimbourg, Écosse
            </span>
          </p>
        </div>
        <div>
          <p>
            Adresse email :{" "}
            <a className="font-bold" href="mailto:airnes@contact.com">
              airnes@contact.com
            </a>
          </p>
          <p>
            Numéro de téléphone :{" "}
            <span className="font-bold">+44 131 123 4567</span>
          </p>
        </div>
        <div>
          <h2 className="font-bold mb-4">Directeur de publication</h2>
          <p>
            Le directeur de la publication du présent site est HuChaToWi SDV.
          </p>
        </div>
        <div>
          <h2 className="font-bold mb-4">Hébergement du site</h2>
          <p>
            Le site est hébergé par HuChaToWi, dont le siège social est situé à
            l'adresse suivante :{" "}
            <span className="font-bold mb-4">
              Airneis 10 Rue des Érables Edimbourg, Écosse
            </span>
          </p>
        </div>
        <div>
          <h2 className="font-bold mb-4">Propriété intellectuelle</h2>
          <p>
            Tous les éléments présents sur le site, qu'ils soient visuels ou
            sonores, sont la propriété exclusive d'Airneis. Toute reproduction,
            même partielle, est interdite sans l'autorisation préalable de la
            société.
          </p>
        </div>
        <div className="mb-20">
          <h2 className="font-bold mb-4">Données personnelles</h2>
          <p>
            Airneis s'engage à respecter la confidentialité des données
            personnelles collectées sur le site. Pour en savoir plus sur notre
            politique de confidentialité, veuillez consulter la page dédiée.
          </p>
        </div>
      </div>
    </div>
  )
}

LegalPage.isPublic = true

export default LegalPage
