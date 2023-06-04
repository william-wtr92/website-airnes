import mw from "@/api/mw"
import UserModel from "@/api/db/models/UserModel"
import ProductModel from "@/api/db/models/ProductModel"
import OrderModel from "@/api/db/models/OrderModel"
import auth from "@/api/middlewares/auth"
import OrderProductModel from "@/api/db/models/OrderProductModel"

const handler = mw({
  GET: [
    auth("admin"),
    async ({ res }) => {
      const userCount = await UserModel.query().count().first()
      const productCount = await ProductModel.query().count().first()
      const sellCount = await OrderModel.query().sum("price as total").first()

      const topSell = await OrderProductModel.query()
        .withGraphFetched("productData")
        .select("product_id")
        .count("product_id as sales")
        .groupBy("product_id")
        .orderBy("sales", "desc")
        .limit(5)

      const productDetails = await Promise.all(
        topSell.map(async (item) => {
          const product = await ProductModel.query().findById(item.product_id)

          return {
            id: item.product_id,
            name: product.name,
            image: product.image,
            sales: item.sales,
            date: item.date,
          }
        })
      )

      const salesDay = await OrderModel.query()
        .select(
          OrderModel.knex().raw("DATE_TRUNC('day', \"created_at\") as date")
        )
        .count("* as sales")
        .where(
          OrderModel.knex().raw("\"created_at\" >= (NOW() - INTERVAL '7 DAY')")
        )
        .groupBy(OrderModel.knex().raw("DATE_TRUNC('day', \"created_at\")"))

      res.send({
        user: userCount.count,
        product: productCount.count,
        sell: sellCount.total,
        topSell: productDetails,
        salesDay: salesDay,
      })
    },
  ],
})

export default handler
