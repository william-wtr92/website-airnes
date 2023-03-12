import * as yup from "yup"

export const mailValidator = yup.string().email().label("mail")

export const topicValidator = yup.string().min(1).label("topic")

export const contentValidator = yup.string().min(1).label("content")
