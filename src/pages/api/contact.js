import ContactModel from "@/api/db/models/ContactModel"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"

import {
    mailValidator,
    topicValidator,
    subjectValidator, contentValidator,
} from "@/components/validation/contact"

const handler = mw({
    POST: [
        validate({
            body: {
                mail: mailValidator.required(),
                topic: topicValidator.required(),
                content: contentValidator.required(),
            },
        }),
        async ({
                   locals: {
                       body: {mail, topic, content},
                   },
                   res,
               }) => {
            await ContactModel.query().insertAndFetch({
                mail,
                topic,
                content,
            })

            res.send({result: true})
        },
    ],
})

export default handler
