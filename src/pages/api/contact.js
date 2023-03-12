import ContactModel from "@/api/db/models/ContactModel"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"

import {
    mailValidator,
    topicValidator,
    subjectValidator,
} from "@/components/validation/contact"

const handler = mw({
    POST: [
        validate({
            body: {
                mail: mailValidator.required(),
                topic: topicValidator.required(),
                subject: subjectValidator.required(),
            },
        }),
        async ({
                   locals: {
                       body: {mail, topic, subject},
                   },
                   res,
               }) => {
            await ContactModel.query().insertAndFetch({
                mail,
                subject,
                topic,
            })

            res.send({result: true})
        },
    ],
})

export default handler
