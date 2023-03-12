import * as yup from "yup"

export const topicValidator = yup.string().min(1).label("topic")

export const mailValidator = yup.string().email().label("mail")

export const subjectValidator = yup.string().min(1).label("subject")
